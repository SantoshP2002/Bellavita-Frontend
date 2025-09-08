const Dashboard = () => {
  return (
    <div className="w-full">
      {/* Top Bar */}

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
    </div>
  );
};

export default Dashboard;
