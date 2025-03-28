"use client";

import Link from "next/link";
import { Button } from "primereact/button";
import FrontContainer from "./FrontContainer";
import Logo from "./Logo";

const translations = {
  about: "About",
  pricing: "Pricing",
  help: "Help",
  terms: "Terms & Conditions",
};

const navItems = [
  { label: translations.about, href: "#about" },
  { label: translations.pricing, href: "#pricing" },
  { label: translations.help, href: "#help" },
  { label: translations.terms, href: "#terms" },
];

const footerText = {
  copyright: (year: number) => `© ${year} Cubix World.`,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-ground border-surface-border border-t-1 py-6">
      <FrontContainer className="flex flex-col items-center justify-between gap-6 md:flex-row">
        {/* Logo */}
        <Link href="#" className="block h-8">
          <Logo showText={true} />
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col items-center gap-2 md:flex-row md:gap-0">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} passHref legacyBehavior>
              <Button
                link
                label={item.label}
                className="text-color-secondary hover:text-primary p-2 md:mx-2"
              />
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-color-secondary text-center md:text-right">
          {footerText.copyright(currentYear)}
        </p>
      </FrontContainer>
    </footer>
  );
};

export default Footer;
