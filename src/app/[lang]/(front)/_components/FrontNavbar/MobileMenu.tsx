import LocaleLink from "@/presentation/components/LocaleLink";
import { UserAvatar } from "@/presentation/components/UserAvatar";
import { useAuth } from "@/presentation/contexts/AuthContext";
import {
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { NAV_FEATURES } from "./mockData";
import { NavLink } from "./NavLink";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { user } = useAuth();
  const theme = useMantineTheme();

  const mobileLinks = NAV_FEATURES.map((item) => (
    <UnstyledButton
      className="py-xs px-md hover:dark:bg-dark-700 w-full rounded-md hover:bg-gray-50"
      key={item.title}
    >
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      size="100%"
      padding="md"
      title="Navigation"
      hiddenFrom="sm"
      zIndex={1000000}
    >
      <ScrollArea h="calc(100vh - 80px)" mx="-md">
        <Divider my="sm" />

        <NavLink href="#">Home</NavLink>
        <UnstyledButton
          className="pl-md pr-md dark:hover:bg-dark-600 flex h-full items-center text-sm font-medium text-black hover:bg-gray-50 dark:text-white"
          onClick={toggleLinks}
        >
          <Center inline>
            <Box component="span" mr={5}>
              Features
            </Box>
            <IconChevronDown size={16} color={theme.colors.blue[6]} />
          </Center>
        </UnstyledButton>
        <Collapse in={linksOpened}>{mobileLinks}</Collapse>
        <NavLink href="#">Learn</NavLink>
        <NavLink href="#">Academy</NavLink>

        <Divider my="sm" />

        <Group justify="center" grow pb="xl" px="md">
          {user ? (
            <UserAvatar user={user} hasLabel />
          ) : (
            <>
              <Button component={LocaleLink} href="/login" variant="default">
                Log in
              </Button>
              <Button component={LocaleLink} href="/signup">
                Sign up
              </Button>
            </>
          )}
        </Group>
      </ScrollArea>
    </Drawer>
  );
};

export default MobileMenu;
