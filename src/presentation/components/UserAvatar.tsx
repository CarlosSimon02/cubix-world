"use client";

import { logoutAction } from "@/app/[lang]/(front)/_actions/logoutAction";
import { UserEntity } from "@/core/entities/UserEntity";
import getInitials from "@/utils/getInitials";
import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import {
  IconChevronRight,
  IconHome,
  IconLogout,
  IconSettings,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import LocaleLink from "./LocaleLink";

interface UserAvatarProps {
  user: UserEntity;
  hasLabel?: boolean;
}

const MyAvatar = ({ user }: UserAvatarProps) => {
  return (
    <Avatar
      src={user.photoURL}
      alt={user.displayName || user.email}
      radius="xl"
      color="blue"
    >
      {getInitials(user.displayName || user.email)}
    </Avatar>
  );
};

export function UserAvatar({ user, hasLabel }: UserAvatarProps) {
  const pathname = usePathname();
  const isAdminPage = pathname?.includes("/admin");

  return (
    <Menu width={260} position="bottom-end" withArrow withinPortal={false}>
      <Menu.Target>
        <UnstyledButton>
          <Group>
            <MyAvatar user={user} />
            {hasLabel && (
              <>
                <div className="flex-1">
                  {user.displayName && (
                    <Text size="sm" fw={600}>
                      {user.displayName}
                    </Text>
                  )}
                  <Text c="dimmed" size="xs">
                    {user.email}
                  </Text>
                </div>
                <IconChevronRight size={16} />
              </>
            )}
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown className="max-w-[400px]">
        <Menu.Label>
          <Group>
            <MyAvatar user={user} />

            <div className="flex-1">
              {user.displayName && (
                <Text size="sm" fw={600}>
                  {user.displayName}
                </Text>
              )}
              <Text c="dimmed" size="xs">
                {user.email}
              </Text>
            </div>
          </Group>
        </Menu.Label>

        <Menu.Divider />

        {isAdminPage ? (
          <Menu.Item
            component={LocaleLink}
            href="/"
            leftSection={<IconHome size={14} />}
          >
            Home
          </Menu.Item>
        ) : (
          <Menu.Item
            component={LocaleLink}
            href="/admin"
            leftSection={<IconSettings size={14} />}
          >
            Admin
          </Menu.Item>
        )}

        <Menu.Item
          leftSection={<IconLogout size={14} />}
          onClick={logoutAction}
        >
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
