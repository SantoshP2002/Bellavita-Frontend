import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import ScrollToTop from "../../components/ScrollToTop";
import MobileBottomNav from "../../components/MobileBottomNav";

const Main = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="grow flex-1">
        <Outlet />
      </main>
      <MobileBottomNav />
      <Footer />
    </div>
  );
};

export default Main;
