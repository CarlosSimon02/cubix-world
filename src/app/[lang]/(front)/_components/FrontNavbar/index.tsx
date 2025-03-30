"use client";

import { Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";

export const FrontNavbar = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <>
      <div className="bg- dark:bg-dark-700 dark:border-dark-400 sticky top-0 z-10 border-b border-gray-300 bg-white">
        <Container component="header" className="dark:border-dark-4 h-16">
          <Group justify="space-between" h="100%">
            <MantineLogo size={30} />
            <DesktopNav />
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Group>
        </Container>
      </div>
      <MobileMenu isOpen={drawerOpened} onClose={closeDrawer} />
    </>
  );
};

export default FrontNavbar;
