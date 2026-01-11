import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { MdLocalOffer } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/user";

const MobileBottomNav = () => {
  const { isLoggedIn } = useUserStore();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white flex justify-around items-center py-2 sm:hidden">
      <Link to="/" className="flex flex-col items-center text-xs">
        <AiOutlineHome size={20} className="text-gray-400" />
        Home
      </Link>

      <Link to="/products" className="flex flex-col items-center text-xs">
        <BsShop size={20} />
        Shop All
      </Link>

      <Link
        to="/crazy-deals-mobile"
        className="flex flex-col items-center text-xs"
      >
        <MdLocalOffer size={20} />
        Deals
      </Link>

      {isLoggedIn && (
        <Link to="/profile" className="flex flex-col items-center text-xs">
          <AiOutlineUser size={20} />
          Account
        </Link>
      )}
    </div>
  );
};

export default MobileBottomNav;
