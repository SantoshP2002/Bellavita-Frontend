import { useState } from "react";
import { Link } from "react-router-dom";
import { PiUserLight } from "react-icons/pi";
import { CiDeliveryTruck } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";
import { navMapData } from "../../constants";
import Logo from "./components/Logo";
import { FiMenu, FiX } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "../../store/user";
import { Button } from "../Button";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { GoSearch } from "react-icons/go";
import SearchModal from "../modal/children/SearchModal";
import Modal from "../modal";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isLoggedIn, logout } = useUserStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="w-full shadow sticky inset-x-0 bg-white top-0 z-50">
      <div className="max-w-6xl mx-auto">
        {/* TOP NAV */}
        <div className="flex items-center justify-between px-4 md:px-10">
          {/* Left - Logo */}
          <Button
            content={<FiMenu />}
            buttonProps={{
              onClick: () => setIsSidebarOpen(true),
              className: "!w-fit md:hidden text-2xl text-gray-700",
            }}
          />
          {/* BELLAVITA LOGO  */}
          <Logo onClick={() => navigate("/")} />

          {/* ADMIN Icons */}
          <div className="flex items-center gap-4 md:gap-6 text-gray-700">
            {/* Search Icon  */}
            <GoSearch
              onClick={() => setIsSearchOpen(true)}
              className="h-4 w-4 md:h-7 md:w-7 cursor-pointer transition-colors duration-200 hover:text-indigo-600"
            />
            {/* Search Modal With Logic  */}
            {isSearchOpen && (
              <Modal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                heading="Search Products"
              >
                <SearchModal onClose={() => setIsSearchOpen(false)} />
              </Modal>
            )}

            {user?.role === "ADMIN" && (
              <Link to="/admin">
                <GrUserAdmin className="h-4 w-4 md:h-7 md:w-7 [&>path]:stroke-[1.2]" />
              </Link>
            )}

            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt="User"
                className="border-2 border-black h-6 w-6 md:h-7 md:w-7 rounded-full cursor-pointer"
                onClick={() => (isLoggedIn ? logout() : navigate("/login"))}
              />
            ) : (
              <PiUserLight
                className="h-4 w-4 md:h-7 md:w-7 cursor-pointer transition-colors duration-200 hover:text-indigo-600"
                onClick={() => (isLoggedIn ? logout() : navigate("/login"))}
              />
            )}
            {/* Cart Bag  */}
            <IoCartOutline
              className="h-4 w-4 md:h-7 md:w-7 cursor-pointer transition-colors duration-200 hover:text-indigo-600"
              onClick={() => navigate("/cart")}
            />
            {/* Orders icon  */}
            <CiDeliveryTruck
              onClick={() => navigate("/orders")}
              className="h-4 w-4 md:h-7 md:w-7 cursor-pointer transition-colors duration-200 hover:text-indigo-600"
            />

            {isLoggedIn && (
              <div>
                {/* My Profile icon  */}
                <CgProfile
                  onClick={() => navigate("/profile")}
                  className="h-4 w-4 md:h-7 md:w-7 cursor-pointer transition-colors duration-200 hover:text-indigo-600"
                />
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM NAV (Desktop Only) */}
        <div className="hidden md:flex justify-center items-center gap-6 font-medium relative z-50 px-2 md:px-0 py-1">
          {navMapData.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setSelectedOption(item.name)}
              onMouseLeave={() => setSelectedOption(null)}
              className="group/nav relative flex items-center cursor-pointer whitespace-nowrap hover:text-gray-600"
            >
              <span
                className="uppercase cursor-pointer text-sm"
                onClick={() => navigate(`/products?category=${item.value}`)}
              >
                {item.name}
              </span>

              {/* Hover underline */}
              <div className="absolute left-0 bottom-0 h-[1.5px] w-0 bg-gray-300 transition-all duration-300 group-hover/nav:w-full" />

              {/* Dropdown Menu */}
              {selectedOption === item.name && item.options && (
                <div className="absolute left-0 top-6 bg-white rounded-md p-7 flex flex-col gap-2 z-50 min-w-[200px]">
                  {item.options.map((option, index) => (
                    <div
                      key={index}
                      className="relative w-fit whitespace-nowrap cursor-pointer group/option text-black hover:text-gray-600 text-sm"
                      onClick={() => {
                        navigate(
                          `/products?category=${item.value}&subCategory=${option.value}`
                        );
                      }}
                    >
                      <span>{option.name}</span>
                      <span className="absolute left-0 bottom-0 h-[1.5px] w-0 bg-gray-300 transition-all duration-300 group-hover/option:w-full" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
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
                  className: "!w-fit text-2xl text-gray-700",
                }}
              />
            </div>

            {/* My ORDER && Track Orders  */}
            <div className="flex justify-center items-center gap-5 p-1 rounded-md">
              {/* My Orders */}
              <div
                onClick={() => navigate("/orders")}
                className="bg-gray-200 flex justify-center items-center gap-1 cursor-pointer px-3 py-2 rounded"
              >
                <img
                  src="https://bellavitaorganic.com/cdn/shop/files/my-orders.svg?crop=center&height=18&v=1714549660&width=18"
                  alt="My Orders"
                  className="w-[12px] h-[12px]"
                />
                <span className="text-[10px] font-medium whitespace-nowrap">
                  MY ORDERS
                </span>
              </div>

              {/* Track Orders */}
              <div className="bg-gray-200 flex justify-center items-center gap-1 cursor-pointer px-3 py-2 rounded">
                <img
                  src="https://bellavitaorganic.com/cdn/shop/files/track-order.svg?crop=center&height=18&v=1729672836&width=18"
                  alt="Track Orders"
                  className="w-[12px] h-[12px]"
                />
                <span className="text-[10px] font-medium text-gray-800 whitespace-nowrap">
                  TRACK ORDERS
                </span>
              </div>
            </div>

            <div className="-mx-5 md:-mx-12">
              <img
                src="https://bellavitaorganic.com/cdn/shop/files/zodiac_hamburger_strip.jpg?v=1741862460"
                alt="img"
                className="w-full h-auto block"
              />
            </div>

            {/* Nav Links */}
            <div className="flex flex-col gap-4">
              {navMapData.map((item, index) => {
                const isOpen = selectedOption === item.name;

                return (
                  <div key={index} className="flex flex-col">
                    {/* Parent Title */}
                    <span
                      onClick={() =>
                        setSelectedOption(isOpen ? null : item.name)
                      }
                      className="uppercase text-gray-800 cursor-pointer flex justify-between items-center"
                    >
                      {item.name}
                      <span className="text-lg">
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
                            <span
                              key={idx}
                              onClick={() => {
                                navigate(
                                  `/products?category=${item.value}&subCategory=${option.value}`
                                );
                                setIsSidebarOpen(false);
                              }}
                              className="cursor-pointer hover:text-indigo-600"
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

export default Navbar;
