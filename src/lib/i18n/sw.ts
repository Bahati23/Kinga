/** Kamusi ya Kiswahili — Swahili dictionary (Kenyan standard, simple register). */
export const sw: Record<string, string> = {
  // Brand
  'brand.tagline': 'Kabla madhara hayajatokea',

  // Nav / header
  'nav.home': 'Mwanzo',
  'nav.ussd': 'Onyesho la USSD',
  'nav.dashboard': 'Dashibodi',
  'nav.referrals': 'Marejeleo',
  'nav.analytics': 'Takwimu',
  'nav.admin': 'Usimamizi',
  'nav.tryDemo': 'Jaribu onyesho la USSD',
  'nav.menu': 'Menyu ya urambazaji ya Kinga',
  'nav.openMenu': 'Fungua menyu',

  // Footer
  'footer.tagline':
    'Jukwaa la faragha la onyo la mapema na marejeleo linalosaidia wasichana na wanawake vijana kutoa ishara ya hatari — kabla madhara hayajatokea.',
  'footer.privacyBadge': 'Hakuna majina. Hakuna maeneo kamili. Hakuna ufuatiliaji.',
  'footer.platform': 'Jukwaa',
  'footer.ussd': 'Kionyeshi cha USSD',
  'footer.dashboard': 'Dashibodi ya mfanyakazi',
  'footer.referrals': 'Orodha ya marejeleo',
  'footer.analytics': 'Takwimu za jamii',
  'footer.admin': 'Usimamizi',
  'footer.safetyTitle': 'Kidokezo cha usalama',
  'footer.safetyNote':
    'Kinga husaidia kuingilia mapema. Mtu akiwa hatarini sasa hivi, wasiliana na huduma za dharura au nenda mahali salama kwanza.',
  'footer.helplines': 'GBV 1195 · Watoto 116 · Dharura 112 — bure, saa 24',
  'footer.demo':
    'Onyesho la majaribio kwa SafeTech Africa HackLab. Data yote ni ya kubuni na huhifadhiwa kwenye kivinjari hiki pekee.',
  'footer.builtWith': 'Kinga — imejengwa kwa kuweka ulinzi na faragha mbele.',

  // Landing — hero
  'home.hero.kicker': 'Onyo la mapema · Marejeleo · Ulinzi',
  'home.hero.title1': 'Kabla madhara',
  'home.hero.title2': 'hayajatokea.',
  'home.hero.lede':
    'Kinga humwezesha msichana kutoa ishara ya siri kuhusu hatari ya ndoa ya utotoni, ukeketaji au ukatili kutoka simu yoyote, na kumunganisha na watoa msaada waliothibitishwa wakati bado kuna nafasi ya kuzuia madhara.',
  'home.hero.ctaUssd': 'Jaribu onyesho la USSD',
  'home.hero.ctaDash': 'Tazama dashibodi',
  'home.hero.statOpen': 'ishara kwenye foleni',
  'home.hero.statUrgent': 'dharura sasa hivi',
  'home.hero.statServices': 'huduma zilizothibitishwa kupitia washirika {orgs}',

  // Landing — live queue
  'home.queue.title': 'Foleni ya ishara moja kwa moja',
  'home.queue.live': 'inajisasisha sasa',
  'home.queue.note': 'Hakuna majina. Hakuna namba za simu. Hakuna maeneo kamili — kwa makusudi.',
  'home.queue.county': 'Kaunti ya {county}',
  'home.queue.self': 'ameripoti mwenyewe',
  'home.queue.other': 'mtu mwenye wasiwasi',

  // Landing — the shift
  'home.shift.l1a': 'Mifumo mingi huitikia ',
  'home.shift.l1em': 'baada',
  'home.shift.l1b': ' ya madhara.',
  'home.shift.l2a': 'Kinga huchukua hatua ',
  'home.shift.l2em': 'kabla',
  'home.shift.l2b': '.',
  'home.shift.oldWay': 'Njia ya zamani',
  'home.shift.old.1': 'Madhara yametokea',
  'home.shift.old.2': 'Ripoti inatolewa',
  'home.shift.old.3': 'Msaada unaanza',
  'home.shift.oldNote':
    'Msaada hufika tu baada ya ripoti — mara nyingi umechelewa, na tu kama mtu anathubutu kuripoti.',
  'home.shift.newWay': 'Njia ya Kinga',
  'home.shift.new.1': 'Hatari inaonekana',
  'home.shift.new.2': 'Ishara ya siri',
  'home.shift.new.3': 'Tathmini ya hatari',
  'home.shift.new.4': 'Rejeleo lililothibitishwa',
  'home.shift.new.5': 'Ufuatiliaji',
  'home.shift.newNote':
    'Ishara ya siri huzindua hatua za kupambua na rejeleo lililothibitishwa — na kuzuia madhara kabisa.',

  // Landing — channels
  'home.channels.title': 'Inamfikia aliko',
  'home.channels.lede':
    'Imejengwa kwa uhalisia: simu za kawaida, simu za pamoja, mtandao dhaifu na hitaji la siri kabisa.',
  'home.ch.1.tag': 'Simu yoyote',
  'home.ch.1.body':
    'Vipindi vya bure kwenye simu ya kawaida kabisa. Hakuna simu mahiri, hakuna data, hakuna programu, hakuna akaunti.',
  'home.ch.2.name': 'SMS mbadala',
  'home.ch.2.tag': 'Mtandao dhaifu',
  'home.ch.2.body':
    'Mtiririko ule ule wa kuongozwa kwa ujumbe mfupi USSD ikikatika au mtumiaji akipendelea kuandika.',
  'home.ch.3.name': 'Programu ya wavuti ya wafanyakazi',
  'home.ch.3.tag': 'Kwa wafanyakazi waliofunzwa',
  'home.ch.3.body':
    'Dashibodi salama ambapo wafanyakazi waliothibitishwa hupanga, kurejelea, kupandisha na kufunga kesi.',

  // Landing — pillars
  'home.pillars.kicker': 'Faragha na ulinzi kwanza',
  'home.pillars.title': 'Imebuniwa ili kuitumia kusiweze kumdhuru kamwe',
  'home.pillar.1.title': 'Siri tangu mwanzo',
  'home.pillar.1.body':
    'Hakuna jina, kitambulisho, anwani au picha inayoombwa. Namba ya kumbukumbu hutambulisha ombi — si msichana.',
  'home.pillar.2.title': 'Hakuna maeneo kamili',
  'home.pillar.2.body':
    'Kiwango cha kaunti pekee, na baada ya ridhaa tu. Ya kutosha kupata msaada — kamwe si ya kumfichua.',
  'home.pillar.3.title': 'Binadamu huamua',
  'home.pillar.3.body':
    'Teknolojia huongoza na kupanga kwa umuhimu. Kila uamuzi wa ulinzi hufanywa na binadamu aliyefunzwa na kuthibitishwa.',
  'home.pillar.4.title': 'Uchunguzi wa kiwango cha jamii',
  'home.pillar.4.body':
    'Takwimu ni za jumla na zimefichwa — mienendo ya kupanga huduma, kamwe si hadithi za watu binafsi.',

  // Landing — CTA
  'home.cta.title': 'Tembelea safari nzima kwa dakika mbili',
  'home.cta.lede':
    'Toa ishara kwenye simu ya mfano, kisha uone mfanyakazi akipokea, kupata huduma iliyothibitishwa na kufunga kesi.',
  'home.cta.primary': 'Anza kwenye simu',
  'home.cta.secondary': 'Tazama takwimu za jamii',

  // USSD page
  'ussd.kicker': 'Onyesho la kuingiliana',
  'ussd.title': 'Jaribu Kinga kwenye simu ya kawaida',
  'ussd.lede':
    'Hu ndio mti halisi wa menyu ambayo msichana angepitia. Malizia kipindi na ishara yako inaingia kwenye dashibodi ya mfanyakazi — kama ilivyo mashinani.',
  'ussd.tabUssd': 'USSD — *384*21#',
  'ussd.tabSms': 'SMS mbadala',
  'ussd.journey.title': 'Ishara inavyosafiri',
  'ussd.journey.1.title': 'Anapiga au kutuma ujumbe',
  'ussd.journey.1.body':
    'Kipindi cha bure cha USSD au SMS kwa simu yoyote — hakuna simu mahiri, data au akaunti.',
  'ussd.journey.2.title': 'Kinga hupanga ishara',
  'ussd.journey.2.body':
    'Aina ya hatari na kiwango cha haraka hupatikana kupitia maswali manne mafupi. "Sijui" huchukuliwa kwa uzito kila wakati.',
  'ussd.journey.3.title': 'Injini ya marejeleo hupata msaada',
  'ussd.journey.3.body':
    'Huduma zilizothibitishwa hupangwa kwa eneo la kaunti, uwezo, ufikivu na saa za kazi.',
  'ussd.journey.4.title': 'Binadamu huchukua hatua',
  'ussd.journey.4.body':
    'Mfanyakazi aliyefunzwa na kuthibitishwa hufanya mawasiliano ya siri na kuongoza kesi hadi matokeo salama.',
  'ussd.privacy.title': 'Faragha tangu mwanzo',
  'ussd.privacy.1': 'Hakuna jina, kitambulisho cha kitaifa au anwani inayoombwa',
  'ussd.privacy.2': 'Kiwango cha kaunti pekee — kamwe si GPS au mahali kamili',
  'ussd.privacy.3': 'Kaunti huulizwa tu baada yake kuridhi kuwasiliwa',
  'ussd.production':
    'Njia ya uzalishaji: Africa’s Talking hutuma miunganisho ya USSD/SMS kwa seva ya Kinga (NestJS), ambayo huhifadhi kesi kwenye PostgreSQL, kuendesha injini ya marejeleo, na kumjulishe mfanyakazi wa zamu. Kila kitu katika onyesho hili hufanyika ndani ya kivinjari chako kwa data ya kubuni.',
  'ussd.transcriptNote':
    'USSD halisi hubadilisha skrini kila hatua; onyesho hili huhifadhi maandishi ili uone safari nzima.',
  'ussd.bannerTitle': 'Ishara {ref} sasa iko kwenye foleni ya wafanyakazi',
  'ussd.bannerBody':
    'Hii ndiyo kesi ambayo mfanyakazi wa zamu angeiona sekunde chache baada ya kipindi halisi cha USSD.',
  'ussd.bannerCta': 'Fungua dashibodi ya mfanyakazi',
  'ussd.dialPrompt': 'Piga {code} kuanza kipindi cha bure na siri cha Kinga.',
  'ussd.enterDigits': 'Weka namba…',
  'ussd.send': 'Tuma',
  'ussd.dial': 'Piga {code}',
  'ussd.delete': 'Futa tarakimu ya mwisho',
  'ussd.reset': 'Malizia kipindi na anza upya',
  'ussd.network': 'Safaricom',
  'sms.headerTitle': 'KINGA SMS',
  'sms.headerSub': 'Namba fupi 21614 — bure kutuma',
  'sms.emptyA': 'Tuma {keyword} kuanza.',
  'sms.emptyB': 'Hakuna akaunti. Hakuna jina. Hakuna malipo.',
  'sms.placeholderStart': 'Andika KINGA HELP…',
  'sms.placeholderReply': 'Jibu kwa namba…',
  'sms.send': 'Tuma ujumbe',
  'sms.startOver': 'Anza upya',
  'sms.note':
    'Katika uzalishaji, Africa’s Talking hupitisha ujumbe huu kwa seva ya Kinga na kurudisha majibu.',

  // Dashboard
  'dash.signedIn': 'Umeingia kama {name} · {role}',
  'dash.title': 'Dashibodi ya mfanyakazi',
  'dash.reset': 'Rudisha data ya onyesho',
  'dash.resetTitle': 'Rudisha data ya awali ya kubuni',
  'dash.stats.new': 'Ishara mpya',
  'dash.stats.urgent': 'Dharura sasa',
  'dash.stats.inProgress': 'Inaendelea',
  'dash.stats.escalated': 'Imepandishwa',
  'dash.stats.closed': 'Zimefungwa salama',
  'dash.tabs.all': 'Zote',
  'dash.tabs.new': 'Mpya',
  'dash.tabs.mine': 'Kesi zangu',
  'dash.tabs.assigned': 'Zimekabidhiwa',
  'dash.tabs.in-progress': 'Zinaendelea',
  'dash.tabs.escalated': 'Zimepandishwa',
  'dash.tabs.referred': 'Zimerejelewa',
  'dash.tabs.closed': 'Zimefungwa',
  'dash.empty':
    'Hakuna kesi kwenye foleni hii sasa hivi. Toa ishara kutoka kwenye {link} na itaonekana hapa mara moja.',
  'dash.emptyLink': 'onyesho la USSD',
  'dash.privacyNote':
    'Kesi hazina majina, namba za simu wala maeneo kamili. Taarifa za kumtambua mtu haziwi kwenye jukwaa — kamwe.',
  'dash.viewTrends': 'Tazama mienendo ya jumla',
  'dash.unassigned': 'Haijakabidhiwa',

  // Case detail
  'case.back': 'Rudi kwenye foleni',
  'case.opened': 'Imefunguliwa {date} saa {time}',
  'case.updated': 'sasisho la mwisho {ago}',
  'case.escalatedTitle': 'Imepandishwa kwa dawati la ulinzi.',
  'case.escalatedBody':
    'Afisa wa ulinzi amejulishwa na anaongoza hatua zozote za nje. Hatua zote zinaandikwa kwenye kumbukumbu salama.',
  'case.noConsentTitle': 'Ombi la taarifa tu.',
  'case.noConsentBody':
    'Mtumiaji amekataa kuwasiliwa. Usijaribu kuwasiliana naye — shiriki taarifa tu kama atarudi.',
  'case.summary': 'Muhtasari wa ishara',
  'case.riskLevel': 'Kiwango cha hatari',
  'case.reportedBy': 'Imetolewa na',
  'case.reportedSelf': 'Mtu aliye hatarini',
  'case.reportedOther': 'Mtu mwenye wasiwasi',
  'case.location': 'Mahali',
  'case.locationCounty': 'Kaunti ya {county} (kiwango cha kaunti pekee)',
  'case.locationNotShared': 'Haijashirikiwa (kaunti pekee, kamwe si mahali kamili)',
  'case.consent': 'Ridhaa ya kuwasiliwa',
  'case.consentYes': 'Ndiyo — mawasiliano ya siri yamekubaliwa',
  'case.consentNo': 'Hapana — taarifa tu',
  'case.channel': 'Njia inayopendekezwa',
  'case.assignedTo': 'Mfanyakazi aliyekabidhiwa',
  'case.unassigned': 'Haijakabidhiwa',
  'case.referredTo': 'Imerejelewa:',
  'case.latestNote': 'Maelezo ya mwisho ya mfanyakazi',
  'case.timeline': 'Mtiririko wa kesi',
  'case.actions': 'Hatua za mfanyakazi',
  'case.suggested':
    'Inapendekezwa: {name} — amethibitishwa, anashughulikia {county}, ana mzigo mdogo wa kesi.',
  'case.assignPlaceholder': 'Kabidhi kwa mfanyakazi…',
  'case.assign': 'Kabidhi',
  'case.take': 'Chukua kesi',
  'case.accept': 'Kubali kesi',
  'case.notePlaceholder': 'Ongeza maelezo ya ulinzi (bila taarifa za kumtambua)…',
  'case.noteLabel': 'Maelezo ya kesi',
  'case.addNote': 'Ongeza maelezo',
  'case.escalate': 'Pandisha kwa ulinzi',
  'case.escalateTitle': 'Kupandisha {ref}?',
  'case.escalateBody':
    'Kupandisha humjulishe afisa wa ulinzi na kuhamisha kesi hii kwenye njia ya kipaumbele. Tumia madhara yanapoweza kuwa karibu au yanapohusu mlinzi. Hatua hii inaandikwa kwenye kumbukumbu.',
  'case.cancel': 'Ghairi',
  'case.unreachable': 'Wekewa alama haikupatikana',
  'case.outcomePlaceholder':
    'Muhtasari wa matokeo kwa kufunga (mf. hatari imeshughulikiwa, rejeleo limekamilika)…',
  'case.outcomeLabel': 'Matokeo ya kufunga',
  'case.close': 'Funga kesi',
  'case.defaultOutcome': 'njia ya rejeleo imekamilika',
  'case.engine': 'Injini ya marejeleo',
  'case.bestMatch': 'Chaguo bora',
  'case.referHere': 'Rejelea hapa',
  'case.engineNote':
    'Imepangwa kwa eneo la kaunti, uwezo, ufikivu na saa. Binadamu hufanya uamuzi wa mwisho wa rejeleo.',
  'case.noMatch':
    'Hakuna huduma iliyothibitishwa inayolingana na aina hii ya hatari kwa sasa. Msimamizi hujulishwa kuongeza huduma.',
  'case.outsideCounty': 'Nje ya {county}',
  'case.closedNote':
    'Kesi hii imefungwa. Historia yake kamili inabaki kwenye kumbukumbu salama.',
  'case.archivedNote':
    'Kesi hii imewekwa kama haikupatikana. Historia yake kamili inabaki kwenye kumbukumbu salama.',
  'case.notFound': 'Kesi hii haipo — data ya onyesho huenda imerudishwa.',
  'case.backToDash': 'Rudi kwenye dashibodi',

  // Engine reasons
  'engine.county': 'Inashughulikia Kaunti ya {county}',
  'engine.capacity': 'Ina uwezo wa haraka',
  'engine.limited': 'Uwezo mdogo — inaweza kusubiri',
  'engine.access': 'Msaada wa ufikivu upo',
  'engine.hours': 'Wazi saa 24',

  // Case toasts
  'toast.assigned': 'Kesi imekabidhiwa',
  'toast.assignedYou': 'Kesi imekabidhiwa kwako',
  'toast.accepted': 'Kesi imekubaliwa — fanya mawasiliano salama',
  'toast.escalated': 'Kesi imepandishwa kwa dawati la ulinzi',
  'toast.unreachable': 'Imewekewa alama haikupatikana',
  'toast.note': 'Maelezo yameongezwa kwenye kesi',
  'toast.closed': 'Kesi imefungwa',
  'toast.referred': 'Imerejelewa kwa {name}',

  // Referrals page
  'refs.kicker': 'Mtandao wa marejeleo',
  'refs.title': 'Huduma zilizothibitishwa, tayari kumpokea',
  'refs.lede':
    'Rejeleo ni salama kadiri ya mahali linalokwenda. Kila shirika hapa hupitiwa na timu ya ulinzi ya Kinga kabla halijapokea kesi yoyote.',
  'refs.statServices': 'huduma zilizothibitishwa',
  'refs.statOrgs': 'mashirika washirika',
  'refs.statCounties': 'kaunti zinazoshughulikiwa',
  'refs.searchPh': 'Tafuta huduma, mashirika, lugha…',
  'refs.searchLabel': 'Tafuta huduma',
  'refs.allCounties': 'Kaunti zote',
  'refs.allTypes': 'Aina zote za huduma',
  'refs.filterCounty': 'Chuja kwa kaunti',
  'refs.filterType': 'Chuja kwa aina ya huduma',
  'refs.empty':
    'Hakuna huduma inayolingana na vichujio hivi. Jaribu kupanua kaunti au aina.',
  'refs.handles': 'Hushughulikia:',
  'refs.verifiedOrg': 'Shirika lililothibitishwa',

  // Helplines
  'helplines.title': 'Simu za msaada za kitaifa — bure na siri',
  'helplines.lede':
    'Simu mashuhuri za msaada ambazo mtu yeyote anaweza kupiga moja kwa moja, hata bila Kinga. Bure, mchana na usiku.',
  'helplines.call': 'Piga {number}',
  'helplines.free247': 'Bure · saa 24 · kote nchini',
  'helplines.orgsTitle': 'Mashirika mashuhuri ya msaada',
  'helplines.orgsLede':
    'Mashirika yenye historia ndefu ya kusimama na wasichana na wanawake Kenya. Mfanyakazi wa Kinga anaweza kukuunganisha — au uyatafute kupitia orodha yoyote ya umma.',
  'helplines.viaResponder': 'Unganishwa kupitia mfanyakazi wa Kinga',

  // Analytics
  'analytics.kicker': 'Akili ya onyo la mapema',
  'analytics.title': 'Ona hatari ikikua kabla madhara hayajafuata',
  'analytics.lede':
    'Mifumo ya jumla ya kiwango cha jamii huwasaidia washirika kuweka huduma mahali zitakapohitajika — ishara {total} kwa miezi minane.',
  'analytics.privacyTitle': 'Imefichwa tangu mwanzo',
  'analytics.privacyBody':
    'Takwimu hizi ni za jumla hadi kiwango cha kaunti kwa kigezo cha n ≥ 5 — makundi yenye chini ya ishara tano hufichwa. Hakuna chati kwenye Kinga inayoweza kumtambua mtu binafsi.',
  'analytics.chart1Title': 'Ishara za hatari kwa aina',
  'analytics.chart1Desc': 'Ishara za kila mwezi, Machi – Oktoba',
  'analytics.chart2Title': 'Ishara kwa kaunti',
  'analytics.chart2Desc': 'Robo hii · kaunti chini ya n = 5 zimefichwa',
  'analytics.chart3Title': 'Muda hadi mawasiliano ya kwanza',
  'analytics.chart3Desc': 'Saa za wastani kutoka ishara hadi mawasiliano',
  'analytics.chart4Title': 'Matokeo ya marejeleo',
  'analytics.chart4Desc': 'Marejeleo yote kwa huduma zilizothibitishwa, mwaka huu',
  'analytics.insightsTitle': 'Mifumo inavyowaeleza washirika',
  'analytics.insight.1.title': 'Ishara za ndoa za utotoni zinaongezeka',
  'analytics.insight.1.body':
    'Imepanda kwa 79% tangu Machi, ikijikita Kisumu na Kajiado — vipindi vya likizo ya shule vinalingana na ongezeko kubwa. Washirika waweka wafanyakazi tayari kabla ya Desemba.',
  'analytics.insight.2.title': 'Mawasiliano ya kwanza yanakuwa ya haraka zaidi',
  'analytics.insight.2.body':
    'Muda wa wastani kutoka ishara hadi mawasiliano ya kwanza umeshuka kutoka saa 9.5 hadi 3.8 mtandao wa wafanyakazi ulipokua. Njia ya saa 24 ya GBV ndiyo inayochangia zaidi.',
  'analytics.insight.3.title': 'Ishara za msimu wa ukeketaji hupanda Juni',
  'analytics.insight.3.body':
    'Ongezeko la Juni hurudiaga kila mwaka. Muhtasari wa onyo la mapema sasa huzindua ukaguzi wa uwezo wa makazi salama wiki nne kabla ya msimu.',
  'analytics.demo':
    'Data ya onyesho ya kubuni — inaonyesha dashibodi ambazo washirika wangepanga nazo.',
  'analytics.hours': 'saa {value}',

  // Admin
  'admin.kicker': 'Usimamizi wa jukwaa',
  'admin.title': 'Uaminifu unasimamiwa hapa',
  'admin.lede':
    'Mashirika, wafanyakazi na huduma huingia kwenye mtandao wa marejeleo baada ya uthibitishaji tu — na kila hatua nyeti huingia kwenye kumbukumbu isiyobadilika.',
  'admin.stats.signals': 'Jumla ya ishara',
  'admin.stats.active': 'Kesi hai',
  'admin.stats.escalated': 'Zimepandishwa',
  'admin.stats.responders': 'Wafanyakazi hai',
  'admin.stats.orgs': 'Mashirika yaliyothibitishwa',
  'admin.safeguarding': 'Kesi {count} kwenye njia ya ulinzi',
  'admin.safeguardingBody': '{refs} — uratibu wa afisa wa ulinzi unaendelea.',
  'admin.tab.organisations': 'mashirika',
  'admin.tab.responders': 'wafanyakazi',
  'admin.tab.services': 'huduma',
  'admin.tab.audit': 'Kumbukumbu',
  'admin.partnerSince': 'shiriki tangu {date}',
  'admin.verifyActivate': 'Thibitisha na washa',
  'admin.suspend': 'Simamisha',
  'admin.verified': 'Amethibitishwa',
  'admin.awaiting': 'Anasubiri uthibitishaji',
  'admin.training': 'Mafunzo:',
  'admin.openCases': 'kesi wazi {count}',
  'admin.languages': 'Lugha:',
  'admin.capacityLabel': 'Uwezo wa {name}',
  'admin.capacity': 'Uwezo',
  'admin.active': 'Hai',
  'admin.toggleResponder': 'Badilisha uthibitishaji wa {name}',
  'admin.toggleService': 'Washa au zima {name}',
  'admin.auditTitle': 'Kumbukumbu salama',
  'admin.auditNote':
    'Kumbukumbu ni za kuongezwa tu na hazionekani kwa wasimamizi wa kawaida — kama ilivyobuniwa kwa uzalishaji ambapo kumbukumbu ni za kuandika-mara-moja na zinadhibitiwa.',

  // Admin toasts
  'toast.orgVerified': '{name} imethibitishwa na kuwashwa',
  'toast.orgSuspended': '{name} imesimamishwa',
  'toast.orgSuspendedBody': 'Huduma zake zinaacha kupokea marejeleo mara moja.',
  'toast.rspVerified': '{name} amethibitishwa',
  'toast.rspRevoked': 'Uthibitishaji wa {name} umeondolewa',
  'toast.svcOn': '{name} imewashwa',
  'toast.svcOff': '{name} imezimwa',
  'toast.svcCapacity': '{name}: uwezo sasa {value}',

  // 404
  'notfound.title': 'Njia hii haijaongoza popote',
  'notfound.body': 'Ukurasa uliouliza haupo — lakini msaada upo umbali wa simu moja.',
  'notfound.home': 'Rudi mwanzoni',
  'notfound.demo': 'Jaribu onyesho la USSD',

  // Domain vocabulary
  'cat.child-marriage': 'Ndoa ya utotoni',
  'cat.fgm': 'Ukeketaji',
  'cat.gbv': 'Ukatili wa kijinsia',
  'cat.threats': 'Vitisho au unyanyasaji',
  'cat.school-dropout': 'Kulazimishwa kuacha shule',
  'cat.other': 'Wasiwasi mwingine wa ulinzi',
  'level.info': 'Taarifa',
  'level.emerging': 'Hatari inayokua',
  'level.urgent': 'Dharura',
  'leveldesc.info': 'Anatafuta taarifa, hakuna hatari ya haraka iliyoonyeshwa',
  'leveldesc.emerging': 'Madhara yanaweza kutokea bila msaada wa mapema',
  'leveldesc.urgent': 'Msaada unahitajika sasa — kipaumbele kinahitajika',
  'status.new': 'Mpya',
  'status.assigned': 'Imekabidhiwa',
  'status.in-progress': 'Inaendelea',
  'status.escalated': 'Imepandishwa',
  'status.referred': 'Imerejelewa',
  'status.closed': 'Imefungwa',
  'status.unreachable': 'Haikupatikana',
  'orgtype.child-protection': 'Ulinzi wa mtoto',
  'orgtype.health': 'Kituo cha afya',
  'orgtype.legal-aid': 'Msaada wa kisheria',
  'orgtype.gbv-support': 'Msaada wa ukatili wa kijinsia',
  'orgtype.shelter': 'Makazi salama',
  'orgtype.counselling': 'Ushauri nasaha',
  'capacity.available': 'Inapatikana',
  'capacity.limited': 'Mdogo',
  'capacity.full': 'Imejaa',
  'orgstatus.active': 'hai',
  'orgstatus.pending': 'inasubiri',
  'orgstatus.suspended': 'imesimamishwa',

  // Time
  'time.justNow': 'sasa hivi',
  'time.min': 'dakika {n} zilizopita',
  'time.hour': 'saa {n} zilizopita',
  'time.day1': 'siku 1 iliyopita',
  'time.days': 'siku {n} zilizopita',

  // Nav additions
  'nav.community': 'Jumuiya',
  'nav.safety': 'Kaa salama',
  'nav.skip': 'Ruka hadi maudhui makuu',

  // Help & support tool
  'help.open': 'Fungua msaada na usaidizi',
  'help.button': 'Msaada',
  'help.title': 'Msaada upo hapa',
  'help.lede': 'Msaada wa bure na siri — mchana na usiku.',
  'help.helplines': 'Simu za bure za kitaifa',
  'help.call': 'Piga {number}',
  'help.community': 'Ongea na jumuiya',
  'help.communityBody': 'Shiriki na kusikiliza katika duara salama la siri.',
  'help.safety': 'Panga usalama wako',
  'help.safetyBody': 'Hatua za vitendo za kuzuia madhara kabla hayajatokea.',
  'help.ussd': 'Pata msaada kwa simu',
  'help.ussdBody': 'Piga {code} bure kwa simu yoyote — hauhitaji simu mahiri.',
  'help.quickExit': 'Toka haraka',
  'help.quickExitNote': 'Huacha tovuti hii mara moja na kufungua ukurasa wa kawaida.',
  'help.close': 'Funga',

  // Community circle
  'community.kicker': 'Duara la jumuiya',
  'community.title': 'Huko peke yako',
  'community.lede':
    'Nafasi ya siri ambapo waliopitia ukatili na wasichana wanaokabili hatari wanaweza kushiriki, kusikiliana na kujikaza.',
  'community.safetyTitle': 'Hii ni nafasi ya umma',
  'community.safetyBody':
    'Usiwahi kushiriki jina lako la kweli, shule, kijiji, namba ya simu au picha. Kila mtu hapa anaonekana kwa jina la kubuni. Katika uzalishaji, duara hili huongozwa na wataalamu.',
  'community.guidelinesTitle': 'Maelewano ya duara',
  'community.rule1': 'Shiriki uzoefu na moyo — kamwe si maelezo yanayomtambua mtu.',
  'community.rule2': 'Hakuna anwani, hakuna maombi ya kukutana, hakuna picha.',
  'community.rule3': 'Mtu akiwa hatarini sasa, mwongoze 1195 au 112 — si ujumbe wa faragha.',
  'community.composer': 'Shiriki kitu na duara…',
  'community.post': 'Tuma kwa duara',
  'community.posting': 'Inatuma…',
  'community.loginTitle': 'Jiunge na mazungumzo',
  'community.loginBody':
    'Tengeneza ufunguo wa bure ili kutuma. Ufunguo wako ni utambulisho wa kubahatisha — hauunganishwi na jina lako, na duara hukupa hadhi ya mwanachama tu.',
  'community.empty': 'Bado hakuna machapisho. Kuwa wa kwanza kuitia moyo jumuiya.',
  'community.member': 'Mwanachama',
  'community.phoneWarning':
    'Inaonekana umeandika namba ya simu au tarakimu nyingi. Kwa usalama wako, usishiriki anwani hapa.',
  'community.error': 'Imeshindwa kutuma sasa hivi. Tafadhali jaribu tena.',
  'community.replies': 'majibu {count}',
  'community.reply': 'Jibu',
  'community.replyPlaceholder': 'Andika jibu la moyo…',
  'community.send': 'Tuma',
  'community.loading': 'Inapakia duara…',

  // Safety & precautions
  'safety.kicker': 'Kuzuia',
  'safety.title': 'Ongoza usalama wako kabla madhara hayajatokea',
  'safety.lede':
    'Hatua za vitendo na siri — zimeundwa kwa simu za pamoja na hali nyeti.',
  'safety.signs.title': 'Jua dalili za hatari',
  'safety.signs.lede': 'Madhara mara chache hufika bila ishara. Mifumo hii inastahili makini:',
  'safety.sign.1': 'Maneno ya kuacha shule, au mabadiliko ya ghafla nyumbani',
  'safety.sign.2': 'Kutajwa kwa wageni, sherehe au “zawadi” ambazo hukuulizia',
  'safety.sign.3': 'Kuchungwa, kufuatiliwa, au simu yako kukaguliwa',
  'safety.sign.4': 'Vitisho unapokataa, au shinikizo la kuweka siri',
  'safety.sign.5': 'Rafiki amejikwambia ghafla, ana wasiwasi, au anakosa shule',
  'safety.plan.title': 'Jenga mpango wako wa usalama',
  'safety.plan.lede': 'Weka alama ulichonacho. Maendeleo yako huhifadhiwa kwenye kifaa hiki tu.',
  'safety.plan.1': 'Mahali salama pa kwenda (ndugu, jirani, chifu, kanisa/msikiti)',
  'safety.plan.2': 'Mtu mmoja ninayemwamini anayejua hali yangu',
  'safety.plan.3': 'Neno la siri nililokubaliana na mtu ninayemwamini',
  'safety.plan.4': 'Namba kwa kichwa: 1195 (GBV) · 116 (watoto) · 112 (dharura)',
  'safety.plan.5': 'Simu imejaa chaji na salio kidogo limewekwa kando',
  'safety.plan.6': 'Nakala au picha za hati muhimu mahali salama',
  'safety.plan.7': 'Mkoba mdogo uliotayarishwa na vitu muhimu',
  'safety.plan.8': 'Namba yangu ya kumbukumbu ya Kinga imeandikwa mahali salama',
  'safety.plan.done': '{done} kati ya {total} tayari',
  'safety.digital.title': 'Usalama wa kidijitali',
  'safety.digital.1': 'Futa historia ya simu baada ya kupiga *384*21# ikiwa mtu hukagua simu yako',
  'safety.digital.2': 'Futa ujumbe nyeti baada ya kusoma majibu',
  'safety.digital.3': 'Funga simu yako kwa PIN unayojua wewe pekee',
  'safety.digital.4': 'Tumia Toka Haraka ndani ya kitufe cha msaada kuacha tovuti hii haraka',
  'safety.digital.5': 'Kopa simu ya mtu unayemwamini ikiwa yako inachungwa',
  'safety.now.title': 'Madhara yakiwa karibu — sasa hivi',
  'safety.now.1': 'Nenda mahali salama, au eneo la watu',
  'safety.now.2': 'Piga 112 (dharura) au 1195 (GBV) — bure, saa 24',
  'safety.now.3': 'Tuma neno lako la siri kwa mtu unayemwamini',
  'safety.now.4': 'Weka namba yako ya kumbukumbu ya Kinga — inakuunganisha tena bila jina lako',
  'safety.communityCta': 'Hulazimiki kupanga haya peke yako — duara linasikiliza.',
  'safety.communityBtn': 'Tembelea duara la jumuiya',
  'safety.helplineCta': 'Ungependa kuongea na mtu sasa hivi?',
};
