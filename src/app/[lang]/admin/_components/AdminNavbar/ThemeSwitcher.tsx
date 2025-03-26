import { useTheme } from "@/presentation/contexts/ThemeContext";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button } from "antd";

const ThemeSwitcher = () => {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <Button
      className="theme-switch"
      type="text"
      icon={themeMode === "light" ? <MoonOutlined /> : <SunOutlined />}
      onClick={() => {
        toggleTheme();
      }}
    />
  );
};

export default ThemeSwitcher;
