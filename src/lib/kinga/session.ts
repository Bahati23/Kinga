import type { Lang } from '@/lib/i18n/context';
import { TOPIC_HOTLINE, TOPIC_ORG_LINE } from './helplines';
import { submitSignal } from './store';
import type { Channel, ReporterType, RiskCategoryId, RiskLevel } from './types';

/**
 * Kinga session state machine — the exact menu tree a basic phone walks
 * through over USSD (and the same tree reused for the SMS channel), now fully
 * bilingual. Like real Kenyan USSD services, the session opens with a
 * language choice: 1. English, 2. Kiswahili.
 *
 * Safeguarding choices baked into the flow:
 *  - "I am not sure" about urgency is treated as an emerging risk
 *    (uncertainty is never ignored).
 *  - County is only requested *after* the user consents to be contacted —
 *    data collection follows consent, never precedes it.
 *  - Well-known free helplines (Childline 116, GBV 1195, Red Cross 1199)
 *    are shown in the support menus so users can also reach help directly.
 */

export type ScreenId =
  | 'language'
  | 'welcome'
  | 'risk'
  | 'urgency'
  | 'consent'
  | 'county'
  | 'done'
  | 'info'
  | 'info-detail'
  | 'support'
  | 'support-detail'
  | 'end';

export interface SessionData {
  screen: ScreenId;
  lang: Lang;
  reporter: ReporterType;
  category?: RiskCategoryId;
  level?: RiskLevel;
  consent?: boolean;
  county?: string;
  reference?: string;
  topic?: string;
}

export interface MenuOption {
  key: string;
  label: string;
}

export interface Reply {
  prompt: string;
  options: MenuOption[];
  end?: boolean;
  reference?: string;
}

// ---------------------------------------------------------------------------
// Bilingual prompt text
// ---------------------------------------------------------------------------

