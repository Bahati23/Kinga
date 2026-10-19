import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';

/**
 * Community circle — peer-support posts carried on Nostr (kind 1) under a
 * dedicated tag. Reading is public; posting requires a free Nostr key.
 * Posts are rendered pseudonymously (never with profile metadata), and the
 * composer refuses phone-number-shaped content.
 *
 * The feed merges two sources:
 *  1. Posts tagged with COMMUNITY_TAG — the canonical channel; everything
 *     published from the app lands here.
 *  2. Posts from a fixed set of seed-author keys (seeded demonstration
 *     content so the circle never feels empty). These keys exist solely to
 *     hold the seed conversations — no real user can post from them.
 */

export const COMMUNITY_TAG = 'kinga-circle';

/** Keys created exclusively to hold the seeded circle conversations. */
const SEED_AUTHORS = [
  '5d0df82f0a9c31969836fa5339e15e2f59a30a9a0b9af943118761806923d784',
  '4e17235061cafc46b2ceb8ed837505c69e31f6b7c602bd2d939fb70c2845c082',
  '3f9b9f7ef9bec4720b9f04d68c9d8b0822f8010ef706592bfcd982606be058c1',
  'b55f5f2284c4969e755f43194d0b7aba2d80edd6b996651d798f370f86079aa8',
  '8635f5e11526c4710955f24b67aa87c750bad694c18f07462d3fe936246073f2',
  '9b16a4dd0bc16ec5891ec39d1f4e1637319d8889fa1cec04d8e0f3b121b45d85',
  '509c804269cdc5815ac96f68e47f08d8715b05a70f395e79389ba475c5611e33',
  'cb1f849f338909e65b51148e545921e956c0c141164dc8bdf36c5d52b84750ff',
  'f891765377f131bb7fd8f271b7887c96a2d4444c0945c434af94e0bfbf7bb40d',
  '11e0119be3e19e10362640e33007fad194d5d72a36fee3af451b3c3cb109e98c',
  '21d6f33c27cd6d421ea40a893e6b41bef7c707ded3cf516ee0ea3bc4d7389c1e',
  'e984c0d503c0d72b75116efcf3047d71f493e734430d477b3f4f248d7adb1108',
  '3440a031deb7948ca2cc563a7b0a3f421a424ff2063505128a5d9b00329f7d2d',
  'fb97741c284f8a2012f2db5876c63f0be169f30a06c438613bace1ca335dfa19',
  '54e6c519508d0b33e75237ca6b8f941f199b9039e98f00798a546cffe36f8ef1',
  '8a03a8a4f13eb68b9e8074efa76f17873f6a86e4b811279f505a7b7f0842f2d3',
];

export function isValidPost(event: NostrEvent): boolean {
  if (event.kind !== 1) return false;
  const content = event.content.trim();
  // Reject empty/oversized content and machine-authored JSON blobs.
  if (content.length === 0 || content.length > 4000 || content.startsWith('{')) return false;
  return true;
}

function replyParent(event: NostrEvent): string | undefined {
  return event.tags.find(([name, , , marker]) => name === 'e' && marker === 'reply')?.[1];
}

export interface CommunityData {
  posts: NostrEvent[];
  replies: Map<string, NostrEvent[]>;
}

export function useCommunity() {
  const { nostr } = useNostr();
  return useQuery<CommunityData>({
    queryKey: ['community'],
    queryFn: async (c) => {
      const events = await nostr.query(
        [
          { kinds: [1], '#t': [COMMUNITY_TAG], limit: 100 },
          { kinds: [1], authors: SEED_AUTHORS, limit: 50 },
        ],
        { signal: c.signal },
      );

      // Dedupe by id (an event can match both filters).
      const byId = new Map<string, NostrEvent>();
      for (const event of events) {
        if (isValidPost(event)) byId.set(event.id, event);
      }
      const valid = [...byId.values()];

      const posts = valid
        .filter((e) => !replyParent(e))
        .sort((a, b) => b.created_at - a.created_at);

      const replies = new Map<string, NostrEvent[]>();
      for (const event of valid) {
        const parent = replyParent(event);
        if (!parent) continue;
        const list = replies.get(parent) ?? [];
        list.push(event);
        replies.set(parent, list);
      }
      for (const list of replies.values()) {
        list.sort((a, b) => a.created_at - b.created_at);
      }

      return { posts, replies };
    },
  });
}
