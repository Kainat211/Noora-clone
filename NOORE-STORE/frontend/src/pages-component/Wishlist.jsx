
import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { useWishlist } from "../context/WishlistContext.jsx";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <main className="min-h-screen bg-[#faf7f2] px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
          <Heart size={28} color="#a77f78" />
          <h1 className="font-serif text-4xl text-[#302c23]">
            My Wishlist
          </h1>
        </div>

        <p className="mt-3 text-sm text-[#766c5e]">
          Your favorite styles, all in one place.
        </p>

        {wishlist.length === 0 ? (
          <div className="mt-10 border border-[#e8ded1] bg-white px-5 py-16 text-center">
            <Heart size={38} color="#a77f78" className="mx-auto mb-4" />

            <h2 className="font-serif text-2xl text-[#302c23]">
              Your wishlist is empty
            </h2>

            <p className="mt-3 text-sm text-[#766c5e]">
              Product picture par heart click karke item save karo.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-block bg-[#4b4b38] px-7 py-3 text-sm text-white hover:bg-[#363629]"
            >
              EXPLORE PRODUCTS
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {wishlist.map((product) => (
              <article key={product.id} className="min-w-0">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-[3/4] w-full bg-[#eee5da] object-cover"
                  />
                </Link>

                <h2 className="mt-3 font-serif text-[#302c23]">
                  {product.name}
                </h2>

                <p className="mt-1 text-sm text-[#766c5e]">
                  Rs. {Number(product.price).toLocaleString("en-PK")}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    to={`/products/${product.id}`}
                    className="bg-[#4b4b38] px-3 py-2 text-xs text-white"
                  >
                    VIEW PRODUCT
                  </Link>

                  <button
                    type="button"
                    onClick={() => removeFromWishlist(product.id)}
                    className="flex items-center gap-1 border border-[#d9cbbb] px-3 py-2 text-xs text-[#6c604e]"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
