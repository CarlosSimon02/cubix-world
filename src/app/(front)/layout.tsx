import Footer from "@/presentation/components/Footer";
import Navbar from "@/presentation/components/Navbar";
import ContentContainer from "./_components/ContentContainer";
import MainLayoutContainer from "./_components/MainLayoutContainer";

type FrontLayoutProps = {
  children: React.ReactNode;
};

const FrontLayout = ({ children }: FrontLayoutProps) => {
  return (
    <MainLayoutContainer>
      <Navbar />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </MainLayoutContainer>
  );
};

export default FrontLayout;
