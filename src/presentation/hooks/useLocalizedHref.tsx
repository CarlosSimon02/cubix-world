// hooks/useLocalizedHref.ts
"use client";

import { DEFAULT_LOCALE, LOCALES } from "@/config/i18n";
import { usePathname } from "next/navigation";

const useLocalizedHref = () => {
  const pathname = usePathname();

  // Get current locale from pathname
  const getCurrentLocale = () => {
    return (
      LOCALES.find((locale) => pathname?.startsWith(`/${locale}`)) ||
      DEFAULT_LOCALE
    );
  };

  // Create localized href
  const localizedHref = (href: string) => {
    const currentLocale = getCurrentLocale();
    return `/${currentLocale}${href === "/" ? "" : href}`;
  };

  return {
    currentLocale: getCurrentLocale(),
    localizedHref,
  };
};

export default useLocalizedHref;
