"use client";

import { DEFAULT_LOCALE, LOCALES } from "@/config/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LocaleLink({
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  const pathname = usePathname();

  // Get current locale from pathname
  const currentLocale =
    LOCALES.find((locale) => pathname?.startsWith(`/${locale}`)) ||
    DEFAULT_LOCALE;

  // Prepend the current locale to the href
  const localizedHref = `/${currentLocale}${href === "/" ? "" : href}`;

  return <Link href={localizedHref} {...props} />;
}
