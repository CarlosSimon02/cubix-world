import Footer from "@/presentation/components/Footer";
import ContentContainer from "./_components/ContentContainer";
import FrontNavbar from "./_components/FrontNavbar";
import MainLayoutContainer from "./_components/MainLayoutContainer";

type FrontLayoutProps = {
  children: React.ReactNode;
};

const FrontLayout = ({ children }: FrontLayoutProps) => {
  return (
    <MainLayoutContainer>
      <FrontNavbar />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </MainLayoutContainer>
  );
};

export default FrontLayout;
