import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Address() {
  const navigate = useNavigate();

  const [address, setAddress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("noore-address")) || {};
    } catch {
      return {};
    }
  });

  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    try {
      localStorage.setItem("noore-address", JSON.stringify(address));
      setMessage("Address successfully saved!");

      // Address save hone ke baad Checkout page par jayein
      navigate("/checkout");
    } catch {
      setMessage("Address save nahi hua. Dobara try karein.");
    }
  }

  function change(field, value) {
    setAddress((old) => ({
      ...old,
      [field]: value,
    }));
  }

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-5 py-12">
      <h1 className="font-serif text-4xl text-[#292b21]">
        Shipping Address
      </h1>

      <p className="mt-3 text-sm text-[#766c5e]">
        Add your delivery details.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {[
          ["fullName", "Full name"],
          ["phone", "Phone number"],
          ["line", "Address"],
          ["city", "City"],
          ["postalCode", "Postal code"],
          ["country", "Country"],
        ].map(([field, label]) => (
          <label key={field} className="block text-sm text-[#454337]">
            {label}

            <input
              required
              value={address[field] || ""}
              onChange={(e) => change(field, e.target.value)}
              className="mt-2 w-full border border-[#ddd0c2] bg-white px-4 py-3 outline-none focus:border-[#8a7652]"
            />
          </label>
        ))}

        {message && (
          <p className="text-sm text-green-700">{message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-[#4b4b38] py-4 text-xs tracking-widest text-white transition hover:bg-[#62634b]"
        >
          SAVE ADDRESS & CONTINUE
        </button>
      </form>
    </main>
  );
}
