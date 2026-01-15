import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { MdLocalOffer } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/user";

const MobileBottomNav = () => {
  const { isLoggedIn } = useUserStore();
  return (
    <div className="fixed h-[70px] bottom-0 left-0 right-0 z-50 bg-gray-100 flex justify-around items-center py-2 sm:hidden dark:bg-gray-900">
      <Link
        to="/"
        className="flex flex-col items-center text-xs dark:text-white"
      >
        <AiOutlineHome size={26} className="dark:text-orange-400" />
        Home
      </Link>

      <Link
        to="/products"
        className="flex flex-col items-center text-xs dark:text-white"
      >
        <BsShop size={26} className="dark:text-purple-400" />
        Shop All
      </Link>

      <Link
        to="/crazy-deals-mobile"
        className="flex flex-col items-center text-xs dark:text-white"
      >
        <MdLocalOffer size={26} className="dark:text-yellow-400" />
        Deals
      </Link>

      {isLoggedIn && (
        <Link
          to="/profile"
          className="flex flex-col items-center text-xs dark:text-white"
        >
          <AiOutlineUser size={26} className="dark:text-blue-400" />
          Account
        </Link>
      )}
    </div>
  );
};

export default MobileBottomNav;
