
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <main className="grid min-h-[60vh] place-content-center px-5 text-center">
        <h1 className="font-serif text-4xl">Your bag is waiting</h1>
        <p className="mt-4 text-[#766c5e]">You haven't added any products yet.</p>
        <Link to="/products" className="mt-7 bg-[#4b4b38] px-7 py-4 text-sm text-white">
          EXPLORE PRODUCTS
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-12 md:px-8">
      <h1 className="font-serif text-4xl">Shopping Bag</h1>

      <div className="mt-8 space-y-5">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-4 border-b border-[#e2d6ca] pb-5">
            <img src={item.image} alt={item.name} className="h-36 w-28 object-cover" />

            <div className="flex flex-1 flex-col">
              <Link to={`/products/${item.id}`} className="font-serif text-xl">
                {item.name}
              </Link>
              <p className="mt-2 text-sm text-[#766c5e]">{item.color}</p>
              <p className="mt-2 text-sm">Rs. {item.price.toLocaleString("en-PK")}</p>

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="border px-3 py-1">−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="border px-3 py-1">+</button>
                <button onClick={() => removeFromCart(item.id)} className="ml-2 text-sm text-[#9b6c63] underline">
                  Remove
                </button>
              </div>
            </div>

            <p className="text-sm font-medium">
              Rs. {(item.price * item.quantity).toLocaleString("en-PK")}
            </p>
          </div>
        ))}
      </div>

      <div className="ml-auto mt-8 max-w-sm">
        <div className="flex justify-between text-lg">
          <span>Subtotal</span>
          <span>Rs. {totalPrice.toLocaleString("en-PK")}</span>
        </div>
        <p className="mt-3 text-xs text-[#766c5e]">
          Delivery charges will be confirmed at checkout.
        </p>
        <Link to="/checkout" className="mt-6 block bg-[#4b4b38] px-6 py-4 text-center text-xs tracking-widest text-white">
          PROCEED TO CHECKOUT
        </Link>
      </div>
    </main>
  );
}
