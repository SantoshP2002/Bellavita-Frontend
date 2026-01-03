import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { useUserStore } from "../../store/user";
import { CiUser } from "react-icons/ci";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-10 px-4 mx-auto">
      <div
        className="
  max-w-4xl w-full
  min-h-[400px]
  mx-auto
  bg-white
  shadow-2xl overflow-hidden rounded
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
            <Button
              content="Edit Profile"
              pattern="tertiary"
              buttonProps={{
                onClick: () => navigate("/edit-profile"),
              }}
            />

            <Button content="Change Password" pattern="secondary" />

            <Button
              content="Logout"
              pattern="primary"
              className="hover:text-red-600"
              buttonProps={{
                onClick: logout,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
