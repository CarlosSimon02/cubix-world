"use client";

import { DEFAULT_LOCALE, LOCALES } from "@/config/i18n";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown } from "primereact/dropdown";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const localeOptions = LOCALES.map((lang) => ({
    label: (
      <div className="align-items-center flex gap-2">
        <Image
          src={`/images/flags/${lang}.svg`}
          alt={lang}
          className="w-[1rem]"
          width={16}
          height={16}
        />
        <span>{lang === "en" ? "English" : "German"}</span>
      </div>
    ),
    value: lang,
  }));

  const handleLocaleChange = (lang: string) => {
    const localeRegex = new RegExp(`^/(${LOCALES.join("|")})`);
    const pathWithoutLocale = pathname.replace(localeRegex, "");
    router.push(`/${lang}${pathWithoutLocale}`);
  };

  return (
    <Dropdown
      value={DEFAULT_LOCALE}
      options={localeOptions}
      onChange={(e) => handleLocaleChange(e.value)}
      optionLabel="label"
      pt={{
        root: { className: "w-8rem" },
        option: { className: "text-color-secondary" },
      }}
    />
  );
};

export default LanguageSwitcher;
