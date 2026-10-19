import { Outlet } from 'react-router-dom';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { HelpButton } from './HelpButton';
import { useLanguage } from '@/lib/i18n/useLanguage';

export function SiteLayout() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        {t('nav.skip')}
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <HelpButton />
    </div>
  );
}
