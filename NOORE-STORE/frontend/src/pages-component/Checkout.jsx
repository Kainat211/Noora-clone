import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [payment, setPayment] = useState("Cash on Delivery");
  const [error, setError] = useState("");

  let savedAddress = {};

  try {
    savedAddress = JSON.parse(
      localStorage.getItem("noore-address") || "{}"
    );
  } catch {
    savedAddress = {};
  }

  function placeOrder(e) {
    e.preventDefault();
    setError("");

    if (!user) {
      navigate("/login");
      return;
    }

    if (!cart.length) {
      setError("Aapka cart empty hai. Pehle products add karein.");
      return;
    }

    if (
      !savedAddress.fullName ||
      !savedAddress.phone ||
      !savedAddress.line ||
      !savedAddress.city ||
      !savedAddress.postalCode ||
      !savedAddress.country
    ) {
      setError("Please save your complete delivery address first.");
      return;
    }

    try {
      const allOrders = JSON.parse(
        localStorage.getItem("noore-orders") || "[]"
      );

      const order = {
        id: Date.now().toString(),
        email: user.email,
        items: cart,
        total: totalPrice,
        payment,
        address: savedAddress,
        status: "Pending",
        date: new Date().toLocaleDateString(),
      };

      localStorage.setItem(
        "noore-orders",
        JSON.stringify([order, ...allOrders])
      );

      clearCart();
      navigate("/my-orders");
    } catch {
      setError("Order save nahi hua. Dobara try karein.");
    }
  }

  if (!cart.length) {
    return (
      <main className="mx-auto min-h-screen max-w-3xl px-5 py-16 text-center">
        <h1 className="font-serif text-3xl text-[#292b21]">
          Your bag is empty
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Checkout karne se pehle products cart mein add karein.
        </p>

        <Link
          to="/products"
          className="mt-6 inline-block bg-[#4b4b38] px-8 py-3 text-sm text-white"
        >
          SHOP NOW
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-12">
      <h1 className="font-serif text-4xl text-[#292b21]">
        Checkout
      </h1>

      {!user && (
        <p className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
          Order place karne ke liye pehle{" "}
          <Link to="/login" className="font-semibold underline">
            Login
          </Link>{" "}
          karein.
        </p>
      )}

      <form onSubmit={placeOrder} className="mt-8 space-y-6">
        <div className="border border-[#e2d6ca] p-5">
          <h2 className="font-serif text-2xl">Order Summary</h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="mt-4 flex justify-between gap-4 text-sm"
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                Rs.{" "}
                {(item.price * item.quantity).toLocaleString("en-PK")}
              </span>
            </div>
          ))}

          <div className="mt-5 flex justify-between border-t pt-4 font-semibold">
            <span>Total</span>
            <span>Rs. {totalPrice.toLocaleString("en-PK")}</span>
          </div>
        </div>

        <div className="border border-[#ddd0c2] p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-serif text-2xl">Delivery Address</h2>

            <Link to="/address" className="text-sm underline">
              Edit Address
            </Link>
          </div>

          {savedAddress.fullName ? (
            <div className="mt-4 space-y-1 text-sm text-[#766c5e]">
              <p>{savedAddress.fullName}</p>
              <p>{savedAddress.phone}</p>
              <p>{savedAddress.line}</p>
              <p>
                {savedAddress.city}, {savedAddress.postalCode}
              </p>
              <p>{savedAddress.country}</p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-red-700">
              Address hasn't been saved yet.
            </p>
          )}

          <Link
            to="/address"
            className="mt-4 inline-block text-sm font-semibold underline"
          >
            {savedAddress.fullName ? "Change Address" : "Add Address"}
          </Link>
        </div>

        <label className="block text-sm">
          Payment Method

          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="mt-2 w-full border border-[#ddd0c2] bg-white px-4 py-3"
          >
            <option>Cash on Delivery</option>
            <option>Bank Transfer</option>
          </select>
        </label>

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-[#4b4b38] py-4 text-xs tracking-widest text-white transition hover:bg-[#62634b]"
        >
          PLACE ORDER
        </button>
      </form>
    </main>
  );
}
