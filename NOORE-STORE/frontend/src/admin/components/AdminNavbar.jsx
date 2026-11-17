
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("noore-admin");
    navigate("/admin/login", { replace: true });
  }

  return (
    <header className="flex items-center justify-between border-b border-[#e9e4d9] bg-white px-5 py-4 md:px-8">
      <div>
        <h2 className="font-semibold text-[#292b21]">Store Administration</h2>
        <p className="mt-1 text-xs text-gray-500">Manage your NOORE store</p>
      </div>

      <button
        onClick={handleLogout}
        className="rounded-lg border border-[#d8cfbc] px-4 py-2 text-sm text-[#292b21] transition hover:bg-[#f4efe5]"
      >
        Logout
      </button>
    </header>
  );
}
