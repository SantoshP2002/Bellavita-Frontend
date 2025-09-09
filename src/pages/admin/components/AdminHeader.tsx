const AdminHeader = () => {
  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
      <div className="flex items-center gap-3">
        <span className="text-gray-600">Welcome, Admin 👋</span>
        <img
          src="https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-118143566.jpg"
          alt="Admin"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </header>
  );
};

export default AdminHeader;
