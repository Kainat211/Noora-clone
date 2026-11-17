
import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtectedRoute() {
  const isAdmin = localStorage.getItem("noore-admin") === "true";

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
