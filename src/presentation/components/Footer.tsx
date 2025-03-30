"use client";
import { ActionIcon, Container, Group, Text } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import LocaleLink from "./LocaleLink";

const data = [
  {
    title: "About",
    links: [
      { label: "Features", link: "#" },
      { label: "Pricing", link: "#" },
      { label: "Support", link: "#" },
      { label: "Forums", link: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "#" },
      { label: "Media assets", link: "#" },
      { label: "Changelog", link: "#" },
      { label: "Releases", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Discord", link: "#" },
      { label: "Follow on Twitter", link: "#" },
      { label: "Email newsletter", link: "#" },
      { label: "GitHub discussions", link: "#" },
    ],
  },
];

const Footer = () => {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text
        key={index}
        className="dark:text-dark-1 block py-0.5 text-sm text-gray-600"
        component={LocaleLink}
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className="w-40" key={group.title}>
        <Text className="text-lg font-bold text-black dark:text-white">
          {group.title}
        </Text>
        {links}
      </div>
    );
  });

  return (
    <footer className="dark:bg-dark-600 dark:border-dark-500 mt-28 border-t border-gray-200 bg-gray-50 py-[calc(var(--mantine-spacing-xl)*2)]">
      <Container className="flex justify-between max-sm:flex-col max-sm:items-center">
        <div className="max-w-52 max-sm:flex max-sm:flex-col max-sm:items-center">
          <MantineLogo size={30} />
          <Text
            size="xs"
            c="dimmed"
            className="max-sm:mt-xs mt-1 max-sm:text-center"
          >
            Build fully functional accessible web applications faster than ever
          </Text>
        </div>
        <div className="flex flex-wrap max-sm:hidden">{groups}</div>
      </Container>
      <Container className="mt-xl py-xl dark:border-dark-400 flex items-center justify-between border-t border-gray-200 max-sm:flex-col">
        <Text c="dimmed" size="sm">
          © 2020 mantine.dev. All rights reserved.
        </Text>

        <Group
          gap={0}
          className="max-sm:mt-xs"
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
};

export default Footer;
