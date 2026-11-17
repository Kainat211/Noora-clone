
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#e9d9d0] text-[#494034]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 md:grid-cols-4 md:px-10">
        <div>
          <Link to="/" className="font-serif text-3xl tracking-widest">
            NOORÉ
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-[#756558]">
            Thoughtfully designed clothing for your everyday elegance.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-widest">SHOP</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link to="/products">All Products</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/cart">Shopping Bag</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-widest">YOUR ACCOUNT</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/my-orders">My Orders</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-widest">OUR PROMISE</h3>
          <p className="mt-4 text-sm leading-7">
            Secure checkout
            <br />
            Thoughtful craftsmanship
            <br />
            Customer care
          </p>
        </div>
      </div>

      <div className="border-t border-[#cdbab0] px-6 py-5 text-center text-xs tracking-wide">
        © {new Date().getFullYear()} NOORÉ. All rights reserved.
      </div>
    </footer>
  );
}
