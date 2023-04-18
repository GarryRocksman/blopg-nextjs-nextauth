import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <div className="flex-grow bg-gray-100 min-h-screen pb-10">
      {children}
    </div>
    <Footer />
  </div>
);

export default Layout;