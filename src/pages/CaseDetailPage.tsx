import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSeoMeta } from '@unhead/react';
import {
  ArrowLeft,
  Ban,
  CheckCircle2,
  CircleDot,
  Clock,
  Handshake,
  History,
  MapPin,
  PhoneForwarded,
  ShieldAlert,
  Sparkles,
  StickyNote,
  UserCheck,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { CategoryBadge, ChannelBadge, RiskLevelBadge, StatusBadge } from '@/components/kinga/badges';
import {
  acceptCase,
  addCaseNote,
  assignCase,
  closeCase,
  escalateCase,
  markUnreachable,
  referCase,
  useKinga,
} from '@/lib/kinga/store';
import { matchServices, suggestResponder } from '@/lib/kinga/engine';
import { dateLabel, timeAgo, timeOfDay } from '@/lib/kinga/format';
import { ACTING_RESPONDER_ID, ACTING_RESPONDER_NAME } from '@/lib/kinga/actingUser';
import { useLanguage } from '@/lib/i18n/useLanguage';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';

export default function CaseDetailPage() {
  const { caseId } = useParams<{ caseId: string }>();
  const state = useKinga();
  const { toast } = useToast();
  const { t, lang } = useLanguage();
  const [assignee, setAssignee] = useState('');
  const [note, setNote] = useState('');
  const [outcome, setOutcome] = useState('');

  const kase = state.cases.find((c) => c.id === caseId);

  useSeoMeta({
    title: kase ? `Kinga — Case ${kase.reference}` : 'Kinga — Case not found',
    description: 'Case detail and safeguarding actions.',
  });

  const matches = useMemo(() => (kase ? matchServices(state, kase) : []), [state, kase]);
  const suggestions = useMemo(() => (kase ? suggestResponder(state, kase) : []), [state, kase]);

  if (!kase) {
    return (
      <div className="container py-20">
        <Card className="mx-auto max-w-md border-dashed">
          <CardContent className="px-8 py-12 text-center">
            <p className="text-muted-foreground">{t('case.notFound')}</p>
            <Button asChild className="mt-6 rounded-full">
              <Link to="/dashboard">{t('case.backToDash')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const responder = state.responders.find((r) => r.id === kase.assignedResponderId);
  const referralService = state.services.find((s) => s.id === kase.referralServiceId);
  const referralOrg = referralService
    ? state.organisations.find((o) => o.id === referralService.organisationId)
    : undefined;
  const isClosed = kase.status === 'closed' || kase.status === 'unreachable';

  const act = (fn: () => void, message: string) => {
    fn();
    toast({ title: message, description: `${kase.reference} · ${dateLabel(Date.now(), lang)}` });
  };

  return (
    <div className="container py-10">
      <Button asChild variant="ghost" size="sm" className="-ml-2 rounded-full">
        <Link to="/dashboard">
          <ArrowLeft className="size-4" />
          {t('case.back')}
        </Link>
      </Button>

      {/* Header */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="font-mono text-3xl font-bold tracking-tight">{kase.reference}</h1>
        <RiskLevelBadge level={kase.riskLevel} />
        <CategoryBadge category={kase.riskCategory} />
        <StatusBadge status={kase.status} />
        <ChannelBadge channel={kase.channel} />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {t('case.opened', { date: dateLabel(kase.createdAt, lang), time: timeOfDay(kase.createdAt) })}{' '}
        · {t('case.updated', { ago: timeAgo(kase.updatedAt, lang) })}
      </p>

      {/* Safeguarding banner */}
      {kase.status === 'escalated' && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
        >
          <ShieldAlert className="mt-0.5 size-5 shrink-0" aria-hidden />
          <p>
            <strong>{t('case.escalatedTitle')}</strong> {t('case.escalatedBody')}
          </p>
        </div>
      )}
      {!kase.consentToRefer && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
          <Ban className="mt-0.5 size-5 shrink-0" aria-hidden />
          <p>
            <strong>{t('case.noConsentTitle')}</strong> {t('case.noConsentBody')}
          </p>
        </div>
      )}

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        {/* ------------------------------------------------ main column */}
        <div className="space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">{t('case.summary')}</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t('case.riskLevel')}
                  </dt>
                  <dd className="mt-1 text-sm font-medium">
                    {t(`level.${kase.riskLevel}`)}
                    <span className="block text-xs font-normal text-muted-foreground">
                      {t(`leveldesc.${kase.riskLevel}`)}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t('case.reportedBy')}
                  </dt>
                  <dd className="mt-1 text-sm font-medium">
                    {kase.reporter === 'self' ? t('case.reportedSelf') : t('case.reportedOther')}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t('case.location')}
                  </dt>
                  <dd className="mt-1 flex items-center gap-1.5 text-sm font-medium">
                    <MapPin className="size-3.5 text-muted-foreground" aria-hidden />
                    {kase.county === 'Not shared'
                      ? t('case.locationNotShared')
                      : t('case.locationCounty', { county: kase.county })}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t('case.consent')}
                  </dt>
                  <dd className="mt-1 text-sm font-medium">
                    {kase.consentToRefer ? t('case.consentYes') : t('case.consentNo')}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t('case.channel')}
                  </dt>
                  <dd className="mt-1 text-sm font-medium uppercase">{kase.preferredContact}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t('case.assignedTo')}
                  </dt>
                  <dd className="mt-1 text-sm font-medium">
                    {responder ? `${responder.name} · ${responder.role}` : t('case.unassigned')}
                  </dd>
                </div>
              </dl>

              {referralService && (
                <div className="mt-5 flex items-start gap-3 rounded-xl bg-teal-50 p-4 text-sm dark:bg-teal-950/30">
                  <Handshake className="mt-0.5 size-5 shrink-0 text-teal-700 dark:text-teal-300" aria-hidden />
                  <p className="text-teal-900 dark:text-teal-200">
                    <strong>{t('case.referredTo')}</strong> {referralService.name}
                    {referralOrg ? ` — ${referralOrg.name}` : ''} · {referralService.hours}
                  </p>
                </div>
              )}

              {kase.note && (
                <div className="mt-5 rounded-xl border border-border bg-secondary/50 p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <StickyNote className="size-3.5" aria-hidden />
                    {t('case.latestNote')}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">{kase.note}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-lg">
                <History className="size-4 text-primary" aria-hidden />
                {t('case.timeline')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="relative space-y-4 border-l border-border pl-5">
                {[...kase.events].reverse().map((event, i) => (
                  <li key={`${event.at}-${i}`} className="relative">
                    <span
                      className={cn(
                        'absolute -left-[26px] top-1 size-2.5 rounded-full border-2 border-card',
                        i === 0 ? 'bg-primary' : 'bg-muted-foreground/40',
                      )}
                      aria-hidden
                    />
                    <p className="text-sm leading-relaxed">{event.action}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {event.actor} · {dateLabel(event.at, lang)} {timeOfDay(event.at)} ·{' '}
                      {timeAgo(event.at, lang)}
                    </p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* ------------------------------------------------ actions column */}
        <div className="space-y-6">
          {/* Workflow actions */}
          {!isClosed && (
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">{t('case.actions')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {kase.status === 'new' && (
                  <div className="space-y-3">
                    {suggestions[0] && (
                      <p className="flex items-start gap-2 rounded-lg bg-primary/5 p-3 text-xs leading-relaxed text-foreground">
                        <Sparkles className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden />
                        <span>
                          {t('case.suggested', { name: suggestions[0].name, county: kase.county })}
                        </span>
                      </p>
                    )}
                    <Select value={assignee} onValueChange={setAssignee}>
                      <SelectTrigger aria-label={t('case.assignPlaceholder')}>
                        <SelectValue placeholder={t('case.assignPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {suggestions.map((r) => (
                          <SelectItem key={r.id} value={r.id}>
                            {r.name} — {r.role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        disabled={!assignee}
                        onClick={() =>
                          act(() => assignCase(kase.id, assignee), t('toast.assigned'))
                        }
                      >
                        <UserCheck className="size-4" />
                        {t('case.assign')}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          act(
                            () => assignCase(kase.id, ACTING_RESPONDER_ID, ACTING_RESPONDER_NAME),
                            t('toast.assignedYou'),
                          )
                        }
                      >
                        {t('case.take')}
                      </Button>
                    </div>
                  </div>
                )}

                {kase.status === 'assigned' && (
                  <Button
                    className="w-full"
                    onClick={() =>
                      act(
                        () => acceptCase(kase.id, responder?.name ?? ACTING_RESPONDER_NAME),
                        t('toast.accepted'),
                      )
                    }
                  >
                    <CheckCircle2 className="size-4" />
                    {t('case.accept')}
                  </Button>
                )}

                {['in-progress', 'escalated', 'referred'].includes(kase.status) && (
                  <div className="space-y-3">
                    <Textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder={t('case.notePlaceholder')}
                      rows={3}
                      aria-label={t('case.noteLabel')}
                    />
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={!note.trim()}
                      onClick={() => {
                        act(
                          () => addCaseNote(kase.id, ACTING_RESPONDER_NAME, note),
                          t('toast.note'),
                        );
                        setNote('');
                      }}
                    >
                      <StickyNote className="size-4" />
                      {t('case.addNote')}
                    </Button>
                  </div>
                )}

                {['assigned', 'in-progress'].includes(kase.status) && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/40">
                        <ShieldAlert className="size-4" />
                        {t('case.escalate')}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('case.escalateTitle', { ref: kase.reference })}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t('case.escalateBody')}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t('case.cancel')}</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            act(() => escalateCase(kase.id, ACTING_RESPONDER_NAME), t('toast.escalated'))
                          }
                        >
                          {t('case.escalate')}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}

                {['in-progress', 'escalated'].includes(kase.status) && (
                  <Button
                    variant="ghost"
                    className="w-full text-muted-foreground"
                    onClick={() =>
                      act(() => markUnreachable(kase.id, ACTING_RESPONDER_NAME), t('toast.unreachable'))
                    }
                  >
                    <PhoneForwarded className="size-4" />
                    {t('case.unreachable')}
                  </Button>
                )}

                {/* Close */}
                {kase.status !== 'new' && (
                  <div className="space-y-3 border-t border-border pt-4">
                    <Textarea
                      value={outcome}
                      onChange={(e) => setOutcome(e.target.value)}
                      placeholder={t('case.outcomePlaceholder')}
                      rows={2}
                      aria-label={t('case.outcomeLabel')}
                    />
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => {
                        act(
                          () =>
                            closeCase(
                              kase.id,
                              ACTING_RESPONDER_NAME,
                              outcome || t('case.defaultOutcome'),
                            ),
                          t('toast.closed'),
                        );
                        setOutcome('');
                      }}
                    >
                      <XCircle className="size-4" />
                      {t('case.close')}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Referral engine */}
          {!isClosed && kase.consentToRefer && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-lg">
                  <CircleDot className="size-4 text-primary" aria-hidden />
                  {t('case.engine')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {matches.length === 0 && (
                  <p className="text-sm text-muted-foreground">{t('case.noMatch')}</p>
                )}
                {matches.slice(0, 4).map((match, i) => (
                  <div
                    key={match.service.id}
                    className={cn(
                      'rounded-xl border p-3.5',
                      i === 0 ? 'border-primary/40 bg-primary/5' : 'border-border',
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold leading-snug">{match.service.name}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {match.organisationName} · {match.service.hours}
                        </p>
                      </div>
                      {i === 0 && (
                        <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                          {t('case.bestMatch')}
                        </span>
                      )}
                    </div>
                    <ul className="mt-2 flex flex-wrap gap-1">
                      {match.reasons.map((reason) => (
                        <li
                          key={reason}
                          className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground"
                        >
                          {t(`engine.${reason}`, { county: kase.county })}
                        </li>
                      ))}
                      {!match.inCounty && (
                        <li className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-900 dark:bg-amber-950/60 dark:text-amber-300">
                          {t('case.outsideCounty', { county: kase.county })}
                        </li>
                      )}
                    </ul>
                    <Button
                      size="sm"
                      variant={i === 0 ? 'default' : 'outline'}
                      className="mt-3 w-full rounded-full"
                      onClick={() =>
                        act(
                          () => referCase(kase.id, match.service.id, ACTING_RESPONDER_NAME),
                          t('toast.referred', { name: match.service.name }),
                        )
                      }
                    >
                      <Handshake className="size-3.5" />
                      {t('case.referHere')}
                    </Button>
                  </div>
                ))}
                <p className="text-xs leading-relaxed text-muted-foreground">{t('case.engineNote')}</p>
              </CardContent>
            </Card>
          )}

          {/* Closed summary */}
          {isClosed && (
            <Card>
              <CardContent className="flex items-start gap-3 p-5">
                <Clock className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {kase.status === 'closed' ? t('case.closedNote') : t('case.archivedNote')}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
