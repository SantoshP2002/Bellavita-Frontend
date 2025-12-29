import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiTrash2 } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import { useGetUser } from "../../../api/user/service";
import LoadingScreen from "../../../components/LoadingScreen";
import { Button } from "../../../components/Button";

interface User {
  _id: string;
  firstName: string;
  email: string;
  role: string;
  createdAt: string;
}

const Users = () => {
  const { data, isLoading, isError } = useGetUser();
  const [search, setSearch] = useState("");

  const users: User[] = data?.user ? [data.user] : [];

  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <LoadingScreen />;
  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load users 😞
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold text-gray-800">👥 User Management</h1>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <CiSearch className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Joined</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{user.firstName}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.role === "Admin"
                          ? "bg-green-100 text-green-700"
                          : user.role === "Moderator"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-3">
                      <Button
                        content={<GoPencil size={16} />}
                        buttonProps={{
                          title: "Edit User",
                          onClick: () => {
                            console.log("Edit clicked");
                          },
                        }}
                        pattern="outline"
                        className="!w-9 !h-9 flex items-center justify-center rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
                      />

                      <Button
                        content={<FiTrash2 size={16} />}
                        buttonProps={{
                          title: "Delete User",
                          onClick: () => {
                            console.log("Delete clicked");
                          },
                        }}
                        pattern="outline"
                        className="!w-9 !h-9 flex items-center justify-center rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-6 text-center text-gray-500 italic"
                >
                  No users found 😔
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
