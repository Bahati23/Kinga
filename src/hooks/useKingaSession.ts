import { useCallback, useRef, useState } from 'react';
import {
  firstReply,
  initialSession,
  step,
  type Reply,
  type SessionData,
} from '@/lib/kinga/session';
import type { Channel } from '@/lib/kinga/types';

export interface TranscriptEntry {
  id: number;
  from: 'network' | 'user';
  text: string;
}

/**
 * Drives one Kinga USSD/SMS session. `send` is event-handler driven (never
 * called inside a render or state updater), so side effects like case
 * creation stay StrictMode-safe. Sessions open with a language choice
 * (English / Kiswahili), exactly like the production USSD service.
 */
export function useKingaSession(channel: Channel) {
  const sessionRef = useRef<SessionData>(initialSession());
  const idRef = useRef(1);
  const [started, setStarted] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [reply, setReply] = useState<Reply>(firstReply());

  const start = useCallback((userText?: string) => {
    const first = firstReply();
    setStarted(true);
    setReply(first);
    setTranscript((t) => [
      ...t,
      ...(userText
        ? [{ id: idRef.current++, from: 'user' as const, text: userText }]
        : []),
      { id: idRef.current++, from: 'network', text: first.prompt },
    ]);
  }, []);

  const send = useCallback(
    (input: string) => {
      const clean = input.trim();
      if (!clean) return;
      if (!started) setStarted(true);
      const result = step(sessionRef.current, clean, channel);
      sessionRef.current = result.session;
      setReply(result.reply);
      setTranscript((t) => [
        ...t,
        { id: idRef.current++, from: 'user', text: clean },
        { id: idRef.current++, from: 'network', text: result.reply.prompt },
      ]);
    },
    [channel, started],
  );

  const reset = useCallback(() => {
    sessionRef.current = initialSession();
    setStarted(false);
    setReply(firstReply());
    setTranscript([]);
  }, []);

  return { transcript, reply, send, reset, start, started };
}
