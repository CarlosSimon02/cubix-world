"use client";

import { UserEntity } from "@/core/entities/UserEntity";
import { UserAvatar } from "@/presentation/components/UserAvatar";
import withClientAuth from "@/utils/withClientAuth";
import { AppShell, Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import AdminNavbar from "./AdminNavbar";
import HeaderSearch from "./HeaderSearch";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

type AdminAppShellProps = {
  children: React.ReactNode;
  user: UserEntity;
};

const AdminAppShell = withClientAuth<AdminAppShellProps>(
  ({ children, user }) => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    return (
      <AppShell
        padding="md"
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
      >
        <AppShell.Header className="flex justify-between pr-4">
          <Group h="100%" px="md">
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <MantineLogo size={30} type="mark" className="sm:hidden" />
            <MantineLogo size={30} type="full" className="hidden sm:block" />
          </Group>
          <Group>
            <HeaderSearch />
            <LanguageSwitcher />
            <ThemeSwitcher />
            <UserAvatar user={user} />
          </Group>
        </AppShell.Header>
        <AdminNavbar />
        <AppShell.Main className="dark:bg-dark-900 bg-gray-100">
          <Container p={0}>{children}</Container>
        </AppShell.Main>
      </AppShell>
    );
  }
);

export default AdminAppShell;
