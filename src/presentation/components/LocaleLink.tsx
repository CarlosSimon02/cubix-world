"use client";

import Link from "next/link";
import useLocalizedHref from "../hooks/useLocalizedHref";

export default function LocaleLink({
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  const { localizedHref } = useLocalizedHref();

  return <Link href={localizedHref(href as string)} {...props} />;
}
