import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquareText, RotateCcw, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useKingaSession } from '@/hooks/useKingaSession';
import { useLanguage } from '@/lib/i18n/useLanguage';
import { cn } from '@/lib/utils';

/**
 * SMS fallback channel demo. Same bilingual Kinga menu tree as USSD, rendered
 * as a text conversation — the experience for users who prefer or only have SMS.
 */
export function SmsSimulator() {
  const { transcript, reply, send, reset, start, started } = useKingaSession('sms');
  const { t } = useLanguage();
  const [buffer, setBuffer] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [transcript]);

  const handleSend = (value?: string) => {
    const input = (value ?? buffer).trim();
    if (!input) return;
    setBuffer('');
    if (!started) {
      // First inbound SMS (e.g. "KINGA HELP") wakes the service with the menu.
      start(input);
      return;
    }
    send(input);
  };

  const handleReset = () => {
    reset();
    setBuffer('');
  };

  const [emptyBefore, emptyAfter] = t('sms.emptyA', { keyword: '' }).split('  ');

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border bg-primary px-4 py-3 text-primary-foreground">
          <span className="flex size-9 items-center justify-center rounded-full bg-white/15">
            <MessageSquareText className="size-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">{t('sms.headerTitle')}</p>
            <p className="text-xs opacity-80">{t('sms.headerSub')}</p>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          aria-live="polite"
          aria-label="SMS conversation"
          className="h-96 space-y-2.5 overflow-y-auto bg-secondary/40 p-4"
        >
          {!started ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
              <p>
                {emptyBefore}{' '}
                <span className="rounded bg-secondary px-1.5 py-0.5 font-mono font-semibold">
                  KINGA HELP
                </span>{' '}
                {emptyAfter}
              </p>
              <p className="text-xs">{t('sms.emptyB')}</p>
            </div>
          ) : (
            transcript.map((entry) => (
              <div
                key={entry.id}
                className={cn(
                  'w-fit max-w-[85%] whitespace-pre-line px-3.5 py-2',
                  entry.from === 'user'
                    ? 'ml-auto rounded-2xl rounded-br-sm bg-primary text-sm text-primary-foreground'
                    : 'mr-auto rounded-2xl rounded-bl-sm border border-border bg-card font-mono text-xs leading-relaxed text-card-foreground',
                )}
              >
                {entry.text}
              </div>
            ))
          )}
        </div>

        {/* Quick replies */}
        {started && reply.options.length > 0 && (
          <div className="flex flex-wrap gap-1.5 border-t border-border bg-card px-3 pt-2.5">
            {reply.options.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => handleSend(opt.key)}
                className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 font-mono text-[11px] font-medium text-primary transition-colors hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {opt.key}. {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Composer */}
        <form
          className="flex items-center gap-2 border-t border-border bg-card p-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <Input
            value={buffer}
            onChange={(e) => setBuffer(e.target.value)}
            placeholder={started ? t('sms.placeholderReply') : t('sms.placeholderStart')}
            aria-label={t('sms.send')}
            className="h-10 flex-1 rounded-full"
          />
          <Button
            type="submit"
            size="icon"
            className="size-10 rounded-full"
            aria-label={t('sms.send')}
            disabled={!buffer.trim()}
          >
            <Send className="size-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="size-10 rounded-full"
            aria-label={t('sms.startOver')}
            onClick={handleReset}
          >
            <RotateCcw className="size-4" />
          </Button>
        </form>
      </div>

      {reply.end && reply.reference && (
        <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-sm font-semibold text-foreground">
            {t('ussd.bannerTitle', { ref: '' }).split('  ')[0]}{' '}
            <span className="font-mono text-primary">{reply.reference}</span>
          </p>
          <Button asChild size="sm" className="mt-3 rounded-full">
            <Link to="/dashboard">
              {t('ussd.bannerCta')}
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      )}

      <p className="mt-3 text-center text-xs text-muted-foreground">{t('sms.note')}</p>
    </div>
  );
}
