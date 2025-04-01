import LocaleLink from "@/presentation/components/LocaleLink";
import useLocalizedHref from "@/presentation/hooks/useLocalizedHref";
import cn from "@/utils/cn";
import { AppShell } from "@mantine/core";
import {
  IconBox,
  IconBuildingStore,
  IconHome,
  IconMotorbike,
  IconSettings,
  IconShieldCog,
  IconShoppingCart,
  IconTag,
  IconUsers,
  IconUserShield,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Dashboard", link: "/admin/dashboard", icon: IconHome },
  { label: "Orders", link: "/admin/orders", icon: IconShoppingCart },
  { label: "Customers", link: "/admin/customers", icon: IconUsers },
  { label: "Products", link: "/admin/products", icon: IconBox },
  { label: "Categories", link: "/admin/categories", icon: IconTag },
  { label: "Stores", link: "/admin/stores", icon: IconBuildingStore },
  { label: "Couriers", link: "/admin/couriers", icon: IconMotorbike },
  { label: "Settings", link: "/admin/settings", icon: IconSettings },
];

const adminTabs = [
  { label: "CMS Users", link: "/admin/cms-users", icon: IconUserShield },
  { label: "Roles", link: "/admin/roles", icon: IconShieldCog },
];

const CustomLink = ({
  item,
  isActive,
}: {
  item: (typeof tabs)[number];
  isActive: boolean;
}) => (
  <LocaleLink
    className={cn(
      "dark:text-dark-100 py-xs px-sm flex items-center rounded-sm text-sm font-medium",
      isActive
        ? "bg-primary-light !text-primary-light-color"
        : "dark:hover:bg-dark-600 text-gray-700 hover:bg-gray-50 hover:text-black dark:hover:text-white"
    )}
    href={item.link}
  >
    <item.icon stroke={1.5} />
    <span className="ml-2">{item.label}</span>
  </LocaleLink>
);

const AdminNavbar = () => {
  const pathname = usePathname();
  const { currentLocale } = useLocalizedHref();

  const currentPath =
    pathname?.replace(new RegExp(`^/${currentLocale}`), "") || "";

  const isActive = (path: string) =>
    currentPath.startsWith(path) ||
    (path === "/admin/dashboard" && currentPath === "/admin");

  const links = tabs.map((item) => (
    <CustomLink item={item} isActive={isActive(item.link)} key={item.label} />
  ));

  const adminLinks = adminTabs.map((item) => (
    <CustomLink item={item} isActive={isActive(item.link)} key={item.label} />
  ));

  return (
    <AppShell.Navbar>
      <div className="h-full w-full overflow-y-auto">
        <div className="mt-xl !p-md flex-1">{links}</div>
      </div>
      <div className="!p-md flex-1">{adminLinks}</div>
    </AppShell.Navbar>
  );
};

export default AdminNavbar;
