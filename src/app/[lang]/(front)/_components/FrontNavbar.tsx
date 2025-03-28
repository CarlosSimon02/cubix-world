"use client";

import FrontContainer from "@/presentation/components/FrontContainer";
import Logo from "@/presentation/components/Logo";
import UserAvatar from "@/presentation/components/UserAvatar";
import { useAuth } from "@/presentation/contexts/AuthContext";
import Link from "next/link";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";

// Extracted text content for translations
const translations = {
  menuItems: {
    projects: "Projects",
    dashboard: "Dashboard",
    products: "Products",
    product1: "Ant Design System",
    product2: "Ant Design Charts",
    settings: "Settings",
  },
  auth: {
    login: "Log in",
    signup: "Sign up",
  },
};

const FrontNavbar = () => {
  const { user } = useAuth();

  // Menu items with translated text
  const menuItems = [
    {
      label: translations.menuItems.projects,
    },
    {
      label: translations.menuItems.dashboard,
    },
    {
      label: translations.menuItems.products,
      items: [
        {
          label: translations.menuItems.product1,
        },
        {
          label: translations.menuItems.product2,
        },
      ],
    },
    {
      label: translations.menuItems.settings,
    },
  ];

  const startContent = (
    <Link href="#" className="mr-3">
      <Logo showText={true} />
    </Link>
  );

  const endContent = user ? (
    <UserAvatar user={user} />
  ) : (
    <div className="flex items-center gap-2">
      {/* Hidden on mobile, visible from md breakpoint up */}
      <Link href="/login" passHref className="hidden md:block">
        <Button label={translations.auth.login} text />
      </Link>
      <Link href="/signup" passHref>
        <Button label={translations.auth.signup} />
      </Link>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <FrontContainer className="flex items-center justify-between">
        <Menubar
          model={menuItems}
          start={startContent}
          end={endContent}
          className="w-full border-none bg-transparent"
          menuIcon={<i className="pi pi-bars" />}
        />
      </FrontContainer>
    </nav>
  );
};

export default FrontNavbar;
