import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { navMapData } from "../../constants";
import HeaderAction from "./components/HeaderAction";
import MobileBar from "./components/MobileBar";
import TopBar from "./components/TopBar";
import { AnimatePresence, motion } from "framer-motion";

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
        {navMapData.map((item, index) => {
          // ✅ FIX: yahin define karo
          const firstColumn = item.options?.slice(0, 5) || [];
          const secondColumn = item.options?.slice(5) || [];

          return (
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

              {/* Dropdown */}
              <AnimatePresence>
                {selectedOption === item.name && item.options && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                      scale: 0.96,
                      filter: "blur(6px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                      scale: 0.96,
                      filter: "blur(4px)",
                    }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1], // ultra smooth cubic-bezier
                    }}
                    className="absolute left-0 top-full mt-3 z-50 min-w-[500px] rounded-xl bg-transparent backdrop-blur-md p-6 grid grid-cols-2 gap-6 shadow-xl origin-top dark:bg-transparent dark:text-white"
                  >
                    {/* LEFT COLUMN */}
                    <div className="flex flex-col gap-2 items-start">
                      {firstColumn.map((option, index) => (
                        <div
                          key={index}
                          onClick={() =>
                            navigate(
                              `/products?category=${item.value}&subCategory=${option.value}`,
                            )
                          }
                          className="relative group/option inline-flex items-center px-3 py-1.5 rounded-full overflow-hidden cursor-pointer whitespace-nowrap text-sm text-gray-700 dark:text-white transition-all duration-300 hover:translate-x-1"
                        >
                          {/* Animated Gradient Border */}
                          <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-pink-700 via-purple-700 to-indigo-700 opacity-0 scale-100 group-hover/option:opacity-100 group-hover/option:scale-100 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />

                          {/* Inner Background */}
                          <span className="pointer-events-none absolute inset-[1.5px] rounded-full bg-white dark:bg-black" />

                          {/* Text */}
                          <span className="relative z-10 group-hover/option:text-black dark:group-hover/option:text-white">
                            {option.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    {/* RIGHT COLUMN */}
                    <div className="flex flex-col gap-2 items-start">
                      {secondColumn.map((option, index) => (
                        <div
                          key={index}
                          onClick={() =>
                            navigate(
                              `/products?category=${item.value}&subCategory=${option.value}`,
                            )
                          }
                          className="relative group/option px-3 py-1.5 rounded-full overflow-hidden cursor-pointer whitespace-nowrap text-sm text-gray-700 dark:text-white transition-all duration-300 hover:translate-x-1"
                        >
                          {/* Animated Gradient Border */}
                          <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 scale-90 group-hover/option:opacity-100 group-hover/option:scale-100 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />

                          {/* Inner Background (mask to show only border) */}
                          <span className="pointer-events-none absolute inset-[1.5px] rounded-full bg-gray-100 dark:bg-black" />

                          {/* Text */}
                          <span className="relative z-10 group-hover/option:text-black dark:group-hover/option:text-white">
                            {option.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
