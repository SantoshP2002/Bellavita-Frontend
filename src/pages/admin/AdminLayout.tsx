import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import { useState } from "react";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        onClose={() => setIsOpen(false)}
        className={`
        fixed inset-y-0 left-0 w-64 border-r bg-white rounded-lg my-2 border-gray-200 transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out z-50
          md:translate-x-0 md:relative md:z-auto
        `}
      />

      {/* Main Content */}
      <main className="min-h-dvh flex-1 flex flex-col gap-4 p-4 bg-gray-200 rounded-xl m-2">
        {/* Header */}
        <AdminHeader onMenuClick={() => setIsOpen(!isOpen)} />

        {/* Content */}
        <section className="w-full grow">
          <Outlet />
        </section>

        {/* Footer */}
        <AdminFooter />
      </main>
    </div>
  );
};

export default AdminLayout;
