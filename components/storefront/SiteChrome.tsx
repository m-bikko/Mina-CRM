import type { ReactElement, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";
import { CATEGORIES, LOCALES, LOCALE_LABEL, LOCALE_NAME, getDictionary, localePath, type Locale } from "@/lib/i18n";
import { INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/site";
import { serializeJsonLd, type JsonLdObject } from "@/lib/seo";

interface LanguageSwitcherProps {
  locale: Locale;
  path: string;
  className?: string;
}

export const LanguageSwitcher = ({ locale, path, className = "" }: LanguageSwitcherProps): ReactElement => {
  const dict = getDictionary(locale);
  return (
    <nav aria-label={dict.language} className={`flex items-center gap-1 text-xs tracking-widest ${className}`}>
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={localePath(l, path)}
          hrefLang={l}
          lang={l}
          title={LOCALE_NAME[l]}
          aria-current={l === locale ? "true" : undefined}
          className={`px-2 py-1 rounded-md transition-colors ${l === locale ? "bg-rose-600/20 text-rose-200" : "text-neutral-400 hover:text-white"}`}
        >
          {LOCALE_LABEL[l]}
        </Link>
      ))}
    </nav>
  );
};

interface JsonLdScriptProps {
  data: JsonLdObject | JsonLdObject[];
}

export const JsonLdScript = ({ data }: JsonLdScriptProps): ReactElement => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
);

interface SiteChromeProps {
  locale: Locale;
  path: string;
  children: ReactNode;
}

export const SiteChrome = ({ locale, path, children }: SiteChromeProps): ReactElement => {
  const dict = getDictionary(locale);
  return (
    <div lang={locale} className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-40 bg-neutral-950/85 backdrop-blur-xl border-b border-neutral-800/60">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href={localePath(locale, "/")} aria-label="Minawear" className="shrink-0">
            <Image src="/Logo_minawear.svg" alt="Minawear" width={100} height={28} className="opacity-90" />
          </Link>
          <div className="flex items-center gap-3">
            <Link href={`${localePath(locale, "/")}#catalog`} className="hidden sm:inline text-sm text-neutral-300 hover:text-white transition-colors">
              {dict.catalog}
            </Link>
            <LanguageSwitcher locale={locale} path={path} />
          </div>
        </div>
      </header>
      <main>{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
};

interface SiteFooterProps {
  locale: Locale;
}

export const SiteFooter = ({ locale }: SiteFooterProps): ReactElement => {
  const dict = getDictionary(locale);
  return (
    <footer className="relative z-10 border-t border-neutral-900 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-8">
        <nav aria-label={dict.categories} className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={localePath(locale, `/category/${category.slug}`)}
              className="px-3 py-1.5 rounded-full border border-neutral-800 text-sm text-neutral-400 hover:text-rose-200 hover:border-rose-900 transition-colors"
            >
              {category.name[locale]}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col items-center gap-3 text-sm text-neutral-500">
          <Image src="/Logo_minawear.svg" alt="Minawear" width={120} height={35} className="opacity-60" />
          <p className="text-center max-w-md">{dict.delivery}</p>
          <div className="flex items-center gap-4">
            <a href={whatsappLink(dict.waInterested)} className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <MessageCircle className="w-4 h-4" />
              {WHATSAPP_DISPLAY}
            </a>
            <a href={INSTAGRAM_URL} rel="me noopener" target="_blank" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
              @minawear.kz
            </a>
          </div>
          <p className="text-neutral-600">© {new Date().getFullYear()} Minawear. {dict.rights}</p>
        </div>
      </div>
    </footer>
  );
};
