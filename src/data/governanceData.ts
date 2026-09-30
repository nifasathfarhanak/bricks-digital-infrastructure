// ────────────────────────────────────────────────────────────────────────────
// PulseGov — Governance Authority Sample Data
// ────────────────────────────────────────────────────────────────────────────
import {
  ContaminationAlert,
  CitizenServiceRequest,
  AIInfrastructureInsight,
  PublicService,
} from '../types';

// ─── Contamination Alerts ────────────────────────────────────────────────────

export const INITIAL_CONTAMINATION_ALERTS: ContaminationAlert[] = [
  {
    id: 'ca001', regionId: 'bihar', regionName: 'Muzaffarpur, Bihar',
    country: 'india', type: 'Water Contamination',
    severity: 'Critical', affectedPopulation: 42000,
    detectedAt: '2026-09-28T06:15:00Z',
    status: 'Active',
    description: 'Fluoride contamination (2.8 mg/L vs 1.5 limit) detected across 14 tube-wells in Ward 7–12.',
    lat: 26.1197, lng: 85.391,
  },
  {
    id: 'ca002', regionId: 'odisha', regionName: 'Angul Industrial Corridor, Odisha',
    country: 'india', type: 'Air Quality',
    severity: 'High', affectedPopulation: 89000,
    detectedAt: '2026-09-27T09:30:00Z',
    status: 'Monitoring',
    description: 'PM2.5 at 340 µg/m³ (10× safe limit) due to coal plant emissions. Respiratory distress reports rising.',
    lat: 20.8402, lng: 85.1014,
  },
  {
    id: 'ca003', regionId: 'maharashtra', regionName: 'Vidarbha, Maharashtra',
    country: 'india', type: 'Soil Pollution',
    severity: 'High', affectedPopulation: 31000,
    detectedAt: '2026-09-26T12:00:00Z',
    status: 'Monitoring',
    description: 'Pesticide runoff (Endosulfan residue 0.08 mg/kg) detected in 6 villages. Cotton crop affected.',
    lat: 20.7002, lng: 78.3,
  },
  {
    id: 'ca004', regionId: 'rajasthan', regionName: 'Barmer, Rajasthan',
    country: 'india', type: 'Water Contamination',
    severity: 'Medium', affectedPopulation: 18500,
    detectedAt: '2026-09-25T15:45:00Z',
    status: 'Contained',
    description: 'Arsenic levels (0.07 mg/L vs 0.01 limit) in ground aquifer affecting 3 hamlets. Reverse osmosis units deployed.',
    lat: 25.752, lng: 71.397,
  },
];

// ─── Citizen Service Requests ────────────────────────────────────────────────

