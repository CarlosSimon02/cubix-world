"use client";

import germanFlag from "@/assets/flags/de.svg";
import englishFlag from "@/assets/flags/en.svg";
import { LOCALES } from "@/config/i18n";
import { useDictionary } from "@/presentation/contexts/DictionaryContext";
import { Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentLocale } = useDictionary();

  const handleLocaleChange = (lang: string) => {
    const localeRegex = new RegExp(`^/(${LOCALES.join("|")})`);
    const pathWithoutLocale = pathname.replace(localeRegex, "");
    router.push(`/${lang}${pathWithoutLocale}`);
    router.refresh();
  };

  const getLanguageName = (lang: string) => {
    return lang === "en" ? "English" : "German";
  };

  return (
    <Menu shadow="md" width={140} position="bottom-end">
      <Menu.Target>
        <UnstyledButton>
          <Group gap={4}>
            <Text size="sm">{getLanguageName(currentLocale)}</Text>
            <IconChevronDown size={16} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        {LOCALES.map((lang) => (
          <Menu.Item key={lang} onClick={() => handleLocaleChange(lang)}>
            <Group gap="xs">
              <Image
                src={lang === "en" ? englishFlag : germanFlag}
                alt={lang}
                width={20}
                height={20}
                className="size-5 rounded-full object-cover"
              />
              <Text size="sm">{getLanguageName(lang)}</Text>
            </Group>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default LanguageSwitcher;
