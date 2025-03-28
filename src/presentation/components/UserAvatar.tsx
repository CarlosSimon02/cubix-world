"use client";

import { logoutAction } from "@/app/[lang]/(front)/_actions/logoutAction";
import { UserEntity } from "@/core/entities/UserEntity";
import { Avatar } from "primereact/avatar";
import { MenuItem } from "primereact/menuitem";
import { TieredMenu } from "primereact/tieredmenu";
import { useRef } from "react";

// Extracted translations
const translations = {
  logout: "Logout",
};

type UserAvatarProps = {
  user: UserEntity | null;
};

const UserAvatar = ({ user }: UserAvatarProps) => {
  const menu = useRef<TieredMenu>(null);

  const items: MenuItem[] = [
    {
      label: translations.logout,
      icon: "pi pi-sign-out",
      command: async () => {
        await logoutAction();
      },
    },
  ];

  return (
    <div className="card justify-content-center flex">
      <TieredMenu model={items} popup ref={menu} breakpoint="767px" />
      <Avatar
        image={user?.photoURL}
        label={user?.email?.charAt(0).toUpperCase()}
        size="large"
        shape="circle"
        onClick={(e) => menu.current?.toggle(e)}
        className="cursor-pointer"
      />
    </div>
  );
};

export default UserAvatar;
