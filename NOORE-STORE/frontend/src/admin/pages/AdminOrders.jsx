
import { useState } from "react";
import { adminOrders } from "../../data/adminData.js";

const STORAGE_KEY = "noore-admin-orders";
const statuses = ["Pending", "Processing", "Delivered", "Cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : adminOrders;
    } catch {
      return adminOrders;
    }
  });

  function updateStatus(id, status) {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status } : order
    );

    setOrders(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold text-[#292b21]">Orders</h1>
      <p className="mt-2 text-gray-500">View orders and update their status.</p>

      <div className="mt-8 overflow-x-auto rounded-2xl bg-white p-5 shadow-sm">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-4">Order ID</th>
              <th className="py-4">Customer</th>
              <th className="py-4">Total</th>
              <th className="py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b last:border-0">
                <td className="py-4">{order.id}</td>
                <td className="py-4">{order.customer}</td>
                <td className="py-4">
                  Rs. {order.total.toLocaleString()}
                </td>
                <td className="py-4">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="rounded-lg border border-gray-200 px-3 py-2"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
