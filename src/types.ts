// ────────────────────────────────────────────────────────────────────────────
// PulseGov — Sovereign BRICS DPI  |  Shared TypeScript Type Definitions
// ────────────────────────────────────────────────────────────────────────────

export type BRICSCountryId =
  | 'india'
  | 'china'
  | 'russia'
  | 'brazil'
  | 'south_africa'
  | 'egypt'
  | 'ethiopia'
  | 'iran'
  | 'uae'
  | 'saudi_arabia';

export type UserRole = 'authority' | 'normal';

export type InfrastructureSector =
  | 'Water & Sanitation'
  | 'Transport & Connectivity'
  | 'Transport & Roads'
  | 'Energy & Microgrids'
  | 'Health Infrastructure'
  | 'Public Health'
  | 'Agricultural & Irrigation'
  | 'Digital Connectivity'
  | 'Education Infrastructure'
  | 'Urban Planning'
  | 'Disaster Management'
  | 'Environmental'
  | 'Digital Public Infrastructure'
  | 'Education & Sanitation'
  | 'Urban Infrastructure'
  | 'Healthcare Infrastructure'
  | 'Irrigation & Agriculture'
  | 'Public Transport'
  | 'Renewable Energy';

export type SeverityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export type ComplaintStatus =
  | 'Pending'
  | 'Pending Review'
  | 'Under Review'
  | 'In Progress'
  | 'Field Verified'
  | 'CapEx Approved'
  | 'Resolved'
  | 'Escalated'
  | 'Rejected'
  | 'AI-Verified';

// ─── User / Auth ──────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  role: UserRole;
  stateName?: string;
  state?: string;
  district?: string;
  city?: string;
  department?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  createdAt: string;
  lastLoginAt?: string;
  avatarInitials: string;
}

// ─── Citizen Reports ─────────────────────────────────────────────────────────

export interface CitizenReport {
  id: string;
  token?: string;
  regionId: string;
  regionName?: string;
  country: BRICSCountryId;
  countryId?: BRICSCountryId;
  category: InfrastructureSector | string;
  title: string;
  description: string;
  originalText?: string;
  location: string;
  lat: number;
  lng: number;
  severity: SeverityLevel;
  severityLevel?: SeverityLevel;
  urgencyScore: number;
  status: ComplaintStatus;
  submittedAt: string;
  estimatedAffectedPopulation: number;
  upvotes: number;
  assignedDepartment: string;
  submittedByLanguage?: string;
  language?: string;
  languageCode?: string;
  hasPhoto?: boolean;
  hasVoice?: boolean;
  aiAnalysisSummary?: string;
  resolutionSLA?: string;
  citizenReassuranceMessage?: string;
  englishTranslation?: string;
  citizenNameOrAnon?: string;
  keyIssues?: string[];
  photoDescription?: string;
  trackingCode?: string;
}

// ─── Demand Hotspots ─────────────────────────────────────────────────────────

export interface DemandHotspot {
  id: string;
  regionId: string;
  regionName: string;
  country: BRICSCountryId;
  sector: InfrastructureSector;
  demandIntensity: number;
  estimatedBeneficiaries: number;
  priorityIndex: number;
  severity: SeverityLevel;
  lat: number;
  lng: number;
  coordinates?: { lat: number; lng: number };
  associatedReportsCount: number;
  estimatedBudgetM: number;
  dprStatus?: 'Not Started' | 'In Progress' | 'Generated';
  description?: string;
  activeDemands?: number;
}

// ─── Regions ─────────────────────────────────────────────────────────────────

export interface RegionData {
  id: string;
  name: string;
  nativeName?: string;
  country: BRICSCountryId;
  countryId?: BRICSCountryId;
  population: number;
  vulnerabilityIndex: number;
  deficitBudgetM: number;
  topSector: InfrastructureSector;
  topPrioritySector?: InfrastructureSector;
  activeReports: number;
  activeRequestsCount?: number;
  lat: number;
  lng: number;
}

// ─── Governance / Authority Dashboard ────────────────────────────────────────

export interface ContaminationAlert {
  id: string;
  regionId: string;
  regionName: string;
  country: BRICSCountryId;
  state?: string;
  type: 'Water Contamination' | 'Air Quality' | 'Soil Pollution' | 'Chemical Spill' | string;
  contaminant?: string;
  contaminantType?: string;
  severity: SeverityLevel;
  riskLevel?: SeverityLevel;
  severityPPM?: number;
  permissibleLimitPPM?: number;
  affectedPopulation: number;
  detectedAt: string;
  dateLogged?: string;
  status: 'Active' | 'Monitoring' | 'Contained' | 'Resolved';
  description: string;
  lat: number;
  lng: number;
  readingValue?: string;
  safeLimit?: string;
  unit?: string;
  suggestedAIProject?: string;
  suggestedDPR?: string;
  aiRecommendation?: string;
}

export interface CitizenServiceRequest {
  id: string;
  userId?: string;
  username?: string;
  userMobile?: string;
  trackingCode?: string;
  citizenName: string;
  citizenId: string;
  category: InfrastructureSector | string;
  title: string;
  description: string;
  location: string | { region?: string; state?: string; address?: string };
  status: ComplaintStatus;
  priority: SeverityLevel;
  urgency?: SeverityLevel;
  submittedAt: string;
  updatedAt: string;
  assignedDepartment: string;
  estimatedResolutionDate?: string;
  upvotes: number;
  aiSeverityScore?: number;
  authorityNotes?: string;
  allocatedBudgetM?: number;
  actionTakenBy?: string;
}

export interface AIInfrastructureInsight {
  id: string;
  title: string;
  description: string;
  sector: InfrastructureSector;
  affectedRegions: string[];
  recommendedAction: string;
  potentialBeneficiaries: number;
  estimatedSavingM: number;
  estimatedCapExM?: number;
  unSDGs?: string[];
  confidence: number;
  generatedAt: string;
}

// ─── Policy / DPR ────────────────────────────────────────────────────────────

export interface MinisterialComplaint {
  id: string;
  ComplaintID?: string;
  title: string;
  sector: InfrastructureSector;
  region: string;
  country: BRICSCountryId;
  severity: SeverityLevel;
  status: ComplaintStatus;
  estimatedBudgetM: number;
  affectedPopulation: number;
  submittedAt: string;
  department: string;
}

// ─── Public Services ─────────────────────────────────────────────────────────

export interface PublicService {
  id: string;
  name?: string;
  title?: string;
  category: InfrastructureSector | string;
  department: string;
  avgResolutionDays?: number;
  processingDays?: string | number;
  icon: string;
  badge?: string;
  description?: string;
}