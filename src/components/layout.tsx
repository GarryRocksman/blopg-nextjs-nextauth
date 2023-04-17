import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {  
  return  (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow bg-gray-100 min-h-screen pb-10">
        {children}
      </div>
      <Footer />
    </div>
  );
}