"use client";

import FrontContainer from "@/presentation/components/FrontContainer";
import Logo from "@/presentation/components/Logo";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Grid, Menu, MenuProps, Space, theme } from "antd";
import { useState } from "react";

const { useToken } = theme;
const { useBreakpoint } = Grid;

const menuItems = [
  {
    label: "Projects",
    key: "projects",
  },
  {
    label: "Dashboard",
    key: "dashboard",
  },
  {
    label: "Products",
    key: "SubMenu",
    children: [
      {
        label: "Ant Design System",
        key: "product:1",
      },
      {
        label: "Ant Design Charts",
        key: "product:2",
      },
    ],
  },
  {
    label: "Settings",
    key: "alipay",
  },
];

const Navbar = () => {
  const { token } = useToken();
  const screens = useBreakpoint();

  const [current, setCurrent] = useState("projects");
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const styles: Styles = {
    container: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
    },
    header: {
      backgroundColor: token.colorBgContainer,
      borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      position: "relative",
    },
    logo: {
      display: "block",
      height: token.sizeLG,
      left: "50%",
      position: screens.md ? "static" : "absolute",
      top: "50%",
      transform: screens.md ? " " : "translate(-50%, -50%)",
    },
    menu: {
      backgroundColor: "transparent",
      borderBottom: "none",
      lineHeight: screens.sm ? "4rem" : "3.5rem",
      marginLeft: screens.md ? "0px" : `-${token.size}px`,
      width: screens.md ? "inherit" : token.sizeXXL,
    },
    menuContainer: {
      alignItems: "center",
      display: "flex",
      gap: token.size,
      width: "100%",
    },
  };

  return (
    <nav style={styles.header}>
      <FrontContainer style={styles.container}>
        <div style={styles.menuContainer}>
          <a style={styles.logo} href="#">
            <Logo showText={true} />
          </a>
          <Menu
            style={styles.menu}
            mode="horizontal"
            items={menuItems}
            onClick={onClick}
            selectedKeys={screens.md ? [current] : undefined}
            overflowedIndicator={
              <Button type="text" icon={<MenuOutlined />}></Button>
            }
          />
        </div>
        <Space>
          {screens.md ? <Button type="text">Log in</Button> : ""}
          <Button type="primary">Sign up</Button>
        </Space>
      </FrontContainer>
    </nav>
  );
};

export default Navbar;
