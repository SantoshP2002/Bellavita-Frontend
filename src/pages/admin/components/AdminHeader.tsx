import { FaBars } from "react-icons/fa";
import { Button } from "../../../components/Button";

type AdminHeadersProps = {
  onMenuClick?: () => void;
};

const AdminHeader = ({ onMenuClick }: AdminHeadersProps) => {
  return (
    <div className="dark:bg-black dark:text-white">
      <header className="flex justify-between items-center p-4 border-b-2 rounded-lg">
        {/* Left Section */}

        <div className="flex items-center gap-3 dark:bg-black dark:text-white">
          <Button
            content={<FaBars size={22} />}
            buttonProps={{
              onClick: onMenuClick,
              className: "md:hidden text-gray-700 dark:text-white!",
            }}
          />
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <span className="text-gray-600 hidden sm:block">
            Welcome, Admin 👋
          </span>
          <img
            src="https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-118143566.jpg"
            alt="Admin"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </header>
    </div>
  );
};

export default AdminHeader;
