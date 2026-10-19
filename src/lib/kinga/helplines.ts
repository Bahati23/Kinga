/**
 * Well-known, publicly listed support contacts in Kenya.
 *
 * Safety note: only nationally published, free public hotlines carry phone
 * numbers here. Organisations without a single national public line are
 * reached "via a Kinga responder" rather than listing numbers that could go
 * stale or be misdialled. Descriptions are bilingual (English / Kiswahili).
 */

export interface Helpline {
  id: string;
  name: string;
  number?: string;
  /** USSD-friendly short display of the number, if any */
  shortCode?: string;
  descriptionEn: string;
  descriptionSw: string;
  availabilityEn: string;
  availabilitySw: string;
  /** USSD support topic this helpline belongs to (1–4), if surfaced there */
  topic?: '1' | '2' | '3' | '4';
}

export const HELPLINES: Helpline[] = [
  {
    id: 'gbv-1195',
    name: 'National GBV Helpline (HAK)',
    number: '1195',
    shortCode: '1195',
    descriptionEn: 'National helpline for gender-based violence — counselling, rescue coordination and referrals.',
    descriptionSw: 'Simu ya kitaifa ya ukatili wa kijinsia — ushauri nasaha, uratibu wa uokoaji na marejeleo.',
    availabilityEn: 'Free · 24/7 · nationwide',
    availabilitySw: 'Bure · saa 24 · kote nchini',
    topic: '4',
  },
  {
    id: 'childline-116',
    name: 'Childline Kenya',
    number: '116',
    shortCode: '116',
    descriptionEn: 'Free national helpline for any child in danger or distress — children can call themselves.',
    descriptionSw: 'Simu ya bure ya kitaifa kwa mtoto yeyote aliye hatarini — mtoto anaweza kupiga mwenyewe.',
    availabilityEn: 'Free · 24/7 · nationwide',
    availabilitySw: 'Bure · saa 24 · kote nchini',
    topic: '1',
  },
  {
    id: 'redcross-1199',
    name: 'Kenya Red Cross Emergency',
    number: '1199',
    shortCode: '1199',
    descriptionEn: 'Emergency response, ambulance and rescue support across the country.',
    descriptionSw: 'Msaada wa dharura, ambulansi na uokoaji kote nchini.',
    availabilityEn: 'Free · 24/7 · nationwide',
    availabilitySw: 'Bure · saa 24 · kote nchini',
    topic: '2',
  },
  {
    id: 'police-112',
    name: 'Police Emergency',
    number: '112',
    shortCode: '112 / 999',
    descriptionEn: 'Immediate danger — the national emergency line. Also 999 and 911.',
    descriptionSw: 'Hatari ya moja kwa moja — simu ya dharura ya kitaifa. Pia 999 na 911.',
    availabilityEn: 'Free · 24/7 · nationwide',
    availabilitySw: 'Bure · saa 24 · kote nchini',
  },
];

export interface SupportOrg {
  id: string;
  name: string;
  knownForEn: string;
  knownForSw: string;
}

export const SUPPORT_ORGS: SupportOrg[] = [
  {
    id: 'fida',
    name: 'FIDA Kenya',
    knownForEn: 'Free legal aid for women and girls — protection orders, custody and inheritance rights.',
    knownForSw: 'Msaada wa kisheria bure kwa wanawake na wasichana — amri za ulinzi, ulinzi wa watoto na haki za urithi.',
  },
  {
    id: 'covaw',
    name: 'COVAW',
    knownForEn: 'Coalition on Violence Against Women — survivor support, advocacy and safe referrals.',
    knownForSw: 'Muungano dhidi ya ukatili kwa wanawake — msaada, utetezi na marejeleo salama.',
  },
  {
    id: 'gvrc',
    name: 'Gender Violence Recovery Centre (Nairobi Women’s Hospital)',
    knownForEn: 'Free medical and psychosocial care after violence, including for children.',
    knownForSw: 'Huduma ya afya na kisaikolojia bure baada ya ukatili, hata kwa watoto.',
  },
  {
    id: 'usikimye',
    name: 'Usikimye',
    knownForEn: 'GBV rescue, safe shelter and psychosocial support — “don’t be silent”.',
    knownForSw: 'Uokoaji wa GBV, makazi salama na msaada wa kisaikolojia — “usinyamaze”.',
  },
  {
    id: 'wangu-kanja',
    name: 'Wangu Kanja Foundation',
    knownForEn: 'Survivor-led support for people who have experienced sexual violence.',
    knownForSw: 'Msaada unaongozwa na waliopitia ukatili wa kingono.',
  },
];

/** Hotline number shown inside the USSD/SMS flow for each support topic. */
export const TOPIC_HOTLINE: Record<string, Helpline | undefined> = {
  '1': HELPLINES.find((h) => h.id === 'childline-116'),
  '2': HELPLINES.find((h) => h.id === 'redcross-1199'),
  '3': undefined, // legal aid → FIDA via responder
  '4': HELPLINES.find((h) => h.id === 'gbv-1195'),
};

export const TOPIC_ORG_LINE: Record<string, { en: string; sw: string } | undefined> = {
  '3': {
    en: 'FIDA Kenya offers free legal aid — a responder can connect you.',
    sw: 'FIDA Kenya hutoa msaada wa kisheria bure — mfanyakazi anaweza kukuunganisha.',
  },
  '1': undefined,
  '2': undefined,
  '4': undefined,
};
