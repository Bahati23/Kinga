import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createHead, UnheadProvider } from '@unhead/react/client';
import { NostrLoginProvider } from '@nostrify/react/login';
import NostrProvider from '@/components/NostrProvider';
import { AppProvider } from '@/components/AppProvider';
import { LanguageProvider } from '@/lib/i18n';
import { AppRouter } from '@/AppRouter';

function Shell({ route }: { route: string }) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return (
    <UnheadProvider head={createHead()}>
      <AppProvider
        storageKey="routes-test"
        defaultConfig={{
          theme: 'light',
          relayMetadata: { relays: [{ url: 'wss://relay.primal.net', read: true, write: true }], updatedAt: 0 },
          blossomServerMetadata: { servers: ['https://blossom.primal.net/'], updatedAt: 0 },
          useAppBlossomServers: true,
        }}
      >
        <QueryClientProvider client={qc}>
          <NostrLoginProvider storageKey="routes-test-login">
            <NostrProvider>
              <LanguageProvider>
                <AppRouter key={route} />
              </LanguageProvider>
            </NostrProvider>
          </NostrLoginProvider>
        </QueryClientProvider>
      </AppProvider>
    </UnheadProvider>
  );
}

describe('route smoke test', () => {
  for (const route of ['/', '/ussd', '/community', '/safety', '/dashboard', '/referrals', '/analytics', '/admin', '/nope']) {
    it(`renders ${route} without crashing or watermark`, async () => {
      window.history.pushState({}, '', route);
      const { container } = render(<Shell route={route} />);
      await waitFor(() => expect(container.textContent!.length).toBeGreaterThan(50));
      expect(container.textContent).not.toMatch(/something went wrong/i);
      expect(container.textContent).not.toMatch(/shakespeare/i);
    });
  }
});
