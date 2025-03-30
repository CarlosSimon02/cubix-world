// "use client";

// import { logoutAction } from "@/app/[lang]/(front)/_actions/logoutAction";
// import { UserEntity } from "@/core/entities/UserEntity";
// import { Avatar } from "primereact/avatar";
// import { MenuItem } from "primereact/menuitem";
// import { TieredMenu } from "primereact/tieredmenu";
// import { useRef } from "react";

// // Extracted translations
// const translations = {
//   logout: "Logout",
// };

// type UserAvatarProps = {
//   user: UserEntity | null;
// };

// const UserAvatar = ({ user }: UserAvatarProps) => {
//   const menu = useRef<TieredMenu>(null);

//   const items: MenuItem[] = [
//     {
//       label: translations.logout,
//       icon: "pi pi-sign-out",
//       command: async () => {
//         await logoutAction();
//       },
//     },
//   ];

//   return (
//     <div className="card justify-content-center flex">
//       <TieredMenu model={items} popup ref={menu} breakpoint="767px" />
//       <Avatar
//         image={user?.photoURL}
//         label={user?.email?.charAt(0).toUpperCase()}
//         size="large"
//         shape="circle"
//         onClick={(e) => menu.current?.toggle(e)}
//         className="cursor-pointer"
//       />
//     </div>
//   );
// };

// export default UserAvatar;

"use client";

import { logoutAction } from "@/app/[lang]/(front)/_actions/logoutAction";
import { UserEntity } from "@/core/entities/UserEntity";
import getInitials from "@/utils/getInitials";
import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import {
  IconChevronRight,
  IconLogout,
  IconSettings,
} from "@tabler/icons-react";
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

        <Menu.Item
          component={LocaleLink}
          href="/admin"
          leftSection={<IconSettings size={14} />}
        >
          Admin
        </Menu.Item>

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
