import { navMapData } from "../../constants";
import Logo from "./components/Logo";
import SearchBar from "./components/SearchBar";
import { BsHandbag } from "react-icons/bs";
import { CiUser } from "react-icons/ci";

const Navbar = () => {
  
  return (
    <div className="flex flex-col gap-4 w-full h-full py-2 px-20">
      <div className="flex items-center justify-between w-full">
        <SearchBar />
        <Logo />
        <div className="flex items-center gap-8">
          <CiUser className="h-10 w-6 stroke-[0.6px]" />
          <BsHandbag className="h-10 w-6" />
        </div>
      </div>

      {/* NAVBAR BOTTOM */}
      <div className="flex justify-center items-center gap-5 text-sm">
        {navMapData.map((item, index) => (
          <div
            key={index}
            className="group relative flex items-center gap-5 text-sm cursor-pointer"
          >
            <span className="uppercase">{item.title}</span>

            {/* Bottom border of the container itself */}
            <div className="absolute left-0 bottom-0 h-px w-0 bg-slate-700 transition-all duration-300 group-hover:w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
