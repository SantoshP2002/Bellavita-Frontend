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

        <div className="flex items-center gap-1 dark:bg-black dark:text-white">
          <Button
            content={<FaBars size={22} />}
            buttonProps={{
              onClick: onMenuClick,
              className: "md:hidden text-gray-700 dark:text-white!",
            }}
          />
          <h1 className="text-sm lg:text-3xl font-bold">Dashboard</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3 sm:p-1 m-2">
          {/* Profile Image / Icon */}
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt="profile"
              className="w-6 h-6 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <CiUser className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-600" />
            </div>
          )}

          <div className="flex flex-col leading-tight">
            <span className="text-[10px] sm:text-xs md:text-lg text-gray-500 dark:text-gray-300">
              Welcome, Admin
            </span>

            <p className="font-semibold uppercase underline text-sm sm:text-md md:text-xl dark:text-white">
              {user?.firstName}
            </p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AdminHeader;
