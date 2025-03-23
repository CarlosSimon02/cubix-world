"use client";

import { Button, Grid, Space, theme, Typography } from "antd";
import FrontContainer from "./FrontContainer";
import Logo from "./Logo";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text } = Typography;

const Footer = () => {
  const { token } = useToken();
  const screens = useBreakpoint();

  const styles: Styles = {
    container: {
      alignItems: "center",
      display: "flex",
      flexDirection: screens.md ? "row" : "column",
      gap: token.marginLG,
      justifyContent: "space-between",
    },
    logo: {
      display: "block",
      height: token.sizeLG,
    },
    footer: {
      backgroundColor: token.colorBgContainer,
      borderTop: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      padding: `${token.sizeXXL}px 0px`,
    },
    nav: {
      alignItems: "center",
      marginLeft: screens.md ? `-${token.margin}px` : 0,
    },
    text: {
      color: token.colorTextSecondary,
      textAlign: screens.md ? "right" : "center",
    },
  };

  return (
    <footer style={styles.footer}>
      <FrontContainer style={styles.container}>
        <a style={styles.logo} href="#">
          <Logo showText={true} />
        </a>
        <Space
          style={styles.nav}
          direction={screens.md ? "horizontal" : "vertical"}
          size={screens.md ? 0 : "small"}
        >
          <Button type="text" href="#">
            About
          </Button>
          <Button type="text" href="#">
            Pricing
          </Button>
          <Button type="text" href="#">
            Help
          </Button>
          <Button type="text" href="#">
            Terms & Conditions
          </Button>
        </Space>
        <Text style={styles.text}>
          © {new Date().getFullYear()} Cubix World.
        </Text>
      </FrontContainer>
    </footer>
  );
};

export default Footer;
