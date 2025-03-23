type ContentContainerProps = {
  children: React.ReactNode;
};

const ContentContainer = ({ children }: ContentContainerProps) => {
  const styles: Styles = {
    container: {
      flex: "1",
    },
  };

  return <div style={styles.container}>{children}</div>;
};

export default ContentContainer;
