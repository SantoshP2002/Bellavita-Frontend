import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { navMapData } from "../../constants";
import HeaderAction from "./components/HeaderAction";
import MobileBar from "./components/MobileBar";
import TopBar from "./components/TopBar";
const Navbar = () => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="w-full sticky bg-white dark:bg-black dark:text-white top-0 z-50">
      <div className="flex items-center">
        <MobileBar />
        <HeaderAction />
      </div>
      <TopBar />
      {/* BOTTOM NAV (Desktop Only) */}
      <div className="hidden md:flex justify-center items-center gap-6 font-medium relative z-50 px-6 py-2">
        {navMapData.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setSelectedOption(item.name)}
            onMouseLeave={() => setSelectedOption(null)}
            className="group/nav relative flex items-center cursor-pointer whitespace-nowrap hover:text-gray-600"
          >
            <span
              className="uppercase cursor-pointer text-xs"
              onClick={() => navigate(`/products?category=${item.value}`)}
            >
              {item.name}
            </span>

            {/* Hover underline */}
            <div className="absolute left-0 bottom-0 h-[1.5px] w-0 bg-gray-300 transition-all duration-300 group-hover/nav:w-full" />

            {/* Dropdown Menu */}
            {selectedOption === item.name && item.options && (
              <div className="absolute left-0 top-full z-50 min-w-[200px] rounded-xl bg-white p-6 flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.12)] animate-dropdown origin-top dark:bg-black dark:text-whit">
                {item.options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      navigate(
                        `/products?category=${item.value}&subCategory=${option.value}`,
                      )
                    }
                    className="relative cursor-pointer whitespace-nowrap text-sm text-gray-700 px-2 py-1 rounded-md transition-all duration-200 hover:text-black dark:hover:text-white dark:text-white hover:translate-x-1 group/option"
                  >
                    {option.name}

                    {/* underline animation */}
                    <span className="absolute left-2 bottom-0 h-[1.5px] w-0 bg-gray-400 transition-all duration-300 group-hover/option:w-[70%]" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