const PROMPTS: Record<string, Record<Lang, string>> = {
  language: {
    en: 'KARIBU KINGA.\nChoose language / Chagua lugha:\n\n1. English\n2. Kiswahili',
    sw: 'KARIBU KINGA.\nChoose language / Chagua lugha:\n\n1. English\n2. Kiswahili',
  },
  welcome: {
    en: 'KINGA — welcome.\nYou do not need to give your name.\n\n1. I need help\n2. I am worried about someone\n3. Get information\n4. Find support services\n5. Exit',
    sw: 'KINGA — karibu.\nHuhitaji kutaja jina lako.\n\n1. Nahitaji msaada\n2. Nina wasiwasi kuhusu mtu\n3. Pata taarifa\n4. Tafuta huduma za msaada\n5. Ondoka',
  },
  riskSelf: {
    en: 'What are you worried about?\n\n1. Forced marriage\n2. FGM\n3. Violence\n4. Threats\n5. Something else',
    sw: 'Una wasiwasi kuhusu nini?\n\n1. Ndoa ya kulazimishwa\n2. Ukeketaji\n3. Ukatili\n4. Vitisho\n5. Jambo lingine',
  },
  riskOther: {
    en: 'What is the person you are worried about facing?\n\n1. Forced marriage\n2. FGM\n3. Violence\n4. Threats\n5. Something else',
    sw: 'Mtu unayemwonea wasiwasi anakabili nini?\n\n1. Ndoa ya kulazimishwa\n2. Ukeketaji\n3. Ukatili\n4. Vitisho\n5. Jambo lingine',
  },
  urgency: {
    en: 'How urgent is the situation?\n\n1. I need help now\n2. I may be at risk soon\n3. I only want information\n4. I am not sure',
    sw: 'Je, hali hii ni ya haraka kiasi gani?\n\n1. Nahitaji msaada sasa hivi\n2. Naweza kuwa hatarini hivi karibuni\n3. Nataka taarifa tu\n4. Sina uhakika',
  },
  consent: {
    en: 'Can a trained support person contact you through this phone?\nIt will be discreet.\n\n1. Yes, contact me\n2. No, information only',
    sw: 'Je, mfanyakazi wa msaada aliyefunzwa anaweza kuwasiliana nawe kupitia simu hii?\nItakuwa kwa siri.\n\n1. Ndiyo, niwasiliane nami\n2. Hapana, taarifa tu',
  },
  county: {
    en: 'Which county is this about?\nThis helps us find nearby support. We never ask for your exact location.\n\n1. Kisumu\n2. Nairobi\n3. Mombasa\n4. Nakuru\n5. Kajiado\n6. Another county',
    sw: 'Hii inahusu kaunti gani?\nHutusaidia kupata msaada wa karibu. Hatuulizi mahali ulipo hasa.\n\n1. Kisumu\n2. Nairobi\n3. Mombasa\n4. Nakuru\n5. Kajiado\n6. Kaunti nyingine',
  },
  info: {
    en: 'What would you like to know?\n\n1. What is child marriage?\n2. What is FGM?\n3. Your legal rights\n4. Making a safety plan\n0. Back',
    sw: 'Ungependa kujua nini?\n\n1. Ndoa ya utotoni ni nini?\n2. Ukeketaji ni nini?\n3. Haki zako za kisheria\n4. Kupanga usalama wako\n0. Rudi',
  },
  info1: {
    en: 'Child marriage is any marriage where a person is under 18. It is illegal in Kenya (Marriage Act, 2014). You have the right to refuse and to get help — even if the arrangements have already started.',
    sw: 'Ndoa ya utotoni ni ndoa ambapo mmoja hajafikia miaka 18. Ni haramu kisheria Kenya (Sheria ya Ndoa, 2014). Una haki ya kukataa na kupata msaada — hata kama mipango imeanza.',
  },
  info2: {
    en: 'FGM is illegal in Kenya (Prohibition of FGM Act, 2011). It has no health benefits and causes serious, lasting harm. Protection and medical care are available, and nobody may force you.',
    sw: 'Ukeketaji ni haramu kisheria Kenya (Sheria ya Kupiga Marufuku Ukeketaji, 2011). Hauna faida ya kiafya na husababisha madhara makubwa. Ulinzi na huduma ya afya vinapatikana, na hakuna anayeweza kukulazimisha.',
  },
  info3: {
    en: 'You have the right to say no to marriage, to live free from violence, to stay in school, to get medical care, and to report abuse safely. A trained person can explain your options in private.',
    sw: 'Una haki ya kukataa ndoa, kuishi bila ukatili, kuendelea na shule, kupata huduma ya afya, na kuripoti unyanyasaji kwa usalama. Mtaalamu anaweza kueleza chaguo zako kwa siri.',
  },
  info4: {
    en: 'If you may be at risk: know one safe place you can go, memorise one trusted phone number, keep your phone charged, and agree on a code word with someone you trust.',
    sw: 'Ikiwa unaweza kuwa hatarini: jua mahali salama pa kwenda, kariri namba moja ya simu unayoamini, weka simu yako imejaa chaji, na kubaliana neno la siri na mtu unayemwamini.',
  },
  support: {
    en: 'Which kind of support?\n\n1. Child protection\n2. Health care\n3. Legal aid\n4. Safe shelter\n0. Back',
    sw: 'Ni aina gani ya msaada?\n\n1. Ulinzi wa mtoto\n2. Huduma za afya\n3. Msaada wa kisheria\n4. Makazi salama\n0. Rudi',
  },
  support1: {
    en: 'Child protection services help when a girl is at risk of marriage, FGM, or being removed from school. A trained officer can talk with you privately, mediate with family, or arrange safe care.',
    sw: 'Huduma za ulinzi wa mtoto husaidia msichana aliye hatarini ya ndoa, ukeketaji, au kuondolewa shuleni. Ofisa aliyefunzwa anaweza kuongea nawe kwa siri, kupatanisha na familia, au kupanga makazi salama.',
  },
  support2: {
    en: 'Confidential health services can treat injuries, provide post-violence care, and answer health questions. You can be seen without anyone else being told.',
    sw: 'Huduma za afya za siri hutibu majeraha, kutoa huduma baada ya ukatili, na kujibu maswali ya afya. Unaweza kuonekana bila mtu mwingine kujulishwa.',
  },
  support3: {
    en: 'Legal aid can explain the law, help with protection orders, and support you if a case goes further — free of charge.',
    sw: 'Msaada wa kisheria hueleza sheria, kusaidia amri za ulinzi, na kukuunga mkono kesi iendelee — bila malipo.',
  },
  support4: {
    en: 'A safe shelter is a confidential place to stay when home is not safe. Locations are kept private for your protection.',
    sw: 'Makazi salama ni mahali pa siri pa kukaa wakati nyumbani si salama. Mahali pake hufichwa kwa ulinzi wako.',
  },
  supportConnect: {
    en: 'To be connected, choose "I need help" from the main menu.',
    sw: 'Ili kuunganishwa, chagua "Nahitaji msaada" kwenye orodha kuu.',
  },
  freeHelpline: {
    en: 'Free helpline:',
    sw: 'Simu ya bure:',
  },
  callAnytime: {
    en: 'call any time',
    sw: 'piga wakati wowote',
  },
  doneBase: {
    en: 'Thank you. Your request has been received.\n\nReference: {ref}\nKeep it safe — it identifies your request without your name.',
    sw: 'Asante. Ombi lako limepokelewa.\n\nKumbukumbu: {ref}\nIiweke salama — inatambulisha ombi lako bila jina lako.',
  },
  doneContactYes: {
    en: 'A trained responder will reach out discreetly through this phone.',
    sw: 'Mfanyakazi wa msaada atawasiliana nawe kwa siri kupitia simu hii.',
  },
  doneContactNo: {
    en: 'You chose not to be contacted. We will not reach out — but you can come back any time.',
    sw: 'Umechagua kutowasiliwa. Hatutawasiliana nawe — lakini unaweza kurudi wakati wowote.',
  },
  doneUrgent: {
    en: 'Your signal has been marked URGENT and goes first in the queue.',
    sw: 'Ishara yako imewekwa DHARURA na inaongoza kwenye foleni.',
  },
  doneDanger: {
    en: 'If you are in immediate danger, go to a safe place or contact local emergency services now (112 / 999).',
    sw: 'Ikiwa uko hatarini sasa hivi, nenda mahali salama au piga huduma za dharura (112 / 999) mara moja.',
  },
  doneHelplines: {
    en: 'Free helplines any time: GBV 1195 · Childline 116 · Red Cross 1199.',
    sw: 'Simu za bure wakati wowote: GBV 1195 · Watoto 116 · Msalaba Mwekundu 1199.',
  },
  end: {
    en: 'Thank you for using KINGA.\nYou can dial again any time — it is free and confidential.\n\nSession ended.',
    sw: 'Asante kwa kutumia KINGA.\nUnaweza kupiga tena wakati wowote — ni bure na siri.\n\nKipindi kimemalizika.',
  },
  invalid: {
    en: 'Invalid choice. Reply with a number from the menu.',
    sw: 'Chaguo si sahihi. Jibu kwa namba kutoka kwenye orodha.',
  },
  sessionEnded: {
    en: 'Session ended.',
    sw: 'Kipindi kimemalizika.',
  },
  back: {
    en: 'Back',
    sw: 'Rudi',
  },
};

