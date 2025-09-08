import { useState } from "react";
import { BsHandbag } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";
import { navMapData } from "../../constants";
import Logo from "./components/Logo";
import SearchBar from "./components/SearchBar";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "../../store/user";
import { Button } from "../Button";

const Navbar = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isLoggedIn, logout } = useUserStore();

  return (
    <div className="w-full shadow-md bg-white sticky inset-x-0 top-0 z-50">
      {/* TOP NAV */}
      <div className="flex items-center justify-between px-4 md:px-14 py-3">
        {/* Left - Logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger menu only on mobile */}
          <Button
            content={<FiMenu />}
            buttonProps={{
              onClick: () => setIsSidebarOpen(true),
              className: "md:hidden text-2xl text-gray-700",
            }}
          />

          <Logo onClick={() => navigate("/")} />
        </div>

        {/* Search bar (always visible) */}
        <div className="hidden md:block">
          <SearchBar />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 text-gray-700">
          {user?.role === "ADMIN" && (
            <GrUserAdmin
              className="h-6 w-6 md:h-7 md:w-7 cursor-pointer hover:text-indigo-600 transition"
              onClick={() => navigate("/admin")}
            />
          )}
          <div className="w-6 h-6">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt="User"
                className="border-2 border-black w-full h-full rounded-full cursor-pointer"
                // onClick={() => navigate("/profile")}
              />
            ) : (
              <CiUser
                className="h-6 w-6 md:h-7 md:w-7 cursor-pointer hover:text-indigo-600 transition"
                onClick={() => (isLoggedIn ? logout() : navigate("/login"))}
              />
            )}
          </div>

          <BsHandbag
            className="h-6 w-6 md:h-7 md:w-7 cursor-pointer hover:text-indigo-600 transition"
            onClick={() => navigate("/addToCart")}
          />
        </div>
      </div>

      {/* BOTTOM NAV (Desktop Only) */}
      <div className="hidden md:flex justify-center items-center gap-8 text-sm font-medium relative z-50 px-2 md:px-0 py-2">
        {navMapData.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setSelectedOption(item.title)}
            onMouseLeave={() => setSelectedOption(null)}
            className="group/nav relative flex items-center cursor-pointer whitespace-nowrap"
          >
            <span className="uppercase">{item.title}</span>

            {/* Hover underline */}
            <div className="absolute left-0 bottom-0 h-[2px] w-0 bg-indigo-600 transition-all duration-300 group-hover/nav:w-full" />

            {/* Dropdown Menu */}
            {selectedOption === item.title && item.options && (
              <div className="absolute left-0 top-6 bg-white shadow-lg rounded-md p-3 flex flex-col gap-2 z-50 min-w-[150px]">
                {item.options.map((option, index) => (
                  <div
                    key={index}
                    className="relative w-fit whitespace-nowrap cursor-pointer group/option text-gray-700 hover:text-indigo-600"
                  >
                    <span>{option.title}</span>
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-indigo-600 transition-all duration-300 group-hover/option:w-full" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MOBILE SIDEBAR */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-40 z-50"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="bg-white w-64 h-full shadow-lg p-5 flex flex-col gap-6 transform transition-transform duration-300 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="flex justify-between items-center">
              <Logo />

              <Button
                content={<FiX />}
                buttonProps={{
                  onClick: () => setIsSidebarOpen(false),
                  className: "text-2xl text-gray-700",
                }}
              />
            </div>

            {/* Nav Links */}
            <div className="flex flex-col gap-4">
              {navMapData.map((item, index) => {
                const isOpen = selectedOption === item.title;

                return (
                  <div key={index} className="flex flex-col">
                    {/* Parent Title */}
                    <span
                      onClick={() =>
                        setSelectedOption(isOpen ? null : item.title)
                      }
                      className="uppercase font-semibold text-gray-800 cursor-pointer flex justify-between items-center"
                    >
                      {item.title}
                      <span className="text-lg">{isOpen ? "▲" : "▼"}</span>
                    </span>

                    {/* Child Options (Slide Down) */}
                    <AnimatePresence>
                      {isOpen && item.options && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-3 mt-1 flex flex-col gap-2 text-gray-600 overflow-hidden"
                        >
                          {item.options.map((option, idx) => (
                            <span
                              key={idx}
                              className="cursor-pointer hover:text-indigo-600"
                            >
                              {option.title}
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

export default Navbar;
