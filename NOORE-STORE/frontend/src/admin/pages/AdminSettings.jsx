
import { useState } from "react";

export default function AdminSettings() {
  const [storeName, setStoreName] = useState(
    () => localStorage.getItem("noore-store-name") || "NOORE-STORE"
  );
  const [email, setEmail] = useState(
    () => localStorage.getItem("noore-store-email") || "support@noore.com"
  );
  const [message, setMessage] = useState("");

  function handleSave(e) {
    e.preventDefault();

    localStorage.setItem("noore-store-name", storeName);
    localStorage.setItem("noore-store-email", email);
    setMessage("Settings saved successfully.");
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold text-[#292b21]">Settings</h1>
      <p className="mt-2 text-gray-500">Manage basic store information.</p>

      <form
        onSubmit={handleSave}
        className="mt-8 max-w-xl space-y-5 rounded-2xl bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">Store Name</label>
          <input
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#8a7652]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Contact Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#8a7652]"
          />
        </div>

        <button className="rounded-lg bg-[#37392b] px-6 py-3 text-white">
          Save Settings
        </button>

        {message && <p className="text-sm text-green-700">{message}</p>}
      </form>
    </div>
  );
}
