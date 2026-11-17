
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  if (!product) {
    return <div className="p-16 text-center">Product not found.</div>;
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-2 md:px-8">
      <img
        src={product.image}
        alt={product.name}
        className="max-h-[700px] w-full object-cover"
      />

      <div className="self-center">
        <Link to="/products" className="text-sm text-[#9b6c63]">
          ← Back to collection
        </Link>

        <p className="mt-8 text-xs tracking-[0.25em] text-[#9b6c63]">
          {product.category.toUpperCase()}
        </p>

        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{product.name}</h1>

        <p className="mt-5 text-xl">
          Rs. {product.price.toLocaleString("en-PK")}
        </p>

        <p className="mt-6 leading-7 text-[#766c5e]">
          {product.description}
        </p>

        <p className="mt-4 text-sm">Colour: {product.color}</p>

        <button
          onClick={() => {
            addToCart(product);
            setAdded(true);
          }}
          className="mt-8 w-full bg-[#4b4b38] px-6 py-4 text-xs tracking-[0.2em] text-white hover:bg-[#77745c]"
        >
          {added ? "ADDED TO BAG ✓" : "ADD TO BAG"}
        </button>

        <p className="mt-5 text-sm leading-6 text-[#766c5e]">
          Thoughtfully designed. Carefully selected for your wardrobe.
        </p>
      </div>
    </main>
  );
}
