// ────────────────────────────────────────────────────────────────────────────
// PulseGov — Auth Context
// Provides user authentication state, session management, and user CRUD.
// ────────────────────────────────────────────────────────────────────────────
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { UserProfile, UserRole } from '../types';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextValue {
  authState: AuthState;
  allUsers: UserProfile[];
  sessionRemainingSeconds: number;
  login: (identifier: string, password: string) => Promise<{ success: boolean; role?: UserRole; error?: string }>;
  logout: () => void;
  signUp: (data: SignUpData) => Promise<{ success: boolean; userId?: string; error?: string }>;
  verifyMobileOTP: (userId: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  resendMobileOTP: (userId: string) => Promise<{ success: boolean; otp?: string; error?: string }>;
  verifyEmailToken: (userId: string, token: string) => Promise<{ success: boolean; error?: string }>;
  activeOTPCode: string | null;
  activeEmailToken: string | null;
  extendSession: () => void;
  toggleUserStatus: (userId: string) => void;
  changeUserRole: (userId: string, role: UserRole) => void;
}

export interface SignUpData {
  username: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  password: string;
  role: UserRole;
  stateName: string;
  department?: string;
}

// ─── Default Seed Users ───────────────────────────────────────────────────────

const SEED_USERS: UserProfile[] = [
  {
    id: 'user-authority-001',
    username: 'authority_admin',
    fullName: 'Dr. Priya Sharma IAS',
    email: 'authority@pulsegov.in',
    mobileNumber: '+91-9876543210',
    role: 'authority',
    stateName: 'New Delhi',
    department: 'Ministry of Electronics & IT (MeitY)',
    isActive: true,
    isEmailVerified: true,
    isMobileVerified: true,
    createdAt: '2026-01-15T10:00:00Z',
    lastLoginAt: '2026-09-30T08:30:00Z',
    avatarInitials: 'PS',
  },
  {
    id: 'user-normal-001',
    username: 'citizen_user',
    fullName: 'Ramesh Kumar Singh',
    email: 'citizen@pulsegov.in',
    mobileNumber: '+91-9123456789',
    role: 'normal',
    stateName: 'Bihar',
    isActive: true,
    isEmailVerified: true,
    isMobileVerified: true,
    createdAt: '2026-03-20T09:00:00Z',
    lastLoginAt: '2026-09-29T14:20:00Z',
    avatarInitials: 'RK',
  },
];

// Seed passwords map (in production this would be hashed server-side)
const SEED_PASSWORDS: Record<string, string> = {
  'authority_admin': 'Admin@2026!',
  'authority@pulsegov.in': 'Admin@2026!',
  'citizen_user': 'Citizen@2026!',
  'citizen@pulsegov.in': 'Citizen@2026!',
};

const SESSION_DURATION_SECONDS = 30 * 60; // 30 minutes

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
  });

  const [allUsers, setAllUsers] = useState<UserProfile[]>(SEED_USERS);
  const [sessionRemainingSeconds, setSessionRemainingSeconds] = useState(SESSION_DURATION_SECONDS);
  const [activeOTPCode, setActiveOTPCode] = useState<string | null>(null);
  const [activeEmailToken, setActiveEmailToken] = useState<string | null>(null);

  const sessionTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  // ─── Session timer ─────────────────────────────────────────────────────────

  const clearSessionTimer = useCallback(() => {
    if (sessionTimerRef.current) {
      clearInterval(sessionTimerRef.current);
      sessionTimerRef.current = null;
    }
  }, []);

  const startSessionTimer = useCallback(() => {
    clearSessionTimer();
    setSessionRemainingSeconds(SESSION_DURATION_SECONDS);
    lastActivityRef.current = Date.now();

    sessionTimerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - lastActivityRef.current) / 1000);
      const remaining = Math.max(0, SESSION_DURATION_SECONDS - elapsed);
      setSessionRemainingSeconds(remaining);
      if (remaining === 0) {
        clearSessionTimer();
        setAuthState({ isAuthenticated: false, user: null, isLoading: false, error: null });
      }
    }, 1000);
  }, [clearSessionTimer]);

  const extendSession = useCallback(() => {
    lastActivityRef.current = Date.now();
    setSessionRemainingSeconds(SESSION_DURATION_SECONDS);
  }, []);

  // Reset activity on user interaction
  useEffect(() => {
    if (!authState.isAuthenticated) return;
    const onActivity = () => { lastActivityRef.current = Date.now(); };
    window.addEventListener('mousemove', onActivity);
    window.addEventListener('keydown', onActivity);
    window.addEventListener('click', onActivity);
    window.addEventListener('touchstart', onActivity);
    return () => {
      window.removeEventListener('mousemove', onActivity);
      window.removeEventListener('keydown', onActivity);
      window.removeEventListener('click', onActivity);
      window.removeEventListener('touchstart', onActivity);
    };
  }, [authState.isAuthenticated]);

  useEffect(() => {
    return () => clearSessionTimer();
  }, [clearSessionTimer]);

  // ─── Auth operations ───────────────────────────────────────────────────────

  const login = useCallback(async (identifier: string, password: string): Promise<{ success: boolean; role?: UserRole; error?: string }> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    // Simulate network delay
    await new Promise(r => setTimeout(r, 600));

    const expectedPassword = SEED_PASSWORDS[identifier];
    if (!expectedPassword || expectedPassword !== password) {
      setAuthState(prev => ({ ...prev, isLoading: false, error: 'Invalid credentials. Please check your username/email and password.' }));
      return { success: false, error: 'Invalid credentials' };
    }

    const user = allUsers.find(u => u.username === identifier || u.email === identifier);
    if (!user) {
      setAuthState(prev => ({ ...prev, isLoading: false, error: 'User account not found.' }));
      return { success: false, error: 'User not found' };
    }

    if (!user.isActive) {
      setAuthState(prev => ({ ...prev, isLoading: false, error: 'Your account has been deactivated. Contact support.' }));
      return { success: false, error: 'Account deactivated' };
    }

    const updatedUser = { ...user, lastLoginAt: new Date().toISOString() };
    setAllUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
    setAuthState({ isAuthenticated: true, user: updatedUser, isLoading: false, error: null });
    startSessionTimer();
    return { success: true, role: user.role };
  }, [allUsers, startSessionTimer]);

  const logout = useCallback(() => {
    clearSessionTimer();
    setAuthState({ isAuthenticated: false, user: null, isLoading: false, error: null });
    setSessionRemainingSeconds(SESSION_DURATION_SECONDS);
  }, [clearSessionTimer]);

  const signUp = useCallback(async (data: SignUpData): Promise<{ success: boolean; userId?: string; error?: string }> => {
    await new Promise(r => setTimeout(r, 800));

    if (allUsers.some(u => u.username === data.username)) {
      return { success: false, error: 'Username already taken. Please choose another.' };
    }
    if (allUsers.some(u => u.email === data.email)) {
      return { success: false, error: 'Email already registered.' };
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const emailToken = Math.random().toString(36).substring(2, 18).toUpperCase();
    setActiveOTPCode(otp);
    setActiveEmailToken(emailToken);

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      username: data.username,
      fullName: data.fullName,
      email: data.email,
      mobileNumber: data.mobileNumber,
      role: data.role,
      stateName: data.stateName,
      department: data.department,
      isActive: true,
      isEmailVerified: false,
      isMobileVerified: false,
      createdAt: new Date().toISOString(),
      avatarInitials: data.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
    };

    setAllUsers(prev => [...prev, newUser]);
    console.info(`[PulseGov Auth] Demo OTP: ${otp} | Email Token: ${emailToken}`);
    return { success: true, userId: newUser.id };
  }, [allUsers]);

  const verifyMobileOTP = useCallback(async (userId: string, otp: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise(r => setTimeout(r, 500));
    if (otp === activeOTPCode) {
      setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, isMobileVerified: true } : u));
      setActiveOTPCode(null);
      return { success: true };
    }
    return { success: false, error: 'Invalid OTP. Please try again.' };
  }, [activeOTPCode]);

  const resendMobileOTP = useCallback(async (_userId: string): Promise<{ success: boolean; otp?: string; error?: string }> => {
    await new Promise(r => setTimeout(r, 400));
    const newOtp = String(Math.floor(100000 + Math.random() * 900000));
    setActiveOTPCode(newOtp);
    console.info(`[PulseGov Auth] New OTP: ${newOtp}`);
    return { success: true, otp: newOtp };
  }, []);

  const verifyEmailToken = useCallback(async (userId: string, token: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise(r => setTimeout(r, 500));
    if (token.trim().toUpperCase() === activeEmailToken) {
      setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, isEmailVerified: true } : u));
      setActiveEmailToken(null);
      return { success: true };
    }
    return { success: false, error: 'Invalid or expired email token.' };
  }, [activeEmailToken]);

  const toggleUserStatus = useCallback((userId: string) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, isActive: !u.isActive } : u));
  }, []);

  const changeUserRole = useCallback((userId: string, role: UserRole) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
  }, []);

  return (
    <AuthContext.Provider value={{
      authState,
      allUsers,
      sessionRemainingSeconds,
      login,
      logout,
      signUp,
      verifyMobileOTP,
      resendMobileOTP,
      verifyEmailToken,
      activeOTPCode,
      activeEmailToken,
      extendSession,
      toggleUserStatus,
      changeUserRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
