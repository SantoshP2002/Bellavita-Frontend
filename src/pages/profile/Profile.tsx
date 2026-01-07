import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { useUserStore } from "../../store/user";
import { CiUser } from "react-icons/ci";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useUserStore();

  return (
    <div className="flex justify-center items-center bg-gray-50 py-10 px-4 mx-auto">
      <div
        className="
  max-w-xl w-full
  mx-auto
  bg-white
  shadow-2xl overflow-hidden rounded-3xl
"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt="profile"
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            ) : (
              <CiUser className="w-12 h-12" />
            )}

            <div className="text-white">
              <h2 className="text-2xl font-semibold uppercase">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-sm opacity-90">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-14">
          <div>
            <h3 className="text-gray-700 font-semibold mb-1">Email</h3>
            <p className="text-gray-600">{user?.email}</p>
          </div>
          <div>
            <h3 className="text-gray-700 font-semibold mb-1">Bio</h3>
            <p className="text-gray-600">Welcome to profile Page</p>
          </div>

          <div className="flex gap-6">

            {/* EDIT PROFILE BUTTON  */}
            <Button
              content="Edit Profile"
              pattern="tertiary"
              buttonProps={{
                onClick: () => navigate("/edit-profile"),
              }}
            />
            {/* CHANGE PASSWORD BUTTON */}
            <Button
              content="Change Password"
              pattern="secondary"
              buttonProps={{
                onClick: () => navigate("/change-password"),
              }}
            />

            {/* LOGOUT BUTTON  */}
            <Button
              content="LOGOUT"
              pattern="outline"
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
