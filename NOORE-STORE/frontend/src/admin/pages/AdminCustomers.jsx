
import { adminCustomers } from "../../data/adminData.js";

export default function AdminCustomers() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-[#292b21]">Customers</h1>
      <p className="mt-2 text-gray-500">View your store's customer list.</p>

      <div className="mt-8 overflow-x-auto rounded-2xl bg-white p-5 shadow-sm">
        <table className="w-full min-w-[500px] text-left text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-4">ID</th>
              <th className="py-4">Customer Name</th>
              <th className="py-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {adminCustomers.map((customer) => (
              <tr key={customer.id} className="border-b last:border-0">
                <td className="py-4">{customer.id}</td>
                <td className="py-4">{customer.name}</td>
                <td className="py-4">{customer.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
