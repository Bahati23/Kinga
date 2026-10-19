/**
 * Kinga domain model.
 *
 * Privacy note: a Kinga "signal" deliberately carries no names, no phone
 * numbers, and no precise location. County-level geography is the most
 * specific location the platform ever stores (data minimisation by design).
 */

export type RiskCategoryId =
  | 'child-marriage'
  | 'fgm'
  | 'gbv'
  | 'threats'
  | 'school-dropout'
  | 'other';

export type RiskLevel = 'info' | 'emerging' | 'urgent';

export type CaseStatus =
  | 'new'
  | 'assigned'
  | 'in-progress'
  | 'escalated'
  | 'referred'
  | 'closed'
  | 'unreachable';

export type Channel = 'ussd' | 'sms' | 'web';

export type ReporterType = 'self' | 'concerned-other';

export type PreferredContact = 'sms' | 'ussd' | 'voice' | 'none';

export type OrganisationType =
  | 'child-protection'
  | 'health'
  | 'legal-aid'
  | 'gbv-support'
  | 'shelter'
  | 'counselling';

export type OrgStatus = 'active' | 'pending' | 'suspended';

export type ServiceCapacity = 'available' | 'limited' | 'full';

export interface RiskCategory {
  id: RiskCategoryId;
  label: string;
  short: string;
  description: string;
}

export interface CaseEvent {
  at: number;
  actor: string;
  action: string;
}

export interface KingaCase {
  id: string;
  reference: string;
  riskCategory: RiskCategoryId;
  riskLevel: RiskLevel;
  status: CaseStatus;
  channel: Channel;
  reporter: ReporterType;
  preferredContact: PreferredContact;
  consentToRefer: boolean;
  county: string;
  assignedResponderId?: string;
  referralServiceId?: string;
  note?: string;
  createdAt: number;
  updatedAt: number;
  events: CaseEvent[];
}

export interface Responder {
  id: string;
  name: string;
  role: string;
  organisationId: string;
  counties: string[];
  languages: string[];
  verified: boolean;
  trainingStatus: 'completed' | 'in-progress' | 'pending';
}

export interface Organisation {
  id: string;
  name: string;
  type: OrganisationType;
  counties: string[];
  status: OrgStatus;
  joinedAt: number;
}

export interface Service {
  id: string;
  organisationId: string;
  name: string;
  type: OrganisationType;
  counties: string[];
  languages: string[];
  accessibility: string[];
  handlesCategories: RiskCategoryId[];
  capacity: ServiceCapacity;
  hours: string;
  active: boolean;
}

export interface AuditEntry {
  id: string;
  at: number;
  actor: string;
  action: string;
  resource: string;
}

export interface SignalInput {
  riskCategory: RiskCategoryId;
  riskLevel: RiskLevel;
  channel: Channel;
  reporter: ReporterType;
  preferredContact: PreferredContact;
  consentToRefer: boolean;
  county: string;
}

export interface KingaState {
  cases: KingaCase[];
  responders: Responder[];
  organisations: Organisation[];
  services: Service[];
  audit: AuditEntry[];
  seq: number;
}

export const RISK_CATEGORIES: Record<RiskCategoryId, RiskCategory> = {
  'child-marriage': {
    id: 'child-marriage',
    label: 'Child marriage',
    short: 'Marriage',
    description: 'Risk of forced or early marriage',
  },
  fgm: {
    id: 'fgm',
    label: 'FGM',
    short: 'FGM',
    description: 'Risk of female genital mutilation',
  },
  gbv: {
    id: 'gbv',
    label: 'Gender-based violence',
    short: 'GBV',
    description: 'Physical, sexual or emotional violence',
  },
  threats: {
    id: 'threats',
    label: 'Threats or intimidation',
    short: 'Threats',
    description: 'Threats, coercion or intimidation',
  },
  'school-dropout': {
    id: 'school-dropout',
    label: 'Forced school dropout',
    short: 'School',
    description: 'Being withdrawn from school against her will',
  },
  other: {
    id: 'other',
    label: 'Other protection concern',
    short: 'Other',
    description: 'Another safety or protection concern',
  },
};

export const RISK_LEVELS: Record<RiskLevel, { label: string; description: string }> = {
  info: {
    label: 'Information',
    description: 'Seeking information, no immediate risk indicated',
  },
  emerging: {
    label: 'Emerging risk',
    description: 'Harm may occur without early support',
  },
  urgent: {
    label: 'Urgent',
    description: 'Help needed now — priority response required',
  },
};

export const CASE_STATUSES: Record<CaseStatus, { label: string }> = {
  new: { label: 'New' },
  assigned: { label: 'Assigned' },
  'in-progress': { label: 'In progress' },
  escalated: { label: 'Escalated' },
  referred: { label: 'Referred' },
  closed: { label: 'Closed' },
  unreachable: { label: 'Unable to reach' },
};

export const ORG_TYPES: Record<OrganisationType, string> = {
  'child-protection': 'Child protection',
  health: 'Health facility',
  'legal-aid': 'Legal aid',
  'gbv-support': 'GBV support',
  shelter: 'Safe shelter',
  counselling: 'Counselling',
};

export const COUNTIES = [
  'Kisumu',
  'Nairobi',
  'Mombasa',
  'Nakuru',
  'Uasin Gishu',
  'Kilifi',
  'Kajiado',
  'Turkana',
  'Machakos',
  'Nyeri',
] as const;

export const ACCESSIBILITY_FEATURES: Record<string, string> = {
  'sign-language': 'Sign language',
  wheelchair: 'Wheelchair access',
  'low-literacy': 'Low-literacy friendly',
  'disability-trained': 'Disability-trained staff',
};