const p = (id: string, lang: Lang): string => PROMPTS[id][lang];

function opt(key: string, enLabel: string, swLabel: string, lang: Lang): MenuOption {
  return { key, label: lang === 'sw' ? swLabel : enLabel };
}

// ---------------------------------------------------------------------------
// Menus
// ---------------------------------------------------------------------------

const RISK_BY_KEY: Record<string, RiskCategoryId> = {
  '1': 'child-marriage',
  '2': 'fgm',
  '3': 'gbv',
  '4': 'threats',
  '5': 'other',
};

const COUNTY_KEYS: Record<string, string> = {
  '1': 'Kisumu',
  '2': 'Nairobi',
  '3': 'Mombasa',
  '4': 'Nakuru',
  '5': 'Kajiado',
  '6': 'Other',
};

function languageReply(): Reply {
  return {
    prompt: p('language', 'en'),
    options: [
      { key: '1', label: 'English' },
      { key: '2', label: 'Kiswahili' },
    ],
  };
}

function welcomeOptions(lang: Lang): MenuOption[] {
  return [
    opt('1', 'I need help', 'Nahitaji msaada', lang),
    opt('2', 'I am worried about someone', 'Nina wasiwasi kuhusu mtu', lang),
    opt('3', 'Get information', 'Pata taarifa', lang),
    opt('4', 'Find support services', 'Tafuta huduma za msaada', lang),
    opt('5', 'Exit', 'Ondoka', lang),
  ];
}

function welcomeReply(lang: Lang): Reply {
  return { prompt: p('welcome', lang), options: welcomeOptions(lang) };
}

function riskOptions(lang: Lang): MenuOption[] {
  return [
    opt('1', 'Forced marriage', 'Ndoa ya kulazimishwa', lang),
    opt('2', 'FGM', 'Ukeketaji', lang),
    opt('3', 'Violence', 'Ukatili', lang),
    opt('4', 'Threats', 'Vitisho', lang),
    opt('5', 'Something else', 'Jambo lingine', lang),
  ];
}

function riskReply(reporter: ReporterType, lang: Lang): Reply {
  return {
    prompt: p(reporter === 'self' ? 'riskSelf' : 'riskOther', lang),
    options: riskOptions(lang),
  };
}

