"use client";

import { UserEntity } from "@/core/entities/UserEntity";
import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Space, Typography } from "antd";
import { logoutAction } from "../../app/[lang]/(front)/_actions/logoutAction";

type UserAvatarProps = {
  user: UserEntity | null;
};

const UserAvatar = ({ user }: UserAvatarProps) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Space>
          <LogoutOutlined />
          <Typography.Text>Logout</Typography.Text>
        </Space>
      ),
      onClick: async () => {
        await logoutAction();
      },
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <Avatar src={user?.photoURL} size={40}>
        {user?.email?.charAt(0).toUpperCase()}
      </Avatar>
    </Dropdown>
  );
};

export default UserAvatar;
