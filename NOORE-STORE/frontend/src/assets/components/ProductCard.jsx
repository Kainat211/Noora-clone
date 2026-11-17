
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [added, setAdded] = useState(false);
  const favorite = isInWishlist(product.id);

  function handleAdd() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="group min-w-0">
      <div className="relative overflow-hidden bg-[#eee5da]">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            favorite ? "Remove from wishlist" : "Add to wishlist"
          }
          title={favorite ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 rounded-full bg-[#faf7f2]/90 p-2 transition hover:scale-110"
        >
          <Heart
            size={19}
            fill={favorite ? "#a77f78" : "none"}
            color={favorite ? "#a77f78" : "#423b2b"}
          />
        </button>

        <button
          type="button"
          onClick={handleAdd}
          className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 bg-[#4b4b38]/95 py-3 text-xs tracking-widest text-white transition hover:bg-[#77745c]"
        >
          <ShoppingBag size={15} />
          {added ? "ADDED TO BAG" : "ADD TO BAG"}
        </button>
      </div>

      <Link to={`/products/${product.id}`} className="block pt-3">
        <h3 className="font-serif text-base text-[#302c23]">
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-[#766c5e]">
          Rs. {Number(product.price).toLocaleString("en-PK")}
        </p>
      </Link>
    </article>
  );
}
