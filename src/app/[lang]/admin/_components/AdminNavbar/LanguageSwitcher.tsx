"use client";

import { DEFAULT_LOCALE, LOCALES } from "@/config/i18n";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Button, Dropdown, Space, theme, Typography } from "antd";
import { useParams, usePathname, useRouter } from "next/navigation";

const { Text } = Typography;
const { useToken } = theme;

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { token } = useToken();

  const currentLocale = (params?.lang as string) || DEFAULT_LOCALE;

  // Create regex pattern from LOCALES array
  const localePattern = LOCALES.join("|");
  const localeRegex = new RegExp(`^/(${localePattern})`);

  const menuItems: MenuProps["items"] = LOCALES.sort().map((lang: string) => ({
    key: lang,
    onClick: () => {
      // Remove current locale from pathname if present
      const pathWithoutLocale = pathname.replace(localeRegex, "");
      const newPath = `/${lang}${pathWithoutLocale}`;
      router.push(newPath);
    },
    icon: (
      <span style={{ marginRight: 8 }}>
        <Avatar size={16} src={`/images/flags/${lang}.svg`} />
      </span>
    ),
    label: lang === "en" ? "English" : "German", // Consider making this dynamic too
  }));

  return (
    <Dropdown
      menu={{
        items: menuItems,
        selectedKeys: [currentLocale],
      }}
    >
      <Button onClick={(e) => e.preventDefault()}>
        <Space>
          <Text
            style={{
              color: token.colorTextSecondary,
            }}
          >
            {currentLocale === "en" ? "English" : "German"}
          </Text>
          <DownOutlined
            style={{
              color: token.colorTextTertiary,
              width: "10px",
            }}
          />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default LanguageSwitcher;
