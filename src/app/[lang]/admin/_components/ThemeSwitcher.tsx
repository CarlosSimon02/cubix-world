// presentation/components/ThemeSwitcher.tsx
"use client";

import { ActionIcon, Tooltip, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const tooltipText = `Switch to ${colorScheme === "light" ? "dark" : "light"} mode`;

  return (
    isClient && (
      <Tooltip label={tooltipText} position="bottom" withArrow>
        <ActionIcon
          variant="light"
          size="lg"
          radius="xl"
          onClick={toggleColorScheme}
          aria-label="Toggle theme"
        >
          {colorScheme === "dark" ? (
            <IconSun size={18} />
          ) : (
            <IconMoon size={18} />
          )}
        </ActionIcon>
      </Tooltip>
    )
  );
}
