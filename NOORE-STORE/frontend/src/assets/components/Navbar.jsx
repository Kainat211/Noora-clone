
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, UserRound, Heart } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9dfd4] bg-[#faf7f2]">
      {/* Announcement Bar */}
      <div className="bg-[#e8eadf] py-2 text-center text-xs tracking-widest text-[#383d30]">
        WELCOME TO NOORÉ — PREMIUM CLOTHING
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5">
        {/* Logo */}
        <Link
          to="/"
          className="font-serif text-3xl tracking-widest text-[#383d30]"
        >
          NOORÉ
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-6 text-sm md:flex">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Shop</NavLink>
          <NavLink to="/categories">Categories</NavLink>

          {user && <NavLink to="/my-orders">My Orders</NavLink>}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link
            to={user ? "/profile" : "/login"}
            aria-label="Account"
            title="Account"
          >
            <UserRound size={21} />
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            title="Wishlist"
            className="relative flex items-center"
          >
            <Heart size={21} />

            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c5b99e] px-1 text-[10px] text-[#292b21]">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="flex items-center gap-1"
            aria-label="Cart"
            title="Cart"
          >
            <ShoppingBag size={21} />
            <span>{totalItems}</span>
          </Link>

          {/* Login / Logout / Register */}
          {user ? (
            <button
              onClick={logout}
              className="border border-[#a6ad91] bg-[#e8eadf] px-4 py-2 text-sm text-[#383d30] transition duration-300 hover:bg-[#d9decb]"
            >
              Logout
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm text-[#383d30] transition hover:text-[#858b70] hover:underline"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-[#a6ad91] px-4 py-2 text-sm text-[#292b21] transition duration-300 hover:bg-[#c5cbb5]"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
