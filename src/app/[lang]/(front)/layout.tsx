import Footer from "@/presentation/components/Footer";
import FrontNavbar from "./_components/FrontNavbar";

type FrontLayoutProps = {
  children: React.ReactNode;
};

const FrontLayout = ({ children }: FrontLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <FrontNavbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default FrontLayout;
