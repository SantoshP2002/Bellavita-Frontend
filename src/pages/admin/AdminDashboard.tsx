import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaTachometerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 mt-4 rounded">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-black flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-indigo-600">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600"
          >
            <FaTachometerAlt /> Dashboard
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600"
          >
            <FaUsers /> Users
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600"
          >
            <FaBoxOpen /> Products
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600"
          >
            <FaShoppingCart /> Orders
          </Link>
        </nav>
        <div className="p-4 border-t border-indigo-600">
          <Button
            content="Logout"
            buttonProps={{
              className: `w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg"
              }`,
            }}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Top Bar */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-gray-600">Welcome, Admin 👋</span>
            <img
              src="https://via.placeholder.com/40"
              alt="Admin"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl shadow-md bg-orange-300">
            <h2 className="text-gray-500">Users</h2>
            <p className="text-2xl font-bold">120</p>
          </div>
          <div className="p-6 rounded-xl shadow-md bg-yellow-300">
            <h2 className="text-gray-500">Products</h2>
            <p className="text-2xl font-bold">58</p>
          </div>
          <div className="p-6 rounded-xl shadow-md bg-purple-300">
            <h2 className="text-gray-500">Orders</h2>
            <p className="text-2xl font-bold">342</p>
          </div>
        </section>

        {/* Placeholder for more sections */}
        <section className="mt-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-2 text-gray-600">
              <li>🛒 New order from John Doe</li>
              <li>👤 New user registered: Jane Smith</li>
              <li>📦 Product "Perfume X" updated</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