function urgencyReply(lang: Lang): Reply {
  return {
    prompt: p('urgency', lang),
    options: [
      opt('1', 'I need help now', 'Nahitaji msaada sasa hivi', lang),
      opt('2', 'I may be at risk soon', 'Naweza kuwa hatarini hivi karibuni', lang),
      opt('3', 'I only want information', 'Nataka taarifa tu', lang),
      opt('4', 'I am not sure', 'Sina uhakika', lang),
    ],
  };
}

function consentReply(lang: Lang): Reply {
  return {
    prompt: p('consent', lang),
    options: [
      opt('1', 'Yes, contact me', 'Ndiyo, niwasiliane nami', lang),
      opt('2', 'No, information only', 'Hapana, taarifa tu', lang),
    ],
  };
}

function countyReply(lang: Lang): Reply {
  return {
    prompt: p('county', lang),
    options: [
      opt('1', 'Kisumu', 'Kisumu', lang),
      opt('2', 'Nairobi', 'Nairobi', lang),
      opt('3', 'Mombasa', 'Mombasa', lang),
      opt('4', 'Nakuru', 'Nakuru', lang),
      opt('5', 'Kajiado', 'Kajiado', lang),
      opt('6', 'Another county', 'Kaunti nyingine', lang),
    ],
  };
}

function infoReply(lang: Lang): Reply {
  return {
    prompt: p('info', lang),
    options: [
      opt('1', 'What is child marriage?', 'Ndoa ya utotoni ni nini?', lang),
      opt('2', 'What is FGM?', 'Ukeketaji ni nini?', lang),
      opt('3', 'Your legal rights', 'Haki zako za kisheria', lang),
      opt('4', 'Making a safety plan', 'Kupanga usalama wako', lang),
      opt('0', 'Back', 'Rudi', lang),
    ],
  };
}

function supportReply(lang: Lang): Reply {
  return {
    prompt: p('support', lang),
    options: [
      opt('1', 'Child protection', 'Ulinzi wa mtoto', lang),
      opt('2', 'Health care', 'Huduma za afya', lang),
      opt('3', 'Legal aid', 'Msaada wa kisheria', lang),
      opt('4', 'Safe shelter', 'Makazi salama', lang),
      opt('0', 'Back', 'Rudi', lang),
    ],
  };
}

function backReply(prompt: string, lang: Lang): Reply {
  return {
    prompt: `${prompt}\n\n0. ${p('back', lang)}`,
    options: [opt('0', 'Back', 'Rudi', lang)],
  };
}

function supportDetailReply(topic: string, lang: Lang): Reply {
  let text = p(`support${topic}`, lang);
  const hotline = TOPIC_HOTLINE[topic];
  if (hotline?.shortCode) {
    text += `\n\n${p('freeHelpline', lang)} ${hotline.name} ${hotline.shortCode} — ${p('callAnytime', lang)}.`;
  }
  const orgLine = TOPIC_ORG_LINE[topic];
  if (orgLine) {
    text += `\n\n${lang === 'sw' ? orgLine.sw : orgLine.en}`;
  }
  text += `\n\n${p('supportConnect', lang)}`;
  return backReply(text, lang);
}

function doneReply(reference: string, level: RiskLevel, consent: boolean, lang: Lang): Reply {
  let text = p('doneBase', lang).replace('{ref}', reference);
  text += `\n${consent ? p('doneContactYes', lang) : p('doneContactNo', lang)}`;
  if (level === 'urgent') text += `\n${p('doneUrgent', lang)}`;
  text += `\n${p('doneHelplines', lang)}`;
  text += `\n\n${p('doneDanger', lang)}`;
  return {
    prompt: text,
    options: [opt('0', 'End session', 'Malizia kipindi', lang)],
    end: true,
    reference,
  };
}

function endReply(lang: Lang): Reply {
  return { prompt: p('end', lang), options: [], end: true };
}

function invalid(reply: Reply, lang: Lang): Reply {
  return { ...reply, prompt: `${p('invalid', lang)}\n\n${reply.prompt}` };
}

// ---------------------------------------------------------------------------
// Machine
// ---------------------------------------------------------------------------

export function initialSession(): SessionData {
  return { screen: 'language', lang: 'en', reporter: 'self' };
}

/** The first thing a user sees after dialling / texting in. */
export function firstReply(): Reply {
  return languageReply();
}

function finish(session: SessionData, channel: Channel, county: string): { session: SessionData; reply: Reply } {
  const reference = submitSignal({
    riskCategory: session.category ?? 'other',
    riskLevel: session.level ?? 'info',
    channel,
    reporter: session.reporter,
    preferredContact: session.consent ? 'sms' : 'none',
    consentToRefer: session.consent === true,
    county,
  });
  const next: SessionData = { ...session, county, reference, screen: 'done' };
  return { session: next, reply: doneReply(reference, session.level ?? 'info', session.consent === true, session.lang) };
}

