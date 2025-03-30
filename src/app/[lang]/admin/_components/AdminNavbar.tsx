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
  IconShoppingCart,
  IconTag,
  IconUsers,
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

const AdminNavbar = () => {
  const pathname = usePathname();
  const { currentLocale } = useLocalizedHref();

  // Remove the language part from the path
  const currentPath =
    pathname?.replace(new RegExp(`^/${currentLocale}`), "") || "";

  const links = tabs.map((item) => {
    // Check if current path starts with the link path
    const isActive =
      currentPath.startsWith(item.link) ||
      (item.link === "/admin/dashboard" && currentPath === "/admin");

    return (
      <LocaleLink
        className={cn(
          "dark:text-dark-100 py-xs px-sm flex items-center rounded-sm text-sm font-medium",
          isActive
            ? "bg-primary-light !text-primary-light-color"
            : "hover:bg-gray-0 dark:hover:bg-dark-600 text-gray-700 hover:text-black dark:hover:text-white"
        )}
        href={item.link}
        key={item.label}
      >
        <item.icon stroke={1.5} />
        <span className="ml-2">{item.label}</span>
      </LocaleLink>
    );
  });

  return (
    <AppShell.Navbar p="md">
      <div className="mt-xl flex-1">{links}</div>
    </AppShell.Navbar>
  );
};

export default AdminNavbar;
