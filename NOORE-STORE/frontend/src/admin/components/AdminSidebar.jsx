
import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/admin" },
  { name: "Products", path: "/admin/products" },
  { name: "Add Product", path: "/admin/add-product" },
  { name: "Categories", path: "/admin/categories" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Customers", path: "/admin/customers" },
  { name: "Messages", path: "/admin/messages" },
  { name: "Settings", path: "/admin/settings" },
];

export default function AdminSidebar() {
  return (
    <aside className="min-h-screen w-64 shrink-0 bg-[#292b21] p-6 text-white">
      <h2 className="text-2xl font-semibold tracking-widest">NOORE</h2>
      <p className="mt-1 text-xs tracking-[0.2em] text-[#d1c6a8]">
        ADMIN PANEL
      </p>

      <nav className="mt-10 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/admin"}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 text-sm transition ${
                isActive
                  ? "bg-[#e8dfcb] font-semibold text-[#292b21]"
                  : "text-gray-200 hover:bg-white/10"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
