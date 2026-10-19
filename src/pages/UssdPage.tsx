import { useSeoMeta } from '@unhead/react';
import { ArrowDown, EyeOff, Lock, MapPinOff, Server, Smartphone, UserCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UssdSimulator } from '@/components/kinga/UssdSimulator';
import { SmsSimulator } from '@/components/kinga/SmsSimulator';
import { useLanguage } from '@/lib/i18n/useLanguage';

export default function UssdPage() {
  const { t } = useLanguage();

  useSeoMeta({
    title: 'Kinga — USSD & SMS demo',
    description:
      'Walk the exact Kinga USSD flow on a virtual phone. Signals you create appear live in the responder dashboard.',
  });

  const JOURNEY = [
    { icon: Smartphone, title: t('ussd.journey.1.title'), body: t('ussd.journey.1.body') },
    { icon: ArrowDown, title: t('ussd.journey.2.title'), body: t('ussd.journey.2.body') },
    { icon: Server, title: t('ussd.journey.3.title'), body: t('ussd.journey.3.body') },
    { icon: UserCheck, title: t('ussd.journey.4.title'), body: t('ussd.journey.4.body') },
  ];

  const PRIVACY_POINTS = [
    { icon: EyeOff, text: t('ussd.privacy.1') },
    { icon: MapPinOff, text: t('ussd.privacy.2') },
    { icon: Lock, text: t('ussd.privacy.3') },
  ];

  return (
    <div className="container py-10 sm:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {t('ussd.kicker')}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {t('ussd.title')}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t('ussd.lede')}</p>
      </div>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Simulators */}
        <div>
          <Tabs defaultValue="ussd">
            <TabsList className="mx-auto grid w-full max-w-sm grid-cols-2">
              <TabsTrigger value="ussd">{t('ussd.tabUssd')}</TabsTrigger>
              <TabsTrigger value="sms">{t('ussd.tabSms')}</TabsTrigger>
            </TabsList>
            <TabsContent value="ussd" className="mt-6">
              <UssdSimulator />
            </TabsContent>
            <TabsContent value="sms" className="mt-6">
              <SmsSimulator />
            </TabsContent>
          </Tabs>
        </div>

        {/* Explainers */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-xl">{t('ussd.journey.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="relative space-y-5 border-l-2 border-dashed border-primary/30 pl-6">
                {JOURNEY.map((item, i) => (
                  <li key={item.title} className="relative">
                    <span className="absolute -left-[31px] flex size-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <item.icon className="size-4 text-primary" aria-hidden />
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="font-display text-xl">{t('ussd.privacy.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {PRIVACY_POINTS.map((point) => (
                  <li key={point.text} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <point.icon className="size-3.5 text-primary" aria-hidden />
                    </span>
                    <span className="text-foreground">{point.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardContent className="py-5 text-sm leading-relaxed text-muted-foreground">
              <p>{t('ussd.production')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
