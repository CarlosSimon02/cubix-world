import { Grid, theme } from "antd";
import { CSSProperties, ReactNode } from "react";

const { useToken } = theme;
const { useBreakpoint } = Grid;

type FrontContainerProps = {
  children: ReactNode;
  style?: CSSProperties;
};

const FrontContainer = ({ children, style }: FrontContainerProps) => {
  const { token } = useToken();
  const screens = useBreakpoint();

  const styles: Styles = {
    container: {
      margin: "0 auto",
      maxWidth: token.screenXL,
      padding: screens.md
        ? `0px ${token.paddingLG}px`
        : `0px ${token.padding}px`,
      ...style,
    },
  };
  return <div style={styles.container}>{children}</div>;
};

export default FrontContainer;
