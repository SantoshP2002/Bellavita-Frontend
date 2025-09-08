
const AdminHeader = () => {
  return (
    <header className="flex justify-between items-center p-4">
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
  );
}

export default AdminHeader