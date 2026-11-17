
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar.jsx";
import AdminNavbar from "./AdminNavbar.jsx";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#f7f5ef] md:flex">
      <AdminSidebar />

      <div className="min-w-0 flex-1">
        <AdminNavbar />

        <main className="p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