export const INITIAL_CITIZEN_REQUESTS: CitizenServiceRequest[] = [
  {
    id: 'csr001', citizenName: 'Ramesh Kumar Singh', citizenId: 'IND-BH-2847391',
    category: 'Water & Sanitation',
    title: 'Request for Hand Pump Repair — Booth No. 47, Patna Rural',
    description: 'Community hand pump broken for 3 weeks. Women walk 2km to collect water. Requesting urgent repair or replacement.',
    location: 'Patna Rural Block, Bihar', status: 'Under Review', priority: 'High',
    submittedAt: '2026-09-29T08:20:00Z', updatedAt: '2026-09-29T10:45:00Z',
    assignedDepartment: 'PHED Bihar', estimatedResolutionDate: '2026-10-03',
    upvotes: 127,
  },
  {
    id: 'csr002', citizenName: 'Priya Venkataraman', citizenId: 'IND-TN-5612847',
    category: 'Digital Connectivity',
    title: 'No internet access in Kalrayan Hills tribal area',
    description: 'Our entire panchayat (12 villages, 8,400 residents) has zero telecom coverage. Students cannot attend online classes.',
    location: 'Kalrayan Hills, Salem, Tamil Nadu', status: 'Pending', priority: 'High',
    submittedAt: '2026-09-28T14:30:00Z', updatedAt: '2026-09-28T14:30:00Z',
    assignedDepartment: 'Tamil Nadu e-Governance Agency', upvotes: 342,
  },
  {
    id: 'csr003', citizenName: 'Mohammed Arif Khan', citizenId: 'IND-UP-9023471',
    category: 'Health Infrastructure',
    title: 'Ambulance service non-functional — Bahraich district',
    description: '108 ambulance has been broken for 6 weeks. Two mothers died during delivery transport delay this month.',
    location: 'Bahraich, Uttar Pradesh', status: 'Escalated', priority: 'Critical',
    submittedAt: '2026-09-27T17:00:00Z', updatedAt: '2026-09-28T09:15:00Z',
    assignedDepartment: 'UP State Health Mission', estimatedResolutionDate: '2026-09-30',
    upvotes: 891,
  },
  {
    id: 'csr004', citizenName: 'Sunita Devi Yadav', citizenId: 'IND-JH-3841920',
    category: 'Energy & Microgrids',
    title: 'Solar panel installation request — Giridih village cluster',
    description: 'We have no electricity. 340 households and a primary school are requesting solar power installation under PM-KUSUM scheme.',
    location: 'Giridih, Jharkhand', status: 'In Progress', priority: 'High',
    submittedAt: '2026-09-26T10:00:00Z', updatedAt: '2026-09-29T16:30:00Z',
    assignedDepartment: 'JBVNL — Jharkhand Bijli Vitran Nigam', estimatedResolutionDate: '2026-10-15',
    upvotes: 234,
  },
  {
    id: 'csr005', citizenName: 'Annapurna Patel', citizenId: 'IND-CG-7291034',
    category: 'Agricultural & Irrigation',
    title: 'Irrigation canal breach — 800 acres affected, Dhamtari',
    description: 'Main canal bank has breached at 3 points after heavy rains. Paddy crop submerged. Requesting emergency repair and crop damage assessment.',
    location: 'Dhamtari District, Chhattisgarh', status: 'Under Review', priority: 'High',
    submittedAt: '2026-09-25T06:45:00Z', updatedAt: '2026-09-25T13:20:00Z',
    assignedDepartment: 'CG Water Resources Department', upvotes: 178,
  },
];

// ─── Available Public Services ────────────────────────────────────────────────

export const AVAILABLE_PUBLIC_SERVICES: PublicService[] = [
  { id: 'svc001', name: 'Water Supply Complaint', title: 'Water Supply & Quality Grievance', category: 'Water & Sanitation', department: 'PHED — Public Health Engineering Department', avgResolutionDays: 7, processingDays: '3-7 days', badge: 'High Demand', icon: '💧', description: 'Report drinking water pipeline bursts, contamination, low pressure, or borewell pump failures.' },
  { id: 'svc002', name: 'Road Repair Request', title: 'PMGSY / PWD Rural Road Repair', category: 'Transport & Connectivity', department: 'PWD / National Highways Authority', avgResolutionDays: 14, processingDays: '7-14 days', badge: 'Urgent', icon: '🛣️', description: 'Lodge repair requests for severe potholes, bridge damage, missing culverts, or unpaved tracks.' },
  { id: 'svc003', name: 'Power Outage Report', title: 'Power Grid & Microgrid Service', category: 'Energy & Microgrids', department: 'State Electricity Board / DISCOM', avgResolutionDays: 2, processingDays: '24-48 hrs', badge: 'Fast Track', icon: '⚡', description: 'Report transformer burnouts, low voltage feeder lines, frequent blackouts, or solar mini-grid trips.' },
  { id: 'svc004', name: 'Health Facility Request', title: 'Primary Health Centre (PHC) Upgrade', category: 'Health Infrastructure', department: 'District Health & Family Welfare Office', avgResolutionDays: 30, processingDays: '15-30 days', badge: 'Critical', icon: '🏥', description: 'Request emergency ambulance stations, essential medicine supply restock, or doctor staffing at rural PHCs.' },
  { id: 'svc005', name: 'Irrigation Canal Issue', title: 'Canal Desilting & Drip Irrigation', category: 'Agricultural & Irrigation', department: 'State Water Resources & Irrigation Dept', avgResolutionDays: 10, processingDays: '5-10 days', badge: 'Seasonal', icon: '🌾', description: 'Report silted canal distributaries, broken check-dams, or request PMKSY solar pump subsidy verification.' },
  { id: 'svc006', name: 'Internet Connectivity', title: 'BharatNet Rural High-Speed Optical Fiber', category: 'Digital Connectivity', department: 'DoT / Bharat Broadband Network (BBNL)', avgResolutionDays: 45, processingDays: '14-30 days', badge: 'DPI Expansion', icon: '📡', description: 'Apply for gram panchayat fiber reconnection, public Wi-Fi hotspot installation, or 4G tower setup.' },
  { id: 'svc007', name: 'School Infrastructure', title: 'Samagra Shiksha School Facility Upgrade', category: 'Education Infrastructure', department: 'District Education Office', avgResolutionDays: 21, processingDays: '10-21 days', badge: 'Education', icon: '🏫', description: 'Request building safety audits, separate sanitation units for girls, smart class setups, or clean water.' },
  { id: 'svc008', name: 'Environmental Complaint', title: 'Pollution Control & Waste Management', category: 'Environmental', department: 'State Pollution Control Board (SPCB)', avgResolutionDays: 15, processingDays: '7-15 days', badge: 'Eco-Audit', icon: '🌱', description: 'Report illegal chemical effluent discharge, river dumping, agricultural stubble burning, or air toxicity.' },
];

