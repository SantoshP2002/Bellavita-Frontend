import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import ScrollToTop from "../../components/ScrollToTop";

const Main = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="grow flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
