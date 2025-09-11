const AdminFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-600 rounded-xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Left side */}
        <p>© {new Date().getFullYear()} Admin Panel. All rights reserved.</p>

        {/* Center links */}
        <div className="flex gap-4">
          <a href="/privacy" className="hover:text-indigo-600">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-indigo-600">
            Terms
          </a>
          <a href="/help" className="hover:text-indigo-600">
            Help
          </a>
        </div>

        {/* Right side */}
        <span className="text-gray-400">v1.0.0</span>
      </div>
    </footer>
  );
};

export default AdminFooter;
