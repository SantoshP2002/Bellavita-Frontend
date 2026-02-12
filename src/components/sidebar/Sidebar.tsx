import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaBlogger,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

import { Button } from "../Button";
import { useUserStore } from "../../store/user";
import { RiNewsLine } from "react-icons/ri";

type SidebarProps = {
  className?: string;
  onClose?: () => void;
};

const Sidebar = ({ className, onClose }: SidebarProps) => {
  const { logout } = useUserStore();

  return (
    <aside className={`dark:bg-black! dark:text-white! ${className}`}>
      <div className="p-4 text-2xl font-bold flex justify-between items-center shadow-md dark:shadow-white shadow-black rounded-xl mb-1">
        <span className="text-black dark:text-white">Admin Panel</span>

        <IoMdClose onClick={onClose} size={20} className="md:hidden" />
      </div>

      <nav className="p-5 space-y-6 text-black dark:bg-black dark:text-white">
        {/* DASHBOARD  */}
        <Link
          to="/admin"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:border-b-4 border-b-2 hover:border-r-4 border-r-2 dark:hover:border-white"
        >
          <FaTachometerAlt /> Dashboard
        </Link>

        {/* USERS  */}
        <Link
          to="users"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:border-b-4 border-b-2 hover:border-r-4 border-r-2 dark:hover:border-white"
        >
          <FaUsers /> Users
        </Link>

        {/* PRODUCTS  */}
        <Link
          to="products"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:border-b-4 border-b-2 hover:border-r-4 border-r-2 dark:hover:border-white"
        >
          <FaBoxOpen /> Products
        </Link>

        {/* ORDERS  */}
        <Link
          to="orders"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:border-b-4 border-b-2 hover:border-r-4 border-r-2 dark:hover:border-white"
        >
          <FaShoppingCart /> Orders
        </Link>

        {/* BLOGS  */}
        <Link
          to="blog"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:border-b-4 border-b-2 hover:border-r-4 border-r-2 dark:hover:border-white"
        >
          <FaBlogger /> Blogs
        </Link>
        {/* NEWSROOM */}
        <Link
          to="newsroom"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:border-b-4 border-b-2 hover:border-r-4 border-r-2 dark:hover:border-white"
        >
          <RiNewsLine /> Newsroom
        </Link>
        <Button
          content="Logout"
          className="mb-6 bg-black text-white border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 transition-all duration-200 ease-out hover:bg-white hover:text-black hover:shadow-[4px_4px_0_0_#000] dark:bg-white dark:text-black dark:border-white  dark:hover:bg-black dark:hover:text-white dark:hover:shadow-[4px_4px_0_0_#fff]"
          buttonProps={{
            onClick: logout,
          }}
        />

        <Link
          to="/"
          className="bg-black rounded-lg text-white border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 transition-all duration-200 ease-out hover:bg-white hover:text-black hover:shadow-[4px_4px_0_0_#000] dark:bg-white dark:text-black dark:border-white  dark:hover:bg-black dark:hover:text-white dark:hover:shadow-[4px_4px_0_0_#fff]"
        >
          Back To Home
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
