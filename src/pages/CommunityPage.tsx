import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSeoMeta } from '@unhead/react';
import { useQueryClient } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';
import {
  AlertTriangle,
  HeartHandshake,
  Loader2,
  MessageCircle,
  PhoneCall,
  ScrollText,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { LoginArea } from '@/components/auth/LoginArea';
import { PseudonymBadge } from '@/components/kinga/PseudonymBadge';
import { useCommunity, COMMUNITY_TAG } from '@/hooks/useCommunity';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useNostrPublish } from '@/hooks/useNostrPublish';
import { HELPLINES } from '@/lib/kinga/helplines';
import { timeAgo } from '@/lib/kinga/format';
import { useLanguage } from '@/lib/i18n/useLanguage';

/** Refuse contact-detail-shaped content before it ever leaves the device. */
function looksLikeContactInfo(text: string): boolean {
  return /(?:\+?\d[\d\s-]{6,}\d)/.test(text);
}

export default function CommunityPage() {
  const { t, lang } = useLanguage();
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const { data, isLoading } = useCommunity();
  const { mutate: publish, isPending } = useNostrPublish();

  const [draft, setDraft] = useState('');
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [openReplies, setOpenReplies] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  useSeoMeta({
    title: 'Kinga — Community circle',
    description:
      'A pseudonymous peer-support circle where survivors and girls facing risk can share, listen and encourage each other.',
  });

  const draftHasContact = looksLikeContactInfo(draft);

  const submit = (content: string, parentId?: string) => {
    if (!content.trim() || looksLikeContactInfo(content)) return;
    setError(null);
    publish(
      {
        kind: 1,
        content: content.trim(),
        tags: parentId
          ? [['t', COMMUNITY_TAG], ['e', parentId, '', 'reply']]
          : [['t', COMMUNITY_TAG]],
      },
      {
        onSuccess: () => {
          if (parentId) {
            setReplyDrafts((d) => ({ ...d, [parentId]: '' }));
          } else {
            setDraft('');
          }
          queryClient.invalidateQueries({ queryKey: ['community'] });
        },
        onError: () => setError(t('community.error')),
      },
    );
  };

  const renderPost = (post: NostrEvent, isReply = false) => {
    const replies = data?.replies.get(post.id) ?? [];
    const repliesOpen = openReplies[post.id] ?? false;
    const replyDraft = replyDrafts[post.id] ?? '';
    const replyHasContact = looksLikeContactInfo(replyDraft);

    return (
      <Card key={post.id} className={isReply ? 'border-l-2 border-l-primary/40' : ''}>
        <CardContent className="p-5">
          <div className="flex items-center justify-between gap-3">
            <PseudonymBadge
              pubkey={post.pubkey}
              time={timeAgo(post.created_at * 1000, lang)}
            />
          </div>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground">
            {post.content}
          </p>

          {!isReply && (
            <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-muted-foreground"
                onClick={() => setOpenReplies((o) => ({ ...o, [post.id]: !repliesOpen }))}
              >
                <MessageCircle className="size-4" />
                {replies.length > 0
                  ? t('community.replies', { count: replies.length })
                  : t('community.reply')}
              </Button>
            </div>
          )}

          {!isReply && repliesOpen && (
            <div className="mt-3 space-y-3 border-t border-border pt-4">
              {replies.map((reply) => (
                <div key={reply.id} className="rounded-xl bg-secondary/50 p-3.5">
                  <PseudonymBadge
                    pubkey={reply.pubkey}
                    time={timeAgo(reply.created_at * 1000, lang)}
                  />
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed">
                    {reply.content}
                  </p>
                </div>
              ))}

              {user ? (
                <form
                  className="flex items-start gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    submit(replyDraft, post.id);
                  }}
                >
                  <Textarea
                    value={replyDraft}
                    onChange={(e) => setReplyDrafts((d) => ({ ...d, [post.id]: e.target.value }))}
                    placeholder={t('community.replyPlaceholder')}
                    rows={2}
                    className="flex-1"
                    aria-label={t('community.reply')}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="mt-1 rounded-full"
                    disabled={isPending || !replyDraft.trim() || replyHasContact}
                    aria-label={t('community.send')}
                  >
                    <Send className="size-4" />
                  </Button>
                </form>
              ) : (
                <LoginArea className="max-w-48" />
              )}
              {replyHasContact && (
                <p className="flex items-start gap-2 text-xs font-medium text-red-600 dark:text-red-400">
                  <AlertTriangle className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                  {t('community.phoneWarning')}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container py-10 sm:py-14">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {t('community.kicker')}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {t('community.title')}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {t('community.lede')}
        </p>
      </div>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        {/* Main column */}
        <div className="space-y-5">
          {/* Composer */}
          <Card>
            <CardContent className="p-5">
              {user ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submit(draft);
                  }}
                >
                  <Textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={t('community.composer')}
                    rows={3}
                    aria-label={t('community.composer')}
                  />
                  {draftHasContact && (
                    <p className="mt-2 flex items-start gap-2 text-xs font-medium text-red-600 dark:text-red-400">
                      <AlertTriangle className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                      {t('community.phoneWarning')}
                    </p>
                  )}
                  {error && (
                    <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">
                      {error}
                    </p>
                  )}
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <PseudonymBadge pubkey={user.pubkey} />
                    <Button
                      type="submit"
                      className="rounded-full"
                      disabled={isPending || !draft.trim() || draftHasContact}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          {t('community.posting')}
                        </>
                      ) : (
                        <>
                          <Send className="size-4" />
                          {t('community.post')}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center">
                  <h2 className="font-display text-xl font-semibold">{t('community.loginTitle')}</h2>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {t('community.loginBody')}
                  </p>
                  <LoginArea className="mx-auto mt-4" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Feed */}
          {isLoading ? (
            <div className="space-y-4" aria-label={t('community.loading')}>
              {[0, 1, 2].map((i) => (
                <Card key={i}>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-9 rounded-full" />
                      <div className="space-y-1.5">
                        <Skeleton className="h-3.5 w-28" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Skeleton className="h-3.5 w-full" />
                      <Skeleton className="h-3.5 w-4/5" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : data && data.posts.length > 0 ? (
            <div className="space-y-4">{data.posts.map((post) => renderPost(post))}</div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="px-8 py-12 text-center">
                <HeartHandshake className="mx-auto size-8 text-muted-foreground/50" aria-hidden />
                <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
                  {t('community.empty')}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <Card className="border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40">
            <CardContent className="p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-amber-900 dark:text-amber-200">
                <AlertTriangle className="size-4 shrink-0" aria-hidden />
                {t('community.safetyTitle')}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-amber-800/90 dark:text-amber-200/80">
                {t('community.safetyBody')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 font-display text-base">
                <ScrollText className="size-4 text-primary" aria-hidden />
                {t('community.guidelinesTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                      {n}
                    </span>
                    {t(`community.rule${n}`)}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 font-display text-base">
                <PhoneCall className="size-4 text-primary" aria-hidden />
                {t('help.helplines')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {HELPLINES.map((line) => (
                  <li key={line.id} className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-medium">{line.name}</span>
                    {line.number && (
                      <a
                        href={`tel:${line.number}`}
                        className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 font-mono font-bold text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {line.shortCode}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Button asChild variant="outline" className="w-full rounded-full">
            <Link to="/safety">
              <ShieldCheck className="size-4" />
              {t('help.safety')}
            </Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
