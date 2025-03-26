"use client";

import UserAvatar from "@/presentation/components/UserAvatar";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { Grid, Layout, Row, Space, theme } from "antd";
import HeaderSearch from "./HeaderSearch";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

const { Header } = Layout;
const { useBreakpoint } = Grid;
const { useToken } = theme;

const AdminNavbar = () => {
  const { user } = useAuth();
  const { md, sm } = useBreakpoint();
  const { token } = useToken();
  return (
    <Header
      style={{
        backgroundColor: token.colorBgElevated,
        padding: "0 24px",
      }}
    >
      <Row
        align="middle"
        style={{
          justifyContent: sm ? "space-between" : "end",
        }}
      >
        <HeaderSearch />
        <Space size={md ? 32 : 16} align="center">
          <LanguageSwitcher />
          <ThemeSwitcher />

          <Space size={md ? 16 : 8} align="center">
            <UserAvatar user={user} />
          </Space>
        </Space>
      </Row>
    </Header>
  );
};

export default AdminNavbar;