// ─── AI Infrastructure Insights ───────────────────────────────────────────────

export const AI_INFRASTRUCTURE_INSIGHTS: AIInfrastructureInsight[] = [
  {
    id: 'ai001',
    title: 'Water Crisis Convergence — Bihar–UP Corridor',
    description: 'Gemini AI analysis of 3,847 citizen reports detects converging water scarcity, fluoride contamination, and pipeline failures across 18 Bihar districts and 12 UP districts — indicating systemic groundwater depletion.',
    sector: 'Water & Sanitation',
    affectedRegions: ['Bihar', 'Uttar Pradesh', 'Jharkhand'],
    recommendedAction: 'Fast-track Rs. 8,400 Cr Jal Jeevan Mission Phase II for 1,247 villages. Deploy 340 portable RO plants in 30 days.',
    potentialBeneficiaries: 12800000,
    estimatedSavingM: 2400,
    confidence: 94,
    generatedAt: '2026-09-30T03:00:00Z',
  },
  {
    id: 'ai002',
    title: 'Monsoon Road Failure Pattern — Rajasthan Desert Blocks',
    description: 'Vision AI detected 94 road failure hotspots from 1,247 photo submissions across Barmer, Jaisalmer, and Bikaner districts. Culvert design failures at 68% of sites.',
    sector: 'Transport & Connectivity',
    affectedRegions: ['Rajasthan', 'Gujarat Border'],
    recommendedAction: 'Deploy reinforced culverts at 68 high-failure junctions. Adopt BharatMala Expressway rural feeder road design standards.',
    potentialBeneficiaries: 3200000,
    estimatedSavingM: 890,
    confidence: 91,
    generatedAt: '2026-09-29T21:00:00Z',
  },
  {
    id: 'ai003',
    title: 'PHC Cold-Chain Failure Risk — Tribal Districts',
    description: 'Predictive AI flags 89 Primary Health Centres across Odisha, Jharkhand, and Chhattisgarh tribal belts at imminent cold-chain failure risk within 30 days based on power outage frequency patterns.',
    sector: 'Health Infrastructure',
    affectedRegions: ['Odisha', 'Jharkhand', 'Chhattisgarh'],
    recommendedAction: 'Pre-deploy 89 solar vaccine refrigerators under Universal Immunisation Programme. Emergency budget reallocation: Rs. 47 Cr.',
    potentialBeneficiaries: 4700000,
    estimatedSavingM: 340,
    confidence: 88,
    generatedAt: '2026-09-29T18:30:00Z',
  },
];