export function step(session: SessionData, rawInput: string, channel: Channel): { session: SessionData; reply: Reply } {
  const input = rawInput.trim();
  const lang = session.lang;

  switch (session.screen) {
    case 'language': {
      if (input === '1') {
        const next: SessionData = { ...session, lang: 'en', screen: 'welcome' };
        return { session: next, reply: welcomeReply('en') };
      }
      if (input === '2') {
        const next: SessionData = { ...session, lang: 'sw', screen: 'welcome' };
        return { session: next, reply: welcomeReply('sw') };
      }
      return { session, reply: invalid(languageReply(), 'en') };
    }

    case 'welcome': {
      if (input === '1') {
        const next: SessionData = { ...session, reporter: 'self', screen: 'risk' };
        return { session: next, reply: riskReply('self', lang) };
      }
      if (input === '2') {
        const next: SessionData = { ...session, reporter: 'concerned-other', screen: 'risk' };
        return { session: next, reply: riskReply('concerned-other', lang) };
      }
      if (input === '3') {
        return { session: { ...session, screen: 'info' }, reply: infoReply(lang) };
      }
      if (input === '4') {
        return { session: { ...session, screen: 'support' }, reply: supportReply(lang) };
      }
      if (input === '5') {
        return { session: { ...session, screen: 'end' }, reply: endReply(lang) };
      }
      return { session, reply: invalid(welcomeReply(lang), lang) };
    }

    case 'risk': {
      const category = RISK_BY_KEY[input];
      if (!category) return { session, reply: invalid(riskReply(session.reporter, lang), lang) };
      const next: SessionData = { ...session, category, screen: 'urgency' };
      return { session: next, reply: urgencyReply(lang) };
    }

    case 'urgency': {
      if (input === '1' || input === '2' || input === '4') {
        // "I am not sure" is treated as emerging — uncertainty is never ignored.
        const level: RiskLevel = input === '1' ? 'urgent' : 'emerging';
        const next: SessionData = { ...session, level, screen: 'consent' };
        return { session: next, reply: consentReply(lang) };
      }
      if (input === '3') {
        const next: SessionData = { ...session, level: 'info', screen: 'info' };
        return { session: next, reply: infoReply(lang) };
      }
      return { session, reply: invalid(urgencyReply(lang), lang) };
    }

    case 'consent': {
      if (input === '1') {
        const next: SessionData = { ...session, consent: true, screen: 'county' };
        return { session: next, reply: countyReply(lang) };
      }
      if (input === '2') {
        // Information-only: no county requested — data collection follows consent.
        return finish({ ...session, consent: false }, channel, 'Not shared');
      }
      return { session, reply: invalid(consentReply(lang), lang) };
    }

    case 'county': {
      const county = COUNTY_KEYS[input];
      if (!county) return { session, reply: invalid(countyReply(lang), lang) };
      return finish(session, channel, county);
    }

    case 'info': {
      if (input === '0') return { session: { ...session, screen: 'welcome' }, reply: welcomeReply(lang) };
      if (['1', '2', '3', '4'].includes(input)) {
        return {
          session: { ...session, screen: 'info-detail', topic: input },
          reply: backReply(p(`info${input}`, lang), lang),
        };
      }
      return { session, reply: invalid(infoReply(lang), lang) };
    }

    case 'support': {
      if (input === '0') return { session: { ...session, screen: 'welcome' }, reply: welcomeReply(lang) };
      if (['1', '2', '3', '4'].includes(input)) {
        return {
          session: { ...session, screen: 'support-detail', topic: input },
          reply: supportDetailReply(input, lang),
        };
      }
      return { session, reply: invalid(supportReply(lang), lang) };
    }

    case 'info-detail': {
      if (input === '0') return { session: { ...session, screen: 'info' }, reply: infoReply(lang) };
      return { session, reply: invalid(backReply(p(`info${session.topic ?? '1'}`, lang), lang), lang) };
    }

    case 'support-detail': {
      if (input === '0') return { session: { ...session, screen: 'support' }, reply: supportReply(lang) };
      return { session, reply: invalid(supportDetailReply(session.topic ?? '1', lang), lang) };
    }

    case 'done':
    case 'end':
    default: {
      return {
        session: initialSession(),
        reply: {
          prompt: `${p('sessionEnded', lang)}\n\n${languageReply().prompt}`,
          options: languageReply().options,
        },
      };
    }
  }
}
