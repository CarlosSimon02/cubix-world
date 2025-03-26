import { useTheme } from "@/presentation/contexts/ThemeContext";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button, theme } from "antd";

const { useToken } = theme;

const ThemeSwitcher = () => {
  const { themeMode, toggleTheme } = useTheme();
  const { token } = useToken();

  const styles: Styles = {
    themeSwitcher: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "32px",
      width: "32px",
      borderRadius: "50%",
      cursor: "pointer",
      backgroundColor: token.colorBgTextHover,
    },
  };

  return (
    <Button
      style={styles.themeSwitcher}
      type="text"
      icon={themeMode === "light" ? <MoonOutlined /> : <SunOutlined />}
      onClick={() => {
        toggleTheme();
      }}
    />
  );
};

export default ThemeSwitcher;
