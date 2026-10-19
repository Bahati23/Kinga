import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Delete, PhoneCall, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useKingaSession } from '@/hooks/useKingaSession';
import { useLanguage } from '@/lib/i18n/useLanguage';
import { cn } from '@/lib/utils';

const USSD_CODE = '*384*21#';
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

/**
 * Interactive USSD simulator. Walks the real bilingual Kinga menu tree on a
 * virtual feature phone; completing the flow files an actual signal that
 * appears in the responder dashboard.
 */
export function UssdSimulator() {
  const { transcript, reply, send, reset, start } = useKingaSession('ussd');
  const { t } = useLanguage();
  const [buffer, setBuffer] = useState('');
  const [dialed, setDialed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Split translated sentences around a placeholder so it can be styled.
  const [dialBefore, dialAfter] = t('ussd.dialPrompt', { code: '' }).split('  ');
  const [bannerBefore, bannerAfter] = t('ussd.bannerTitle', { ref: '' }).split('  ');

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [transcript]);

  const handleSend = (value?: string) => {
    const input = value ?? buffer;
    if (!input.trim()) return;
    send(input);
    setBuffer('');
  };

  const handleDial = () => {
    setDialed(true);
    start();
  };

  const handleReset = () => {
    reset();
    setDialed(false);
    setBuffer('');
  };

  return (
    <div className="mx-auto w-full max-w-sm">
      {/* Phone frame */}
      <div className="rounded-[2.5rem] border border-border bg-slate-900 p-3 shadow-xl dark:bg-slate-950">
        <div className="rounded-[2rem] bg-[#f7f4ea] dark:bg-[#101a17]">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-3 font-mono text-[10px] text-slate-500 dark:text-slate-400">
            <span>{t('ussd.network')}</span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-1.5 w-3 rounded-sm bg-slate-400" aria-hidden />
              2G
            </span>
          </div>

          {/* Screen */}
          <div
            ref={scrollRef}
            aria-live="polite"
            aria-label="USSD session transcript"
            className="mx-3 mt-2 h-80 space-y-2 overflow-y-auto rounded-lg border border-slate-200 bg-white/80 p-3 font-mono text-xs leading-relaxed dark:border-slate-800 dark:bg-black/30"
          >
            {!dialed ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-slate-500 dark:text-slate-400">
                <PhoneCall className="size-6" aria-hidden />
                <p className="px-4">
                  {dialBefore}{' '}
                  <span className="font-bold text-foreground">{USSD_CODE}</span>{' '}
                  {dialAfter}
                </p>
              </div>
            ) : (
              transcript.map((entry) => (
                <div
                  key={entry.id}
                  className={cn(
                    'max-w-[88%] whitespace-pre-line rounded-lg px-3 py-2',
                    entry.from === 'network'
                      ? 'mr-auto bg-slate-100 text-slate-800 dark:bg-slate-800/70 dark:text-slate-100'
                      : 'ml-auto bg-primary text-right font-bold text-primary-foreground',
                  )}
                >
                  {entry.text}
                </div>
              ))
            )}
          </div>

          {/* Quick-reply options */}
          {dialed && reply.options.length > 0 && (
            <div className="flex flex-wrap gap-1.5 px-4 pt-3">
              {reply.options.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleSend(opt.key)}
                  className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 font-mono text-[11px] font-medium text-primary transition-colors hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-primary"
                >
                  {opt.key}. {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Input buffer */}
          <div className="mx-4 mt-3 flex items-center gap-2">
            <output
              aria-label={t('ussd.enterDigits')}
              className="flex h-9 flex-1 items-center rounded-md border border-slate-300 bg-white px-3 font-mono text-sm tracking-widest text-slate-800 dark:border-slate-700 dark:bg-black/40 dark:text-slate-100"
            >
              {!dialed ? USSD_CODE : buffer || <span className="text-slate-400">{t('ussd.enterDigits')}</span>}
            </output>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setBuffer((b) => b.slice(0, -1))}
              disabled={!dialed}
              aria-label={t('ussd.delete')}
              className="h-9"
            >
              <Delete className="size-4" />
            </Button>
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-1.5 p-4">
            {KEYS.map((key) => (
              <button
                key={key}
                type="button"
                disabled={!dialed}
                onClick={() => setBuffer((b) => (b + key).slice(0, 2))}
                aria-label={`Key ${key}`}
                className="flex h-10 items-center justify-center rounded-lg bg-slate-100 font-mono text-base font-semibold text-slate-700 transition-colors hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                {key}
              </button>
              ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2 px-4 pb-5">
            {!dialed ? (
              <Button onClick={handleDial} className="h-11 flex-1 rounded-xl text-sm">
                <PhoneCall className="size-4" />
                {t('ussd.dial', { code: USSD_CODE })}
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => handleSend()}
                  disabled={!buffer.trim()}
                  className="h-11 flex-1 rounded-xl text-sm"
                >
                  {t('ussd.send')}
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="h-11 rounded-xl text-sm"
                  aria-label={t('ussd.reset')}
                >
                  <RotateCcw className="size-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Completion banner */}
      {reply.end && reply.reference && (
        <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-sm font-semibold text-foreground">
            {bannerBefore}{' '}
            <span className="font-mono text-primary">{reply.reference}</span>{' '}
            {bannerAfter}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{t('ussd.bannerBody')}</p>
          <Button asChild size="sm" className="mt-3 rounded-full">
            <Link to="/dashboard">
              {t('ussd.bannerCta')}
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      )}

      <p className="mt-3 text-center text-xs text-muted-foreground">{t('ussd.transcriptNote')}</p>
    </div>
  );
}
