import { useState } from "react";
import Logo from "./Logo";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { navMapData } from "../../../constants";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

const MobileBar = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white">
      <FiMenu
        onClick={() => setIsSidebarOpen(true)}
        className="size-6 text-gray-700 lg:hidden"
      />

      {isSidebarOpen && (
        <div className="fixed inset-0" onClick={() => setIsSidebarOpen(false)}>
          <div
            className="bg-white w-80 h-full py-5 shadow-lg flex flex-col gap-6 transform transition-transform duration-300 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button and BV logo */}
            <div className="flex justify-between items-center px-5">
              <Logo />

              <FiX
                onClick={() => setIsSidebarOpen(false)}
                className="size-7 text-gray-700"
              />
            </div>

            {/* My ORDER && Track Orders  */}
            <div className="flex justify-center items-center gap-5 px-5 rounded-md">
              {/* My Orders */}
              <Link
                to="/orders"
                className="bg-gray-200 flex justify-center items-center gap-1 cursor-pointer px-3 py-2 rounded"
              >
                <img
                  src="https://bellavitaorganic.com/cdn/shop/files/my-orders.svg?crop=center&height=18&v=1714549660&width=18"
                  alt="My Orders"
                  className="w-3 h-3"
                />
                <span className="text-[10px] font-medium whitespace-nowrap">
                  MY ORDERS
                </span>
              </Link>

              {/* Track Orders */}
              <div className="bg-gray-200 flex justify-center items-center gap-1 cursor-pointer px-3 py-2 rounded">
                <img
                  src="https://bellavitaorganic.com/cdn/shop/files/track-order.svg?crop=center&height=18&v=1729672836&width=18"
                  alt="Track Orders"
                  className="w-3 h-3"
                />
                <span className="text-[10px] font-medium text-gray-800 whitespace-nowrap">
                  TRACK ORDERS
                </span>
              </div>
            </div>

            <img
              src="https://bellavitaorganic.com/cdn/shop/files/zodiac_hamburger_strip.jpg?v=1741862460"
              alt="img"
              className="w-full h-auto block"
            />

            {/* Category part */}
            <div className="flex flex-col gap-4 px-5">
              {navMapData.map((item, index) => {
                const isOpen = selectedOption === item.name;

                return (
                  // Category
                  <div key={index} className="flex flex-col gap-2">
                    {/* Parent Title */}
                    <span
                      onClick={() =>
                        setSelectedOption(isOpen ? null : item.name)
                      }
                      className="uppercase text-gray-800 cursor-pointer flex justify-between items-center"
                    >
                      {item.name}
                      <span className="text-2xl">
                        {/* up and down arrows */}
                        {isOpen ? (
                          <RiArrowDropUpLine />
                        ) : (
                          <RiArrowDropDownLine />
                        )}
                      </span>
                    </span>

                    {/* Child Options (Slide Down) */}
                    <AnimatePresence>
                      {isOpen && item.options && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-3 mt-1 flex flex-col text-sm gap-2 text-gray-600 overflow-hidden"
                        >
                          {item.options.map((option, idx) => (
                            // category Options
                            <span
                              key={idx}
                              onClick={() => {
                                navigate(
                                  `/products?category=${item.value}&subCategory=${option.value}`
                                );
                                setIsSidebarOpen(false);
                              }}
                              className="cursor-pointer"
                            >
                              {option.name}
                            </span>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileBar;
