import { Outlet } from "react-router-dom";

import Sidebar from "../../components/sidebar/Sidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";

const AdminLayout = () => {
  return (
    <div className="flex justify-between gap-4">
      <Sidebar />
      <main className="min-h-dvh flex-1 flex flex-col gap-4 p-4">
        <AdminHeader />
        <section className="w-full grow">
          <Outlet />
        </section>
        <AdminFooter />
      </main>
    </div>
  );
};

export default AdminLayout;
