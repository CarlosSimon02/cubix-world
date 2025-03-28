type MainLayoutContainerProps = {
  children: React.ReactNode;
};

const MainLayoutContainer = ({ children }: MainLayoutContainerProps) => {
  return <div className="flex-column flex min-h-screen">{children}</div>;
};

export default MainLayoutContainer;
