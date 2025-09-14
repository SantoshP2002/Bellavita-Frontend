import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { useUserStore } from "../../store/user";
import { IoMdClose } from "react-icons/io";

type SidebarProps = {
  className?: string;
  onClose?: () => void;
};

const Sidebar = ({ className, onClose }: SidebarProps) => {
  const { logout } = useUserStore();
  return (
    <aside className={`${className}`}>
      <div className="p-4 text-2xl font-bold border-b border-indigo-600 flex justify-between items-center">
        <span>Admin Panel</span>

        <IoMdClose onClick={onClose} size={20} className="md:hidden"/>
      </div>

      <nav className="p-6 space-y-2">
        <Link
          to="/admin"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600"
        >
          <FaTachometerAlt /> Dashboard
        </Link>
        <Link
          to="users"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600"
        >
          <FaUsers /> Users
        </Link>
        <Link
          to="products"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600"
        >
          <FaBoxOpen /> Products
        </Link>
        <Link
          to="orders"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600"
        >
          <FaShoppingCart /> Orders
        </Link>
        <Button
          content="Logout"
          buttonProps={{
            className:
              "w-full text-white bg-red-500 hover:bg-red-600 py-2 rounded-lg",
            onClick: logout,
          }}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
