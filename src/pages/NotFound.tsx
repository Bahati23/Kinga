import { useSeoMeta } from "@unhead/react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ShieldQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KingaLogo } from "@/components/kinga/KingaLogo";
import { useLanguage } from "@/lib/i18n/useLanguage";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useSeoMeta({
    title: "Kinga — Page not found",
    description: "The page you are looking for could not be found.",
  });

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background px-6 text-center">
      <KingaLogo />
      <div>
        <ShieldQuestion className="mx-auto size-10 text-primary" aria-hidden />
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
          {t('notfound.title')}
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-lg leading-relaxed text-muted-foreground">
          {t('notfound.body')}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild className="rounded-full">
          <Link to="/">{t('notfound.home')}</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/ussd">{t('notfound.demo')}</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
