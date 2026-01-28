import { FaBars } from "react-icons/fa";
import { Button } from "../../../components/Button";
import { useUserStore } from "../../../store/user";
import { CiUser } from "react-icons/ci";

type AdminHeadersProps = {
  onMenuClick?: () => void;
};

const AdminHeader = ({ onMenuClick }: AdminHeadersProps) => {
  const { user } = useUserStore();

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
          {/* Profile Image / Icon */}
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <CiUser className="w-6 h-6 text-gray-600" />
            </div>
          )}

          {/* Text Section */}
          <div className="flex flex-col leading-tight">
            <span className="dark:text-gray-200 hidden sm:block">
              Welcome, Admin 👋
            </span>
            <p className="font-semibold text-xl underline uppercase dark:text-white transform transform-3d">
              {user?.firstName}
            </p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AdminHeader;
