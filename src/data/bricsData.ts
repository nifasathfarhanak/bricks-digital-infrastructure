// ────────────────────────────────────────────────────────────────────────────
// PulseGov — BRICS Static Reference Data
// ────────────────────────────────────────────────────────────────────────────
import {
  BRICSCountryId,
  CitizenReport,
  DemandHotspot,
  RegionData,
} from '../types';

// ─── Language Matrix ─────────────────────────────────────────────────────────

export interface BRICSLanguageInfo {
  code: string;
  name: string;
  nativeName: string;
  script: string;
  country: BRICSCountryId;
  flag: string;
  rtl?: boolean;
  sampleGrievance?: string;
  regionFlag?: string;
}

export const BRICS_33_LANGUAGES: BRICSLanguageInfo[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari', country: 'india', flag: '🇮🇳', sampleGrievance: 'मुज़फ़्फ़रपुर में पेयजल पाइपलाइन टूट गई है', regionFlag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali', country: 'india', flag: '🇮🇳', sampleGrievance: 'পানীয় জলের পাইপলাইন ফেটে গেছে', regionFlag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil', country: 'india', flag: '🇮🇳', sampleGrievance: 'குடிநீர் குழாய் உடைந்துள்ளது', regionFlag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu', country: 'india', flag: '🇮🇳', sampleGrievance: 'మంచినీటి పైప్‌లైన్ పగిలిపోయింది', regionFlag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari', country: 'india', flag: '🇮🇳', sampleGrievance: 'पिण्याच्या पाण्याची पाईपलाईन फुटली आहे', regionFlag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati', country: 'india', flag: '🇮🇳', sampleGrievance: 'પીવાના પાણીની પાઇપલાઇન તૂટી ગઈ છે', regionFlag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada', country: 'india', flag: '🇮🇳', sampleGrievance: 'ಕುಡಿಯುವ ನೀರಿನ ಪೈಪ್‌ಲೈನ್ ಒಡೆದು ಹೋಗಿದೆ', regionFlag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam', country: 'india', flag: '🇮🇳', sampleGrievance: 'കുടിവെള്ള പൈപ്പ് ലൈൻ തകർന്നു', regionFlag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', script: 'Gurmukhi', country: 'india', flag: '🇮🇳', sampleGrievance: 'ਪੀਣ ਵਾਲੇ ਪਾਣੀ ਦੀ ਪਾਈਪਲਾਈਨ ਟੁੱਟ ਗਈ ਹੈ', regionFlag: '🇮🇳' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', script: 'Odia', country: 'india', flag: '🇮🇳', sampleGrievance: 'ପିଇବା ପାଣି ପାଇପଲାଇନ୍ ଫାଟିଯାଇଛି', regionFlag: '🇮🇳' },
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin', country: 'india', flag: '🌐', sampleGrievance: 'Drinking water pipeline burst in primary school area', regionFlag: '🌐' },
  { code: 'zh', name: 'Mandarin Chinese', nativeName: '普通话', script: 'Han', country: 'china', flag: '🇨🇳', sampleGrievance: '饮用水管道破裂，需紧急抢修', regionFlag: '🇨🇳' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', script: 'Cyrillic', country: 'russia', flag: '🇷🇺', sampleGrievance: 'Прорыв водопровода в районе школы', regionFlag: '🇷🇺' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', script: 'Latin', country: 'brazil', flag: '🇧🇷', sampleGrievance: 'Ruptura na tubulação de água potável', regionFlag: '🇧🇷' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', script: 'Latin', country: 'south_africa', flag: '🇿🇦', sampleGrievance: 'Drinkwaterpyp het gebreek', regionFlag: '🇿🇦' },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', script: 'Latin', country: 'south_africa', flag: '🇿🇦', sampleGrievance: 'Ipayipi lamanzi laphukile', regionFlag: '🇿🇦' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', script: 'Arabic', country: 'egypt', flag: '🇪🇬', rtl: true, sampleGrievance: 'كسر في أنبوب مياه الشرب الرئيسي', regionFlag: '🇪🇬' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', script: 'Ethiopic', country: 'ethiopia', flag: '🇪🇹', sampleGrievance: 'የመጠጥ ውሃ ቧንቧ ተሰብሯል', regionFlag: '🇪🇹' },
  { code: 'fa', name: 'Persian (Farsi)', nativeName: 'فارسی', script: 'Arabic', country: 'iran', flag: '🇮🇷', rtl: true, sampleGrievance: 'ترکیدگی لوله آب آشامیدنی', regionFlag: '🇮🇷' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', script: 'Nastaliq', country: 'india', flag: '🇮🇳', rtl: true, sampleGrievance: 'پینے کے پانی کی پائپ لائن پھٹ گئی ہے', regionFlag: '🇮🇳' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', script: 'Bengali-Assamese', country: 'india', flag: '🇮🇳', sampleGrievance: 'খোৱাপানীৰ পাইপলাইন ফাটি গৈছে', regionFlag: '🇮🇳' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'कश्मीरी', script: 'Devanagari', country: 'india', flag: '🇮🇳', sampleGrievance: 'आबि पाइपु छि फतुमुत', regionFlag: '🇮🇳' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', script: 'Devanagari', country: 'india', flag: '🇮🇳', sampleGrievance: 'पिबाक पानीक पाइप फुटि गेल अछि', regionFlag: '🇮🇳' },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', script: 'Ol Chiki', country: 'india', flag: '🇮🇳', sampleGrievance: 'ᱫᱟᱜ ᱯᱟᱭᱤᱯ ᱨᱟᱹᱯᱩᱫ ᱮᱱᱟ', regionFlag: '🇮🇳' },
  { code: 'bho', name: 'Bhojpuri', nativeName: 'भोजपुरी', script: 'Devanagari', country: 'india', flag: '🇮🇳', sampleGrievance: 'पानी के पाइप फूट गइल बा', regionFlag: '🇮🇳' },
  { code: 'raj', name: 'Rajasthani', nativeName: 'राजस्थानी', script: 'Devanagari', country: 'india', flag: '🇮🇳', sampleGrievance: 'पाणी री पाइपलाइन फूट गी', regionFlag: '🇮🇳' },
  { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa', script: 'Latin', country: 'south_africa', flag: '🇿🇦', sampleGrievance: 'Ipaipi yamanzi yophukile', regionFlag: '🇿🇦' },
  { code: 'st', name: 'Sesotho', nativeName: 'Sesotho', script: 'Latin', country: 'south_africa', flag: '🇿🇦', sampleGrievance: 'Peipi ea metsi e robehile', regionFlag: '🇿🇦' },
  { code: 'tg', name: 'Tajik', nativeName: 'Тоҷикӣ', script: 'Cyrillic', country: 'russia', flag: '🇷🇺', sampleGrievance: 'Лӯлаи об тарқиш хӯрд', regionFlag: '🇷🇺' },
  { code: 'tt', name: 'Tatar', nativeName: 'Татар теле', script: 'Cyrillic', country: 'russia', flag: '🇷🇺', sampleGrievance: 'Су кубы жарылган', regionFlag: '🇷🇺' },
  { code: 'sid', name: 'Sidama', nativeName: 'Sidaamu Afoo', script: 'Latin', country: 'ethiopia', flag: '🇪🇹', sampleGrievance: 'Wayi poyipi kabbino', regionFlag: '🇪🇹' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', script: 'Latin', country: 'uae', flag: '🇦🇪', sampleGrievance: 'Paip air pecah', regionFlag: '🇦🇪' },
  { code: 'tl', name: 'Filipino', nativeName: 'Filipino', script: 'Latin', country: 'uae', flag: '🇦🇪', sampleGrievance: 'Nasira ang tubo ng tubig', regionFlag: '🇦🇪' },
];

// ─── BRICS Countries ──────────────────────────────────────────────────────────

export interface BRICSCountry {
  id: BRICSCountryId;
  code?: string;
  name: string;
  nativeName?: string;
  flag: string;
  capital: string;
  population: number;
  lat: number;
  lng: number;
  primaryLanguage: string;
  currency: string;
  color: string;
  languages?: BRICSLanguageInfo[];
}

export const BRICS_COUNTRIES: BRICSCountry[] = [
  { id: 'india', code: 'IN', name: 'India', nativeName: 'भारत', flag: '🇮🇳', capital: 'New Delhi', population: 1428000000, lat: 20.5937, lng: 78.9629, primaryLanguage: 'Hindi / English', currency: 'INR', color: '#FF6B35', languages: BRICS_33_LANGUAGES.filter(l => l.country === 'india') },
  { id: 'china', code: 'CN', name: 'China', nativeName: '中国', flag: '🇨🇳', capital: 'Beijing', population: 1412000000, lat: 35.8617, lng: 104.1954, primaryLanguage: 'Mandarin', currency: 'CNY', color: '#EF4444', languages: BRICS_33_LANGUAGES.filter(l => l.country === 'china') },
  { id: 'russia', code: 'RU', name: 'Russia', nativeName: 'Россия', flag: '🇷🇺', capital: 'Moscow', population: 147000000, lat: 61.524, lng: 105.3188, primaryLanguage: 'Russian', currency: 'RUB', color: '#3B82F6', languages: BRICS_33_LANGUAGES.filter(l => l.country === 'russia') },
  { id: 'brazil', code: 'BR', name: 'Brazil', nativeName: 'Brasil', flag: '🇧🇷', capital: 'Brasília', population: 215000000, lat: -14.235, lng: -51.9253, primaryLanguage: 'Portuguese', currency: 'BRL', color: '#22C55E', languages: BRICS_33_LANGUAGES.filter(l => l.country === 'brazil') },
  { id: 'south_africa', code: 'ZA', name: 'South Africa', nativeName: 'South Africa', flag: '🇿🇦', capital: 'Pretoria', population: 60000000, lat: -30.5595, lng: 22.9375, primaryLanguage: 'Zulu / English', currency: 'ZAR', color: '#F59E0B', languages: BRICS_33_LANGUAGES.filter(l => l.country === 'south_africa') },
  { id: 'egypt', code: 'EG', name: 'Egypt', nativeName: 'مصر', flag: '🇪🇬', capital: 'Cairo', population: 105000000, lat: 26.8206, lng: 30.8025, primaryLanguage: 'Arabic', currency: 'EGP', color: '#10B981', languages: BRICS_33_LANGUAGES.filter(l => l.country === 'egypt') },
  { id: 'ethiopia', code: 'ET', name: 'Ethiopia', nativeName: 'ኢትዮጵያ', flag: '🇪🇹', capital: 'Addis Ababa', population: 126000000, lat: 9.145, lng: 40.4897, primaryLanguage: 'Amharic', currency: 'ETB', color: '#8B5CF6', languages: BRICS_33_LANGUAGES.filter(l => l.country === 'ethiopia') },
  { id: 'iran', code: 'IR', name: 'Iran', nativeName: 'ایران', flag: '🇮🇷', capital: 'Tehran', population: 88000000, lat: 32.4279, lng: 53.688, primaryLanguage: 'Persian', currency: 'IRR', color: '#06B6D4', languages: BRICS_33_LANGUAGES.filter(l => l.country === 'iran') },
  { id: 'uae', code: 'AE', name: 'UAE', nativeName: 'الإمارات', flag: '🇦🇪', capital: 'Abu Dhabi', population: 10000000, lat: 23.4241, lng: 53.8478, primaryLanguage: 'Arabic', currency: 'AED', color: '#EC4899', languages: BRICS_33_LANGUAGES.filter(l => l.country === 'uae') },
  { id: 'saudi_arabia', code: 'SA', name: 'Saudi Arabia', nativeName: 'السعودية', flag: '🇸🇦', capital: 'Riyadh', population: 36000000, lat: 23.8859, lng: 45.0792, primaryLanguage: 'Arabic', currency: 'SAR', color: '#14B8A6', languages: BRICS_33_LANGUAGES.filter(l => l.country === 'saudi_arabia') },
];

// ─── Initial Sample Citizen Reports ──────────────────────────────────────────

export const INITIAL_CITIZEN_REPORTS: CitizenReport[] = [
  {
    id: 'cr001',
    regionId: 'bihar',
    country: 'india',
    category: 'Water & Sanitation',
    title: 'Water pipeline burst near Primary School, Muzaffarpur',
    description: 'Main water supply pipeline has burst near Zila School Muzaffarpur causing sewage mixing. Over 4,200 residents lack clean water for 5 days.',
    location: 'Muzaffarpur, Bihar, India',
    lat: 26.1197, lng: 85.3910,
    severity: 'Critical',
    urgencyScore: 9,
    status: 'Under Review',
    submittedAt: '2026-09-28T07:42:00Z',
    estimatedAffectedPopulation: 4200,
    upvotes: 342,
    assignedDepartment: 'PHED — Public Health Engineering Department',
    submittedByLanguage: 'Hindi',
    hasVoice: true,
    aiAnalysisSummary: 'Gemini classified: Critical water-borne disease risk. Dispatch mobile PHED unit within 6 hours.',
    resolutionSLA: '48 hours',
  },
  {
    id: 'cr002',
    regionId: 'rajasthan',
    country: 'india',
    category: 'Transport & Connectivity',
    title: 'NH-58 road completely washed out after monsoon flooding',
    description: 'State highway connecting 12 villages is impassable. 6,500 residents cut off from district hospital and weekly market.',
    location: 'Barmer District, Rajasthan, India',
    lat: 25.7521, lng: 71.3967,
    severity: 'High',
    urgencyScore: 8,
    status: 'In Progress',
    submittedAt: '2026-09-27T11:15:00Z',
    estimatedAffectedPopulation: 6500,
    upvotes: 189,
    assignedDepartment: 'State Rural Roads Authority (SRRA)',
    submittedByLanguage: 'Rajasthani',
    hasPhoto: true,
    aiAnalysisSummary: 'Gemini Vision: 60m road section completely eroded. Emergency culvert replacement estimated ₹18L.',
    resolutionSLA: '7 days',
  },
  {
    id: 'cr003',
    regionId: 'odisha',
    country: 'india',
    category: 'Energy & Microgrids',
    title: 'Village blackout — Primary Health Centre cold-chain failure',
    description: 'Entire Kendrapara block lost grid power for 11 days. PHC vaccine refrigerator backup exhausted. Child immunisation suspended.',
    location: 'Kendrapara, Odisha, India',
    lat: 20.4999, lng: 86.4199,
    severity: 'Critical',
    urgencyScore: 10,
    status: 'Escalated',
    submittedAt: '2026-09-26T19:05:00Z',
    estimatedAffectedPopulation: 3800,
    upvotes: 521,
    assignedDepartment: 'OPTCL — Odisha Power Transmission Corporation',
    submittedByLanguage: 'Odia',
    hasPhoto: true,
    hasVoice: true,
    aiAnalysisSummary: 'Critical: Cold-chain failure imminent. Deploy 25kW solar microgrid within 24 hours.',
    resolutionSLA: '24 hours',
  },
  {
    id: 'cr004',
    regionId: 'maharashtra',
    country: 'india',
    category: 'Health Infrastructure',
    title: 'Primary Health Centre without doctor for 6 months — Nandurbar',
    description: 'Tribal district PHC has been doctorless since March 2026. 8,900 tribal residents travel 45km to district hospital for basic care.',
    location: 'Nandurbar, Maharashtra, India',
    lat: 21.3700, lng: 74.2400,
    severity: 'Critical',
    urgencyScore: 9,
    status: 'Pending',
    submittedAt: '2026-09-25T08:30:00Z',
    estimatedAffectedPopulation: 8900,
    upvotes: 673,
    assignedDepartment: 'Ministry of Health & Family Welfare — Tribal Health',
    submittedByLanguage: 'Marathi',
    hasVoice: true,
    aiAnalysisSummary: 'High MMR risk in tribal area. Priority deployment of MBBS doctor and mobile medical unit recommended.',
    resolutionSLA: '72 hours',
  },
  {
    id: 'cr005',
    regionId: 'punjab',
    country: 'india',
    category: 'Agricultural & Irrigation',
    title: 'Main canal blocked — Kharif crop irrigation failure, Ludhiana',
    description: 'Silt accumulation in Sirhind Canal feeder has blocked water to 4,200 acres of paddy fields. Farmers face complete crop loss.',
    location: 'Ludhiana District, Punjab, India',
    lat: 30.9010, lng: 75.8573,
    severity: 'High',
    urgencyScore: 7,
    status: 'Under Review',
    submittedAt: '2026-09-24T14:20:00Z',
    estimatedAffectedPopulation: 5100,
    upvotes: 298,
    assignedDepartment: 'Punjab Irrigation & Water Resources Department',
    submittedByLanguage: 'Punjabi',
    hasPhoto: true,
    aiAnalysisSummary: 'Canal desilting required. Solar drip irrigation recommended as long-term fix. Estimated ₹42L DPR needed.',
    resolutionSLA: '5 days',
  },
];

// ─── Demand Hotspots ──────────────────────────────────────────────────────────

export const DEMAND_HOTSPOTS: DemandHotspot[] = [
  {
    id: 'hs001', regionId: 'bihar', regionName: 'Bihar — Muzaffarpur–Darbhanga Belt',
    country: 'india', sector: 'Water & Sanitation',
    demandIntensity: 94, estimatedBeneficiaries: 2850000,
    priorityIndex: 96, severity: 'Critical',
    lat: 26.2, lng: 85.7, associatedReportsCount: 847,
    estimatedBudgetM: 240, dprStatus: 'In Progress',
    description: 'Dense agrarian belt with 94% open defecation rate and chronic fluoride contamination in 23 blocks.',
  },
  {
    id: 'hs002', regionId: 'rajasthan', regionName: 'Rajasthan — Desert Rural Roads',
    country: 'india', sector: 'Transport & Connectivity',
    demandIntensity: 88, estimatedBeneficiaries: 1920000,
    priorityIndex: 89, severity: 'High',
    lat: 26.9, lng: 70.9, associatedReportsCount: 612,
    estimatedBudgetM: 580, dprStatus: 'Not Started',
    description: '7,400km of unpaved desert tracks cut off 312 villages from markets and hospitals during monsoon.',
  },
  {
    id: 'hs003', regionId: 'odisha', regionName: 'Odisha — Coastal Tribal Energy Belt',
    country: 'india', sector: 'Energy & Microgrids',
    demandIntensity: 91, estimatedBeneficiaries: 1640000,
    priorityIndex: 93, severity: 'Critical',
    lat: 20.9, lng: 85.1, associatedReportsCount: 534,
    estimatedBudgetM: 160, dprStatus: 'Generated',
    description: 'Coastal tribal blocks with 18hr daily power cuts. Solar microgrid DPR approved for 47 villages.',
  },
  {
    id: 'hs004', regionId: 'maharashtra', regionName: 'Maharashtra — Vidarbha Health Infrastructure',
    country: 'india', sector: 'Health Infrastructure',
    demandIntensity: 87, estimatedBeneficiaries: 3100000,
    priorityIndex: 91, severity: 'Critical',
    lat: 20.7, lng: 78.2, associatedReportsCount: 389,
    estimatedBudgetM: 420, dprStatus: 'Not Started',
    description: 'Vidarbha has 1 doctor per 7,200 population vs national norm of 1:1000. 124 PHCs non-functional.',
  },
  {
    id: 'hs005', regionId: 'up', regionName: 'Uttar Pradesh — Bundelkhand Irrigation Crisis',
    country: 'india', sector: 'Agricultural & Irrigation',
    demandIntensity: 85, estimatedBeneficiaries: 4200000,
    priorityIndex: 88, severity: 'High',
    lat: 25.3, lng: 79.7, associatedReportsCount: 726,
    estimatedBudgetM: 890, dprStatus: 'In Progress',
    description: 'Bundelkhand faces 5th consecutive drought year. Canal systems at 12% capacity from silting.',
  },
  {
    id: 'hs006', regionId: 'jharkhand', regionName: 'Jharkhand — Digital Connectivity Void',
    country: 'india', sector: 'Digital Connectivity',
    demandIntensity: 79, estimatedBeneficiaries: 1380000,
    priorityIndex: 81, severity: 'High',
    lat: 23.6, lng: 85.3, associatedReportsCount: 298,
    estimatedBudgetM: 120, dprStatus: 'Not Started',
    description: '68% of Scheduled Tribe population has zero internet access, blocking e-governance and digital payments.',
  },
];

// ─── Regions Data ─────────────────────────────────────────────────────────────

export const REGIONS_DATA: RegionData[] = [
  { id: 'bihar', name: 'Bihar', country: 'india', population: 128500000, vulnerabilityIndex: 94, deficitBudgetM: 8400, topSector: 'Water & Sanitation', activeReports: 1247, lat: 25.9, lng: 85.1 },
  { id: 'rajasthan', name: 'Rajasthan', country: 'india', population: 80400000, vulnerabilityIndex: 81, deficitBudgetM: 6200, topSector: 'Transport & Connectivity', activeReports: 923, lat: 27.0, lng: 74.2 },
  { id: 'odisha', name: 'Odisha', country: 'india', population: 46900000, vulnerabilityIndex: 87, deficitBudgetM: 4100, topSector: 'Energy & Microgrids', activeReports: 712, lat: 20.9, lng: 85.1 },
  { id: 'maharashtra', name: 'Maharashtra', country: 'india', population: 124000000, vulnerabilityIndex: 72, deficitBudgetM: 5800, topSector: 'Health Infrastructure', activeReports: 1089, lat: 19.7, lng: 75.7 },
  { id: 'up', name: 'Uttar Pradesh', country: 'india', population: 237000000, vulnerabilityIndex: 89, deficitBudgetM: 12000, topSector: 'Agricultural & Irrigation', activeReports: 2341, lat: 27.1, lng: 80.9 },
  { id: 'jharkhand', name: 'Jharkhand', country: 'india', population: 38600000, vulnerabilityIndex: 83, deficitBudgetM: 3200, topSector: 'Digital Connectivity', activeReports: 487, lat: 23.6, lng: 85.3 },
  { id: 'mp', name: 'Madhya Pradesh', country: 'india', population: 85900000, vulnerabilityIndex: 79, deficitBudgetM: 5100, topSector: 'Water & Sanitation', activeReports: 864, lat: 22.9, lng: 78.6 },
  { id: 'assam', name: 'Assam', country: 'india', population: 35600000, vulnerabilityIndex: 76, deficitBudgetM: 2900, topSector: 'Transport & Connectivity', activeReports: 523, lat: 26.2, lng: 92.9 },
];
