import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { MdLocalOffer } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/user";

const MobileBottomNav = () => {
  const { isLoggedIn } = useUserStore();
  return (
    <div className="fixed h-[80px] bottom-0 left-0 right-0 z-50 bg-white flex justify-around items-center py-2 sm:hidden">
      <Link to="/" className="flex flex-col items-center text-xs">
        <AiOutlineHome size={26} />
        Home
      </Link>

      <Link to="/products" className="flex flex-col items-center text-xs">
        <BsShop size={26} />
        Shop All
      </Link>

      <Link
        to="/crazy-deals-mobile"
        className="flex flex-col items-center text-xs"
      >
        <MdLocalOffer size={26} />
        Deals
      </Link>

      {isLoggedIn && (
        <Link to="/profile" className="flex flex-col items-center text-xs">
          <AiOutlineUser size={26} />
          Account
        </Link>
      )}
    </div>
  );
};

export default MobileBottomNav;
