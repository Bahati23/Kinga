/** English source-of-truth dictionary. Keys use dot namespaces. */
export const en: Record<string, string> = {
  // Brand
  'brand.tagline': 'Before harm happens',

  // Nav / header
  'nav.home': 'Home',
  'nav.ussd': 'USSD Demo',
  'nav.dashboard': 'Dashboard',
  'nav.referrals': 'Referrals',
  'nav.analytics': 'Analytics',
  'nav.admin': 'Admin',
  'nav.tryDemo': 'Try the USSD demo',
  'nav.menu': 'Kinga site navigation menu',
  'nav.openMenu': 'Open menu',

  // Footer
  'footer.tagline':
    'A privacy-first early-warning and referral platform helping girls and young women signal risk — before harm happens.',
  'footer.privacyBadge': 'No names. No exact locations. No tracking.',
  'footer.platform': 'Platform',
  'footer.ussd': 'USSD simulator',
  'footer.dashboard': 'Responder dashboard',
  'footer.referrals': 'Referral directory',
  'footer.analytics': 'Community analytics',
  'footer.admin': 'Administration',
  'footer.safetyTitle': 'Safety note',
  'footer.safetyNote':
    'Kinga supports early intervention. If someone is in immediate danger, contact local emergency services or go to a safe location first.',
  'footer.helplines': 'GBV helpline 1195 · Childline 116 · Emergency 112 — free, 24/7',
  'footer.demo':
    'Demonstration prototype for the SafeTech Africa HackLab. All data is fictional and stored only in this browser.',
  'footer.builtWith': 'Kinga — built with safeguarding and privacy at the core.',

  // Landing — hero
  'home.hero.kicker': 'Early warning · Referral · Protection',
  'home.hero.title1': 'Before harm',
  'home.hero.title2': 'happens.',
  'home.hero.lede':
    'Kinga — Swahili for “shield” — lets a girl discreetly signal the risk of child marriage, FGM or violence from any phone, and routes her to a verified network of trained responders while there is still time to act.',
  'home.hero.ctaUssd': 'Try the USSD demo',
  'home.hero.ctaDash': 'See the responder dashboard',
  'home.hero.statOpen': 'signals in the live queue',
  'home.hero.statUrgent': 'urgent right now',
  'home.hero.statServices': 'verified services across {orgs} partners',

  // Landing — live queue
  'home.queue.title': 'Live signal queue',
  'home.queue.live': 'updating now',
  'home.queue.note': 'No names. No phone numbers. No exact locations — by design.',
  'home.queue.county': '{county} County',
  'home.queue.self': 'self-reported',
  'home.queue.other': 'concerned person',

  // Landing — the shift
  'home.shift.l1a': 'Most systems respond ',
  'home.shift.l1em': 'after',
  'home.shift.l1b': ' harm.',
  'home.shift.l2a': 'Kinga acts ',
  'home.shift.l2em': 'before',
  'home.shift.l2b': '.',
  'home.shift.oldWay': 'The old way',
  'home.shift.old.1': 'Harm occurs',
  'home.shift.old.2': 'Report is made',
  'home.shift.old.3': 'Response begins',
  'home.shift.oldNote':
    'Help arrives only after a report — often too late, and only if someone dares to report at all.',
  'home.shift.newWay': 'The Kinga way',
  'home.shift.new.1': 'Risk appears',
  'home.shift.new.2': 'Discreet signal',
  'home.shift.new.3': 'Risk assessment',
  'home.shift.new.4': 'Verified referral',
  'home.shift.new.5': 'Follow-up',
  'home.shift.newNote':
    'A discreet signal triggers graduated intervention and a verified referral — potentially preventing the harm entirely.',

  // Landing — channels
  'home.channels.title': 'Reaches her where she is',
  'home.channels.lede':
    'Built for reality: basic phones, shared devices, patchy networks and the need for absolute discretion.',
  'home.ch.1.tag': 'Any phone',
  'home.ch.1.body':
    'Free sessions on the most basic handset. No smartphone, no data bundle, no app, no account.',
  'home.ch.2.name': 'SMS fallback',
  'home.ch.2.tag': 'Low signal areas',
  'home.ch.2.body':
    'The same guided flow over text when USSD sessions drop or a user prefers writing.',
  'home.ch.3.name': 'Responder web app',
  'home.ch.3.tag': 'For trained staff',
  'home.ch.3.body':
    'A secure dashboard where verified responders triage, refer, escalate and close cases.',

  // Landing — pillars
  'home.pillars.kicker': 'Privacy & safeguarding first',
  'home.pillars.title': 'Designed so using it can never endanger her',
  'home.pillar.1.title': 'Anonymous by default',
  'home.pillar.1.body':
    'No name, ID, contacts or photos are requested. A reference code identifies the request — not the girl.',
  'home.pillar.2.title': 'No exact locations',
  'home.pillar.2.body':
    'County-level geography only, and only after consent. Enough to find help — never enough to expose her.',
  'home.pillar.3.title': 'Humans decide',
  'home.pillar.3.body':
    'Technology routes and ranks. Every safeguarding decision is made by a trained, verified human responder.',
  'home.pillar.4.title': 'Community-level insight',
  'home.pillar.4.body':
    'Analytics are aggregated and k-anonymised — trends for planning, never individual stories.',

  // Landing — CTA
  'home.cta.title': 'Walk the whole journey in two minutes',
  'home.cta.lede':
    'File a signal on the simulated phone, then watch a responder triage it, match a verified service and close the loop.',
  'home.cta.primary': 'Start at the phone',
  'home.cta.secondary': 'View community analytics',

  // USSD page
  'ussd.kicker': 'Interactive demo',
  'ussd.title': 'Experience Kinga on a basic phone',
  'ussd.lede':
    'This is the real menu tree a girl would walk through. Complete a session and your signal lands in the responder dashboard — exactly as it would in the field.',
  'ussd.tabUssd': 'USSD — *384*21#',
  'ussd.tabSms': 'SMS fallback',
  'ussd.journey.title': 'How a signal travels',
  'ussd.journey.1.title': 'She dials or texts',
  'ussd.journey.1.body':
    'A free USSD session or SMS on any phone — no smartphone, data, or account needed.',
  'ussd.journey.2.title': 'Kinga classifies the signal',
  'ussd.journey.2.body':
    'Risk type and urgency are captured through four short questions. "Not sure" is always treated seriously.',
  'ussd.journey.3.title': 'The referral engine matches support',
  'ussd.journey.3.body':
    'Verified services are ranked by county coverage, capacity, accessibility and opening hours.',
  'ussd.journey.4.title': 'A human responder takes over',
  'ussd.journey.4.body':
    'A trained, verified responder makes discreet contact and manages the case to a safe outcome.',
  'ussd.privacy.title': 'Privacy by design',
  'ussd.privacy.1': 'No name, national ID, or contacts are ever requested',
  'ussd.privacy.2': 'County-level geography only — never GPS or exact location',
  'ussd.privacy.3': 'County is only asked after she consents to be contacted',
  'ussd.production':
    'Production path: Africa’s Talking delivers USSD/SMS webhooks to the Kinga backend (NestJS), which persists the case in PostgreSQL, runs the referral engine, and notifies the duty responder. Everything in this demo runs locally in your browser with fictional data.',
  'ussd.transcriptNote':
    'Real USSD replaces each screen with the next; this demo keeps a transcript so you can see the full journey.',
  'ussd.bannerTitle': 'Signal {ref} is now in the responder queue',
  'ussd.bannerBody':
    'This is the same case a duty responder would see seconds after a real USSD session.',
  'ussd.bannerCta': 'Open responder dashboard',
  'ussd.dialPrompt': 'Dial {code} to start a free, confidential Kinga session.',
  'ussd.enterDigits': 'Enter number…',
  'ussd.send': 'Send',
  'ussd.dial': 'Dial {code}',
  'ussd.delete': 'Delete last digit',
  'ussd.reset': 'End session and start over',
  'ussd.network': 'Safaricom',
  'sms.headerTitle': 'KINGA SMS',
  'sms.headerSub': 'Shortcode 21614 — free to text',
  'sms.emptyA': 'Text {keyword} to start.',
  'sms.emptyB': 'No account. No name. No charge.',
  'sms.placeholderStart': 'Type KINGA HELP…',
  'sms.placeholderReply': 'Reply with a number…',
  'sms.send': 'Send message',
  'sms.startOver': 'Start over',
  'sms.note':
    'In production, Africa’s Talking delivers these messages to Kinga’s SMS webhook and back.',

  // Dashboard
  'dash.signedIn': 'Signed in as {name} · {role}',
  'dash.title': 'Responder dashboard',
  'dash.reset': 'Reset demo data',
  'dash.resetTitle': 'Restore the original fictional demo data',
  'dash.stats.new': 'New signals',
  'dash.stats.urgent': 'Urgent now',
  'dash.stats.inProgress': 'In progress',
  'dash.stats.escalated': 'Escalated',
  'dash.stats.closed': 'Closed safely',
  'dash.tabs.all': 'All',
  'dash.tabs.new': 'New',
  'dash.tabs.mine': 'My cases',
  'dash.tabs.assigned': 'Assigned',
  'dash.tabs.in-progress': 'In progress',
  'dash.tabs.escalated': 'Escalated',
  'dash.tabs.referred': 'Referred',
  'dash.tabs.closed': 'Closed',
  'dash.empty':
    'No cases in this queue right now. File a signal from the {link} and it will appear here in real time.',
  'dash.emptyLink': 'USSD demo',
  'dash.privacyNote':
    'Cases carry no names, phone numbers or exact locations. Identifying details stay off the platform — always.',
  'dash.viewTrends': 'View aggregate trends',
  'dash.unassigned': 'Unassigned',

  // Case detail
  'case.back': 'Back to queue',
  'case.opened': 'Opened {date} at {time}',
  'case.updated': 'last update {ago}',
  'case.escalatedTitle': 'Escalated to the safeguarding desk.',
  'case.escalatedBody':
    'A safeguarding officer has been notified and coordinates any external intervention. All further actions are recorded in the protected audit log.',
  'case.noConsentTitle': 'Information-only request.',
  'case.noConsentBody':
    'The user declined contact. Do not attempt to reach them — share information through the channel only if they return.',
  'case.summary': 'Signal summary',
  'case.riskLevel': 'Risk level',
  'case.reportedBy': 'Reported by',
  'case.reportedSelf': 'The person at risk',
  'case.reportedOther': 'A concerned person',
  'case.location': 'Location',
  'case.locationCounty': '{county} County (county-level only)',
  'case.locationNotShared': 'Not shared (county only, never precise)',
  'case.consent': 'Consent to contact',
  'case.consentYes': 'Yes — discreet contact agreed',
  'case.consentNo': 'No — information only',
  'case.channel': 'Preferred channel',
  'case.assignedTo': 'Assigned responder',
  'case.unassigned': 'Unassigned',
  'case.referredTo': 'Referred:',
  'case.latestNote': 'Latest responder note',
  'case.timeline': 'Case timeline',
  'case.actions': 'Responder actions',
  'case.suggested':
    'Suggested: {name} — verified, covers {county}, lightest current caseload.',
  'case.assignPlaceholder': 'Assign to responder…',
  'case.assign': 'Assign',
  'case.take': 'Take case',
  'case.accept': 'Accept case',
  'case.notePlaceholder': 'Add a safeguarding note (no identifying details)…',
  'case.noteLabel': 'Case note',
  'case.addNote': 'Add note',
  'case.escalate': 'Escalate to safeguarding',
  'case.escalateTitle': 'Escalate {ref}?',
  'case.escalateBody':
    'Escalation notifies the safeguarding officer and moves this case to the priority lane. Use when harm may be imminent or involves a protection actor. This action is recorded in the audit log.',
  'case.cancel': 'Cancel',
  'case.unreachable': 'Mark unable to reach',
  'case.outcomePlaceholder':
    'Outcome summary for closing (e.g. risk addressed, referral completed)…',
  'case.outcomeLabel': 'Closing outcome',
  'case.close': 'Close case',
  'case.defaultOutcome': 'referral pathway completed',
  'case.engine': 'Referral engine',
  'case.bestMatch': 'Best match',
  'case.referHere': 'Refer here',
  'case.engineNote':
    'Ranked by county coverage, capacity, accessibility and hours. A human always makes the final referral decision.',
  'case.noMatch':
    'No verified service currently matches this risk category. The platform admin is notified to extend coverage.',
  'case.outsideCounty': 'Outside {county}',
  'case.closedNote':
    'This case is closed. Its full history remains in the protected audit trail.',
  'case.archivedNote':
    'This case is archived as unreachable. Its full history remains in the protected audit trail.',
  'case.notFound':
    'This case doesn’t exist — it may have been reset with the demo data.',
  'case.backToDash': 'Back to dashboard',

  // Engine reasons
  'engine.county': 'Covers {county} County',
  'engine.capacity': 'Has immediate capacity',
  'engine.limited': 'Limited capacity — may queue',
  'engine.access': 'Accessibility support available',
  'engine.hours': 'Open 24/7',

  // Case toasts
  'toast.assigned': 'Case assigned',
  'toast.assignedYou': 'Case assigned to you',
  'toast.accepted': 'Case accepted — make safe contact',
  'toast.escalated': 'Case escalated to safeguarding desk',
  'toast.unreachable': 'Marked unable to reach',
  'toast.note': 'Note added to case',
  'toast.closed': 'Case closed',
  'toast.referred': 'Referred to {name}',

  // Referrals page
  'refs.kicker': 'Referral network',
  'refs.title': 'Verified services, ready to receive her',
  'refs.lede':
    'A referral is only as safe as where it lands. Every organisation here is vetted by the Kinga safeguarding team before it can receive a single case.',
  'refs.statServices': 'verified services',
  'refs.statOrgs': 'partner organisations',
  'refs.statCounties': 'counties covered',
  'refs.searchPh': 'Search services, organisations, languages…',
  'refs.searchLabel': 'Search services',
  'refs.allCounties': 'All counties',
  'refs.allTypes': 'All service types',
  'refs.filterCounty': 'Filter by county',
  'refs.filterType': 'Filter by service type',
  'refs.empty':
    'No services match these filters. Try widening the county or type selection.',
  'refs.handles': 'Handles:',
  'refs.verifiedOrg': 'Verified organisation',

  // Helplines
  'helplines.title': 'National helplines — free & confidential',
  'helplines.lede':
    'Well-known public support lines anyone can call directly, even without Kinga. Free of charge, day and night.',
  'helplines.call': 'Call {number}',
  'helplines.free247': 'Free · 24/7 · nationwide',
  'helplines.orgsTitle': 'Well-known support organisations',
  'helplines.orgsLede':
    'Organisations with a long public record of standing with girls and women in Kenya. A Kinga responder can connect you — or find them through any public directory.',
  'helplines.viaResponder': 'Connect via a Kinga responder',

  // Analytics
  'analytics.kicker': 'Early-warning intelligence',
  'analytics.title': 'See risk rising before harm follows',
  'analytics.lede':
    'Aggregated, community-level patterns help partners position services where they will be needed next — {total} signals over eight months.',
  'analytics.privacyTitle': 'Anonymised by design',
  'analytics.privacyBody':
    'These views are aggregated to county level with a k-anonymity threshold of n ≥ 5 — groups smaller than five signals are suppressed. No chart on Kinga can ever identify an individual.',
  'analytics.chart1Title': 'Risk signals by category',
  'analytics.chart1Desc': 'Monthly signals, March – October',
  'analytics.chart2Title': 'Signals by county',
  'analytics.chart2Desc': 'This quarter · counties below n = 5 suppressed',
  'analytics.chart3Title': 'Time to first contact',
  'analytics.chart3Desc': 'Median hours from signal to responder contact',
  'analytics.chart4Title': 'Referral outcomes',
  'analytics.chart4Desc': 'All referrals to verified services, this year',
  'analytics.insightsTitle': 'What the patterns tell partners',
  'analytics.insight.1.title': 'Child-marriage signals rising',
  'analytics.insight.1.body':
    'Up 79% since March, concentrated in Kisumu and Kajiado — school-holiday periods align with the sharpest increases. Partners should pre-position caseworkers ahead of December.',
  'analytics.insight.2.title': 'First contact is getting faster',
  'analytics.insight.2.body':
    'Median time from signal to first responder contact fell from 9.5h to 3.8h as the responder network grew. The 24/7 GBV line covers most of the improvement.',
  'analytics.insight.3.title': 'FGM season signals spike in June',
  'analytics.insight.3.body':
    'The June spike repeats annually. Early-warning digests now trigger shelter capacity checks four weeks ahead of the season.',
  'analytics.demo':
    'Fictional demonstration data — illustrative of the dashboards partners would use for planning.',
  'analytics.hours': '{value} hours',

  // Admin
  'admin.kicker': 'Platform administration',
  'admin.title': 'Trust is managed here',
  'admin.lede':
    'Organisations, responders and services only enter the referral network after verification — and every sensitive action lands in an immutable audit trail.',
  'admin.stats.signals': 'Total signals',
  'admin.stats.active': 'Active cases',
  'admin.stats.escalated': 'Escalated',
  'admin.stats.responders': 'Active responders',
  'admin.stats.orgs': 'Verified organisations',
  'admin.safeguarding': '{count} case(s) in the safeguarding lane',
  'admin.safeguardingBody': '{refs} — safeguarding officer coordination in progress.',
  'admin.tab.organisations': 'organisations',
  'admin.tab.responders': 'responders',
  'admin.tab.services': 'services',
  'admin.tab.audit': 'Audit log',
  'admin.partnerSince': 'partner since {date}',
  'admin.verifyActivate': 'Verify & activate',
  'admin.suspend': 'Suspend',
  'admin.verified': 'Verified',
  'admin.awaiting': 'Awaiting verification',
  'admin.training': 'Training:',
  'admin.openCases': '{count} open case(s)',
  'admin.languages': 'Languages:',
  'admin.capacityLabel': 'Capacity for {name}',
  'admin.capacity': 'Capacity',
  'admin.active': 'Active',
  'admin.toggleResponder': 'Toggle verification for {name}',
  'admin.toggleService': 'Toggle {name}',
  'admin.auditTitle': 'Protected audit trail',
  'admin.auditNote':
    'Audit entries are append-only and hidden from ordinary administrators — mirroring the production design where audit logs are write-once and access-controlled.',

  // Admin toasts
  'toast.orgVerified': '{name} verified and activated',
  'toast.orgSuspended': '{name} suspended',
  'toast.orgSuspendedBody': 'Its services immediately stop receiving referrals.',
  'toast.rspVerified': '{name} verified',
  'toast.rspRevoked': '{name}’s verification revoked',
  'toast.svcOn': '{name} activated',
  'toast.svcOff': '{name} deactivated',
  'toast.svcCapacity': '{name}: capacity set to {value}',

  // 404
  'notfound.title': 'This path leads nowhere',
  'notfound.body':
    'The page you asked for doesn’t exist — but help is always one dial away.',
  'notfound.home': 'Return home',
  'notfound.demo': 'Try the USSD demo',

  // Domain vocabulary
  'cat.child-marriage': 'Child marriage',
  'cat.fgm': 'FGM',
  'cat.gbv': 'Gender-based violence',
  'cat.threats': 'Threats or intimidation',
  'cat.school-dropout': 'Forced school dropout',
  'cat.other': 'Other protection concern',
  'level.info': 'Information',
  'level.emerging': 'Emerging risk',
  'level.urgent': 'Urgent',
  'leveldesc.info': 'Seeking information, no immediate risk indicated',
  'leveldesc.emerging': 'Harm may occur without early support',
  'leveldesc.urgent': 'Help needed now — priority response required',
  'status.new': 'New',
  'status.assigned': 'Assigned',
  'status.in-progress': 'In progress',
  'status.escalated': 'Escalated',
  'status.referred': 'Referred',
  'status.closed': 'Closed',
  'status.unreachable': 'Unable to reach',
  'orgtype.child-protection': 'Child protection',
  'orgtype.health': 'Health facility',
  'orgtype.legal-aid': 'Legal aid',
  'orgtype.gbv-support': 'GBV support',
  'orgtype.shelter': 'Safe shelter',
  'orgtype.counselling': 'Counselling',
  'capacity.available': 'Available',
  'capacity.limited': 'Limited',
  'capacity.full': 'Full',
  'orgstatus.active': 'active',
  'orgstatus.pending': 'pending',
  'orgstatus.suspended': 'suspended',

  // Time
  'time.justNow': 'just now',
  'time.min': '{n} min ago',
  'time.hour': '{n} h ago',
  'time.day1': '1 day ago',
  'time.days': '{n} days ago',

  // Nav additions
  'nav.community': 'Community',
  'nav.safety': 'Stay safe',
  'nav.skip': 'Skip to main content',

  // Help & support tool
  'help.open': 'Open help and support',
  'help.button': 'Help',
  'help.title': 'Help is here',
  'help.lede': 'Free, confidential support — any time of day or night.',
  'help.helplines': 'Free national helplines',
  'help.call': 'Call {number}',
  'help.community': 'Talk with the community',
  'help.communityBody': 'Share and listen in a safe, pseudonymous circle.',
  'help.safety': 'Plan your safety',
  'help.safetyBody': 'Practical precautions to stop harm before it happens.',
  'help.ussd': 'Get help by phone',
  'help.ussdBody': 'Dial {code} free from any phone — no smartphone needed.',
  'help.quickExit': 'Quick exit',
  'help.quickExitNote': 'Leaves this site immediately and opens a neutral page.',
  'help.close': 'Close',

  // Community circle
  'community.kicker': 'Community circle',
  'community.title': 'You are not alone',
  'community.lede':
    'A pseudonymous space where survivors and girls facing risk can share, listen and encourage each other.',
  'community.safetyTitle': 'This is a public space',
  'community.safetyBody':
    'Never share your real name, school, village, phone number or photos. Everyone here appears with a pseudonym. In production, this circle is professionally moderated.',
  'community.guidelinesTitle': 'Circle agreements',
  'community.rule1': 'Share experiences and encouragement — never details that identify anyone.',
  'community.rule2': 'No contact details, no meeting requests, no photos.',
  'community.rule3': 'If someone is in danger now, guide them to 1195 or 112 — not to private messages.',
  'community.composer': 'Share something with the circle…',
  'community.post': 'Post to the circle',
  'community.posting': 'Posting…',
  'community.loginTitle': 'Join the conversation',
  'community.loginBody':
    'Create a free key to post. Your key is a random identity — it is never linked to your name, and the circle only ever shows you as a member.',
  'community.empty': 'No posts yet. Be the first to encourage the circle.',
  'community.member': 'Circle member',
  'community.phoneWarning':
    'It looks like you typed a phone number or long digits. For your safety, never share contact details here.',
  'community.error': 'Could not post right now. Please try again.',
  'community.replies': '{count} replies',
  'community.reply': 'Reply',
  'community.replyPlaceholder': 'Write a supportive reply…',
  'community.send': 'Send',
  'community.loading': 'Loading the circle…',

  // Safety & precautions
  'safety.kicker': 'Prevention',
  'safety.title': 'Guide your safety before harm happens',
  'safety.lede':
    'Practical, discreet precautions — designed for shared phones and sensitive situations.',
  'safety.signs.title': 'Know the warning signs',
  'safety.signs.lede': 'Harm rarely arrives without signals. These patterns deserve attention:',
  'safety.sign.1': 'Talk of stopping school, or sudden changes at home',
  'safety.sign.2': 'Mentions of visitors, ceremonies or “gifts” you were not told about',
  'safety.sign.3': 'Being watched, followed, or having your phone checked',
  'safety.sign.4': 'Threats when you say no, or pressure to keep secrets',
  'safety.sign.5': 'A friend suddenly withdrawn, anxious, or missing school',
  'safety.plan.title': 'Build your safety plan',
  'safety.plan.lede': 'Tick what you already have. Your progress is saved only on this device.',
  'safety.plan.1': 'One safe place I can go (relative, neighbour, chief, church/mosque)',
  'safety.plan.2': 'One trusted person who knows my situation',
  'safety.plan.3': 'A code word agreed with someone I trust',
  'safety.plan.4': 'Numbers memorised: 1195 (GBV) · 116 (children) · 112 (emergency)',
  'safety.plan.5': 'Phone charged and a little airtime kept aside',
  'safety.plan.6': 'Copies or photos of important documents in a safe place',
  'safety.plan.7': 'A small bag ready with essentials',
  'safety.plan.8': 'My Kinga reference code written somewhere safe',
  'safety.plan.done': '{done} of {total} ready',
  'safety.digital.title': 'Digital safety',
  'safety.digital.1': 'Delete call history after dialling *384*21# if someone checks your phone',
  'safety.digital.2': 'Delete sensitive SMS threads after reading the replies',
  'safety.digital.3': 'Lock your phone with a PIN only you know',
  'safety.digital.4': 'Use the Quick Exit inside the help button to leave this site fast',
  'safety.digital.5': 'Borrow a trusted person’s phone if yours is being monitored',
  'safety.now.title': 'If harm is close — right now',
  'safety.now.1': 'Move to your safe place, or a public area with people',
  'safety.now.2': 'Call 112 (emergency) or 1195 (GBV) — free, 24/7',
  'safety.now.3': 'Send your code word to your trusted person',
  'safety.now.4': 'Keep your Kinga reference code — it reconnects you without your name',
  'safety.communityCta': 'You do not have to figure this out alone — the circle is listening.',
  'safety.communityBtn': 'Visit the community circle',
  'safety.helplineCta': 'Prefer to talk to someone right now?',
};
