import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { useUserStore } from "../../store/user";
import { CiUser } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useUserStore();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-[280px_1fr]">
        {/* ================= LEFT SIDEBAR ================= */}
        <div className="bg-gradient-to-b from-indigo-500 to-purple-300 p-8 flex flex-col items-center text-center">
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
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                Email Address
              </p>
              <p className="text-gray-800 font-medium break-all">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                Bio
              </p>
              <p className="text-gray-700 leading-relaxed">
                Welcome to your personal profile space. You can manage your
                account, update your details, or secure your account from here.
              </p>
            </div>
          </div>

          {/* Logout */}
          <div className="pt-10">
            <Button
              content="Logout"
              pattern="outline"
              className="bg-black text-white
                           border-gray-300 hover:border-2
                          border-b-2 border-r-2 hover:border-b-4 hover:border-r-4 border-b-gray-500 border-r-gray-500
                          text-xs sm:text-sm
                          py-1 sm:py-2 px-3
                         hover:bg-white hover:text-black! hover:border-black"
              icons={{ right: <MdOutlineLogout size={18} /> }}
              buttonProps={{
                onClick: () => (isLoggedIn ? logout() : navigate("/")),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
