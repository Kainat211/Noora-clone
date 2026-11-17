
import {
  adminProducts,
  adminOrders,
  adminCustomers,
} from "../../data/adminData.js";

const cards = [
  { title: "Total Products", value: adminProducts.length },
  { title: "Total Orders", value: adminOrders.length },
  { title: "Total Customers", value: adminCustomers.length },
  {
    title: "Pending Orders",
    value: adminOrders.filter((order) => order.status === "Pending").length,
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <p className="text-sm text-[#8a7652]">OVERVIEW</p>
      <h1 className="mt-2 text-3xl font-semibold text-[#292b21]">
        Dashboard
      </h1>
      <p className="mt-2 text-gray-500">
        Welcome back! Here is your store overview.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-[#eee8dc] bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-gray-500">{card.title}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#292b21]">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      <section className="mt-8 rounded-2xl border border-[#eee8dc] bg-white p-6">
        <h2 className="text-xl font-semibold text-[#292b21]">
          Recent Orders
        </h2>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="py-3">Order ID</th>
                <th className="py-3">Customer</th>
                <th className="py-3">Total</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {adminOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="py-4">{order.id}</td>
                  <td className="py-4">{order.customer}</td>
                  <td className="py-4">
                    Rs. {order.total.toLocaleString()}
                  </td>
                  <td className="py-4">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
