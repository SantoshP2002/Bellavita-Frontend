import { useEffect, useState } from "react";
import { useGetUserCart } from "../../../api/cart/service";
import { useUserStore } from "../../../store/user";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import Modal from "../../modal";
import SearchModal from "../../modal/children/SearchModal";
import { Link } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";
import { PiUserLight } from "react-icons/pi";
import { IoCloudyNightSharp } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { RiAccountBox2Line } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { BsCartFill } from "react-icons/bs";

type TTheme = "light" | "dark";
const activeTheme = (localStorage.getItem("theme") || "light") as TTheme;

const HeaderAction = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState<TTheme>(activeTheme);

  const { user, isLoggedIn, logout } = useUserStore();

  const { data: cart } = useGetUserCart();
  const cartCount = cart?.cart?.products?.length || 0;
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <>
      {isSearchOpen && (
        <Modal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          heading="Search Products"
          className="lg:min-w-xl bg-white shadow-md shadow-blue-200 dark:bg-black dark:text-white"
        >
          <SearchModal onClose={() => setIsSearchOpen(false)} />
        </Modal>
      )}
      <div className="flex-1 flex items-center justify-between dark:text-white">
        <Logo />
        <div className="flex items-center gap-5 text-gray-700 px-8">
          {/* DARK MODE BUTTON  */}
          <button
            className="mx-auto my-3 flex items-center justify-center rounded-full border-t border-l shadow border-4 border-gray-800 dark:border-gray-300 cursor-pointer px-2 py-2 "
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <TiWeatherPartlySunny className="dark:text-white" />
            ) : (
              <IoCloudyNightSharp className="text-black" />
            )}
          </button>
          {/* SEARCH ICON  */}
          <GoSearch
            onClick={() => setIsSearchOpen(true)}
            className="h-6 w-6 md:h-7 md:w-7 cursor-pointer transition-colors duration-200 dark:text-white"
          />

          {user?.role === "ADMIN" && (
            <Link to="/admin">
              <GrUserAdmin className="h-4 w-4 md:h-7 md:w-7 [&>path]:stroke-[1.2] dark:text-white" />
            </Link>
          )}

          {user?.profilePic ? (
            <img
              src={user?.profilePic}
              alt="User"
              className="border-2 border-black dark:border-white h-6 w-6 md:h-7 md:w-7 rounded-full cursor-pointer"
              onClick={() => (isLoggedIn ? logout() : navigate("/login"))}
            />
          ) : (
            <div className="relative inline-block group">
              <PiUserLight
                className="h-4 w-4 md:h-7 md:w-7 cursor-pointer transition-colors duration-200 hover:text-indigo-600"
                onClick={() => (isLoggedIn ? logout() : navigate("/login"))}
              />

              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">
                {isLoggedIn ? "Logout" : "Login"}
              </span>
            </div>
          )}

          <div className="relative">
            <BsCartFill
              className="cursor-pointer transition-colors duration-200 dark:text-white h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
              onClick={() => navigate("/cart")}
            />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-300 dark:bg-white text-black font-bold rounded-2xl flex items-center justify-center h-4 w-4 text-[10px] sm:h-4.5 sm:w-4.5 sm:text-[11px] md:h-5 md:w-5 md:text-xs">
                {cartCount}
              </span>
            )}
          </div>

          <CiDeliveryTruck
            onClick={() => navigate("/orders")}
            className="h-6 w-6 md:h-7 md:w-7 cursor-pointer transition-colors duration-200 dark:text-white"
          />
          <RiAccountBox2Line
            onClick={() => navigate("/profile")}
            className="hidden md:block h-4 w-4 md:h-7 md:w-7 cursor-pointer transition-colors duration-200 dark:text-white"
          />
        </div>
      </div>
    </>
  );
};

export default HeaderAction;
