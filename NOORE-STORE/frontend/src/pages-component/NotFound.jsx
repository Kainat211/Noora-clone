
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="grid min-h-[65vh] place-content-center px-5 text-center">
      <p className="text-sm tracking-[0.3em] text-[#9b6c63]">404</p>
      <h1 className="mt-3 font-serif text-4xl">Page not found</h1>
      <p className="mt-4 text-[#766c5e]">This page doesn't exist.</p>
      <Link to="/" className="mt-7 inline-block bg-[#4b4b38] px-7 py-4 text-sm text-white">
        BACK TO HOME
      </Link>
    </main>
  );
}
