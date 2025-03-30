import LocaleLink from "@/presentation/components/LocaleLink";
import cn from "@/utils/cn";
import { ComponentProps } from "react";

export const navLinkClasses = cn(
  "pl-md pr-md flex h-full items-center text-sm font-medium text-black dark:text-white hover:bg-gray-50 dark:hover:bg-dark-600"
);

interface NavLinkProps extends ComponentProps<typeof LocaleLink> {
  className?: string;
}

export const NavLink = ({ href, children, className }: NavLinkProps) => {
  return (
    <LocaleLink href={href} className={cn(navLinkClasses, className)}>
      {children}
    </LocaleLink>
  );
};
