type ContentContainerProps = {
  children: React.ReactNode;
};

const ContentContainer = ({ children }: ContentContainerProps) => {
  return <div className="flex-1">{children}</div>;
};

export default ContentContainer;
