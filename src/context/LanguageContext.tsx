// ────────────────────────────────────────────────────────────────────────────
// PulseGov — Language Context
// Provides 33-language sovereign i18n, TTS/STT, RTL, and regional adaptation.
// ────────────────────────────────────────────────────────────────────────────
import React, { createContext, useContext, useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { BRICS_33_LANGUAGES, BRICSLanguageInfo } from '../data/bricsData';

export interface AdaptationNoticeObject {
  nativeName: string;
  languageName: string;
  locationName: string;
}

export interface LanguageContextValue {
  currentLanguage: BRICSLanguageInfo;
  currentLanguageInfo: BRICSLanguageInfo;
  setLanguage: (code: string) => void;
  availableLanguages: BRICSLanguageInfo[];
  allLanguages: BRICSLanguageInfo[];
  isRTL: boolean;
  t: any;
  tCountry: (c: string) => string;
  tSector: (s: string) => string;
  tUrgency: (u: string) => string;
  tLayer: (l: string) => string;
  isTTSEnabled: boolean;
  setIsTTSEnabled: (v: boolean) => void;
  speak: (text: string, langCode?: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  speakingLanguageName?: string;
  startListening: (onResult: (transcript: string) => void) => void;
  stopListening: () => void;
  isListening: boolean;
  adaptLanguageForRegion: (regionId: string) => void;
  adaptLanguageForCountry: (countryId: string) => void;
  adaptationNotice: any;
  dismissAdaptationNotice: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// Minimal UI translation map
const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    'nav.map': 'GIS Hotspot Map', 'nav.citizen': 'Citizen Portal', 'nav.hotspots': 'Demand Hotspots',
    'nav.dpr': 'AI DPR Studio', 'nav.copilot': 'Policy Copilot', 'nav.crisis': 'Crisis Dashboard',
    'nav.dashboard': 'Dashboard', 'nav.complaint': 'Raise Complaint',
    'btn.submit': 'Submit', 'btn.cancel': 'Cancel', 'btn.generate': 'Generate AI DPR',
    'btn.login': 'Login', 'btn.logout': 'Logout', 'btn.signup': 'Sign Up',
    'label.language': 'Language', 'label.country': 'Country', 'label.severity': 'Severity',
    'label.status': 'Status', 'label.category': 'Category',
    'activeDemands': 'Active Demands', 'aiDprStudio': 'AI DPR Studio',
    'allCountries': 'All Countries', 'allLanguages': 'All Languages',
    'allSectors': 'All Sectors', 'allStatesTerritories': 'All States & Territories',
    'backToPrevious': 'Back', 'bricsGeospatialMap': 'BRICS Geospatial Map',
    'citizenVoice': 'Citizen Voice', 'clickNodeToInspect': 'Click node to inspect',
    'contaminationAlerts': 'Contamination Alerts',
    'portalTitle': 'PulseGov BRICS Digital Infrastructure Platform',
    'portalSubtitle': 'Multilingual AI Public Service Grievance & Infrastructure Copilot',
    'geminiAgentActive': 'Gemini Multimodal AI Agent active and monitoring 33 languages in real-time',
  },
  hi: {
    'nav.map': 'GIS हॉटस्पॉट मानचित्र', 'nav.citizen': 'नागरिक पोर्टल',
    'nav.hotspots': 'मांग हॉटस्पॉट', 'nav.dpr': 'AI DPR स्टूडियो',
    'nav.copilot': 'नीति सहायक', 'nav.crisis': 'संकट डैशबोर्ड',
    'nav.dashboard': 'डैशबोर्ड', 'nav.complaint': 'शिकायत दर्ज करें',
    'btn.submit': 'जमा करें', 'btn.cancel': 'रद्द करें', 'btn.login': 'लॉगिन',
    'label.language': 'भाषा', 'label.country': 'देश',
    'portalTitle': 'पल्सगव ब्रिक्स डिजिटल इंफ्रास्ट्रक्चर प्लेटफॉर्म',
    'portalSubtitle': 'बहुभाषी एआई नागरिक सेवा और बुनियादी ढांचा सहायता',
    'geminiAgentActive': 'जेमिनी मल्टीमॉडल एआई एजेंट 33 भाषाओं में सक्रिय',
  },
};

const COUNTRY_LANG_MAP: Record<string, string> = {
  india: 'hi', china: 'zh', russia: 'ru', brazil: 'pt',
  south_africa: 'en', egypt: 'ar', ethiopia: 'am',
  iran: 'fa', uae: 'ar', saudi_arabia: 'ar',
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<BRICSLanguageInfo>(
    BRICS_33_LANGUAGES.find(l => l.code === 'en') || BRICS_33_LANGUAGES[10]
  );
  const [isTTSEnabled, setIsTTSEnabled] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [adaptationNotice, setAdaptationNotice] = useState<any>(null);
  const recognitionRef = useRef<any>(null);

  const setLanguage = useCallback((code: string) => {
    const lang = BRICS_33_LANGUAGES.find(l => l.code === code);
    if (lang) setCurrentLanguage(lang);
  }, []);

  const rawT = useCallback((key: string, fallback?: string): string => {
    const langMap = TRANSLATIONS[currentLanguage.code];
    const enMap = TRANSLATIONS['en'];
    return (langMap?.[key]) || (enMap?.[key]) || fallback || key;
  }, [currentLanguage.code]);

  // Create callable t wrapped with a Proxy so any t.someProperty returns translated text
  const baseT = useCallback((key: string, fallback?: string) => rawT(key, fallback), [rawT]);
  
  const t: any = useMemo(() => {
    return new Proxy(baseT, {
      get(target: any, prop: string | symbol) {
        if (typeof prop === 'string') {
          if (prop in target) return target[prop];
          const found = rawT(prop);
          if (found && found !== prop) return found;
          // Format camelCase to Title Case as fallback (e.g., selectCountry -> Select Country)
          const formatted = prop.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
          return rawT(prop, formatted);
        }
        return target[prop];
      }
    });
  }, [baseT, rawT]);

  const tCountry = useCallback((c: string) => c ? c.toUpperCase() : 'ALL', []);
  const tSector = useCallback((s: string) => s || 'General', []);
  const tUrgency = useCallback((u: string) => u || 'Medium', []);
  const tLayer = useCallback((l: string) => {
    const layerNames: Record<string, string> = {
      priority: 'Composite Priority',
      vulnerability: 'Social Vulnerability',
      deficit: 'Fiscal Infrastructure Deficit',
      demand: 'Citizen Demand Heatmap'
    };
    return layerNames[l] || l;
  }, []);

  const stopSpeaking = useCallback(() => {
    try { window.speechSynthesis?.cancel(); } catch {}
    setIsSpeaking(false);
  }, []);

  const speak = useCallback((text: string, langCode?: string) => {
    if (typeof window === 'undefined') return;
    try {
      window.speechSynthesis?.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode || currentLanguage.code;
      utterance.rate = 0.9;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis?.speak(utterance);
    } catch { setIsSpeaking(false); }
  }, [currentLanguage.code]);

  const startListening = useCallback((onResult: (transcript: string) => void) => {
    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) { console.warn('Speech recognition not supported'); return; }
      const rec = new SpeechRecognition();
      rec.lang = currentLanguage.code;
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = (e: any) => { onResult(e.results[0][0].transcript); };
      rec.onerror = () => setIsListening(false);
      rec.onend = () => setIsListening(false);
      recognitionRef.current = rec;
      rec.start();
      setIsListening(true);
    } catch { setIsListening(false); }
  }, [currentLanguage.code]);

  const stopListening = useCallback(() => {
    try { recognitionRef.current?.stop(); } catch {}
    setIsListening(false);
  }, []);

  const adaptLanguageForRegion = useCallback((regionId: string) => {
    const stateToLang: Record<string, string> = {
      bihar: 'hi', rajasthan: 'raj', odisha: 'or', maharashtra: 'mr',
      up: 'hi', jharkhand: 'hi', mp: 'hi', assam: 'as', punjab: 'pa',
    };
    const code = stateToLang[regionId] || 'hi';
    const lang = BRICS_33_LANGUAGES.find(l => l.code === code) || currentLanguage;
    setCurrentLanguage(lang);
    setAdaptationNotice({
      nativeName: lang.nativeName,
      languageName: lang.name,
      locationName: regionId.toUpperCase(),
    });
    setTimeout(() => setAdaptationNotice(null), 5000);
  }, [currentLanguage]);

  const adaptLanguageForCountry = useCallback((countryId: string) => {
    const code = COUNTRY_LANG_MAP[countryId] || 'en';
    const lang = BRICS_33_LANGUAGES.find(l => l.code === code) || currentLanguage;
    setCurrentLanguage(lang);
    setAdaptationNotice({
      nativeName: lang.nativeName,
      languageName: lang.name,
      locationName: countryId.toUpperCase(),
    });
    setTimeout(() => setAdaptationNotice(null), 5000);
  }, [currentLanguage]);

  const dismissAdaptationNotice = useCallback(() => setAdaptationNotice(null), []);

  useEffect(() => () => { stopSpeaking(); stopListening(); }, [stopSpeaking, stopListening]);

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      currentLanguageInfo: currentLanguage,
      setLanguage,
      availableLanguages: BRICS_33_LANGUAGES,
      allLanguages: BRICS_33_LANGUAGES,
      isRTL: !!currentLanguage.rtl,
      t,
      tCountry,
      tSector,
      tUrgency,
      tLayer,
      isTTSEnabled,
      setIsTTSEnabled,
      speak,
      stopSpeaking,
      isSpeaking,
      speakingLanguageName: currentLanguage.name,
      startListening,
      stopListening,
      isListening,
      adaptLanguageForRegion,
      adaptLanguageForCountry,
      adaptationNotice,
      dismissAdaptationNotice,
    }}>
      <div dir={currentLanguage.rtl ? 'rtl' : 'ltr'} style={{ minHeight: '100%' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}

export type { BRICSLanguageInfo };
