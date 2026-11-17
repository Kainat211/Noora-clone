
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[470px] overflow-hidden bg-[#e8d8c6] md:min-h-[540px]">
      <img
        src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1800&q=85"
        alt="Premium traditional clothing collection"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f0e2d1] via-[#f0e2d1]/85 to-transparent" />

      <div className="mx-auto flex min-h-[470px] max-w-7xl items-center px-6 py-16 md:min-h-[540px] md:px-12">
        <div className="max-w-xl">
          <p className="mb-5 text-xs font-medium tracking-[0.3em] text-[#6e5a46]">
            PREMIUM CLOTHING BRAND
          </p>

          <h1 className="font-serif text-5xl leading-[1.08] tracking-tight text-[#30291e] sm:text-6xl md:text-7xl">
            Elegance, woven into every day.
          </h1>

          <p className="mt-6 max-w-sm text-base leading-7 text-[#6e6254]">
            Timeless silhouettes. Thoughtful details.
            Made for your moments.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center bg-[#a6ad91] px-7 py-4 text-xs font-semibold tracking-[0.18em] text-white transition hover:bg-[#c5b99e]"
          >
            EXPLORE THE COLLECTION →
          </Link>
        </div>
      </div>
    </section>
  );
}
