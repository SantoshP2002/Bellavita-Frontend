import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { useUserStore } from "../../store/user";
import { CiUser } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  return (
    <div className="flex items-center justify-center px-4 py-10 border dark:bg-black">
      <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-[280px_1fr] dark:bg-black dark:text-white shadow-md dark:shadow-white shadow-black">
        {/* ================= LEFT SIDEBAR ================= */}
        <div className="bg-gradient-to-b from-indigo-500 to-purple-300 dark:to-purple-800 p-8 flex flex-col items-center text-center">
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center">
              <CiUser className="w-14 h-14 text-white" />
            </div>
          )}

          <h2 className="mt-4 text-xl font-bold text-white uppercase">
            {user?.firstName} {user?.lastName}
          </h2>

          <p className="text-sm text-white/80 mt-1 tracking-widest">
            {user?.role}
          </p>

          <div className="mt-8 w-full space-y-3">
            <Button
              content="Edit Profile"
              pattern="tertiary"
              buttonProps={{
                onClick: () => navigate("/edit-profile"),
              }}
            />

            <Button
              content="Change Password"
              pattern="secondary"
              buttonProps={{
                onClick: () => navigate("/change-password"),
              }}
            />
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="p-10 flex flex-col justify-between">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-widest dar:text-white mb-1">
                Email Address
              </p>
              <p className="dark:text-blue-500 font-medium break-all">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest dark:text-white mb-1">
                Bio
              </p>
              <p className="dark:text-gray-300 leading-relaxed">
                Welcome to your personal profile space. You can manage your
                account, update your details, or secure your account from here.
              </p>
            </div>
          </div>

          {/* Logout */}
          <div className="pt-10 flex items-center gap-5">
            <Button
              content="Logout"
              pattern="outline"
              className=" bg-black text-white border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 transition-all duration-200 ease-out hover:bg-white hover:text-black hover:shadow-[4px_4px_0_0_#000] dark:bg-white dark:text-black dark:border-white  dark:hover:bg-black dark:hover:text-white dark:hover:shadow-[4px_4px_0_0_#fff]"
              icons={{ right: <MdOutlineLogout size={18} /> }}
              buttonProps={{
                onClick: () => {
                  logout();
                  navigate("/");
                },
              }}
            />
            <Button
              content="BACK"
              pattern="outline"
              className="w-60! bg-white text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out dark:bg-black dark:text-white! dark:border-white dark:shadow-[4px_4px_0_0_#fff]"
              icons={{ left: <IoIosArrowBack size={18} /> }}
              buttonProps={{
                onClick: () => navigate("/"),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
