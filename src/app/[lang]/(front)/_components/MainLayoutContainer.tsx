type MainLayoutContainerProps = {
  children: React.ReactNode;
};

const MainLayoutContainer = ({ children }: MainLayoutContainerProps) => {
  const styles: Styles = {
    container: {
      minHeight: "100dvh",
      display: "flex",
      flexDirection: "column",
    },
  };

  return <div style={styles.container}>{children}</div>;
};

export default MainLayoutContainer;
