import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import ScrollToTop from "../../components/ScrollToTop";
import MobileBottomNav from "../../components/MobileBottomNav";

const Main = () => {
  return (
    <div className="w-full h-full flex flex-col dark:bg-black dark:text-white">
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
