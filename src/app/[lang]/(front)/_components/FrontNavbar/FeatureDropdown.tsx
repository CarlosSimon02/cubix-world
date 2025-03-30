import LocaleLink from "@/presentation/components/LocaleLink";
import {
  Anchor,
  Box,
  Button,
  Center,
  Divider,
  Group,
  HoverCard,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { NavFeatureItem } from "./mockData";
import { navLinkClasses } from "./NavLink";

interface FeatureDropdownProps {
  features: NavFeatureItem[];
}

export const FeatureDropdown = ({ features }: FeatureDropdownProps) => {
  const theme = useMantineTheme();

  const featureLinks = features.map((item) => (
    <UnstyledButton
      className="py-xs px-md hover:dark:bg-dark-700 w-full rounded-md hover:bg-gray-50 max-sm:h-10"
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
    <HoverCard
      width={600}
      position="bottom"
      radius="md"
      shadow="md"
      withinPortal
    >
      <HoverCard.Target>
        <LocaleLink href="#" className={navLinkClasses}>
          <Center inline>
            <Box component="span" mr={5}>
              Features
            </Box>
            <IconChevronDown size={16} color={theme.colors.blue[6]} />
          </Center>
        </LocaleLink>
      </HoverCard.Target>

      <HoverCard.Dropdown style={{ overflow: "hidden" }}>
        <Group justify="space-between" px="md">
          <Text fw={500}>Features</Text>
          <Anchor href="#" fz="xs">
            View all
          </Anchor>
        </Group>

        <Divider my="sm" />

        <SimpleGrid cols={2} spacing={0}>
          {featureLinks}
        </SimpleGrid>

        <div className="dark:bg-dark-700 -m-md mt-sm py-md pb-xl dark:border-dark-5 border-t border-gray-100 bg-gray-50 px-[calc(var(--mantine-spacing-md)*2)]">
          <Group justify="space-between">
            <div>
              <Text fw={500} fz="sm">
                Get started
              </Text>
              <Text size="xs" c="dimmed">
                Their food sources have decreased, and their numbers
              </Text>
            </div>
            <Button variant="default">Get started</Button>
          </Group>
        </div>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};
