import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

const Main = () => {

  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <main className="grow flex-1 px-4 md:px-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
