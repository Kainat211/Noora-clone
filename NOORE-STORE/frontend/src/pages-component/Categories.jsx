
import { Link, useSearchParams } from "react-router-dom";
import { categories } from "../data/products";

export default function Categories() {
  const [params] = useSearchParams();

  const categoryImages = {
    "Women's Wear": "/womenswear.jpg",
    "Formal Dresses": "/formaldresses.jpg",
    "Embroidered Suits": "/embroidedsuits.jpg",
    "Unstitched": "/unstitched.jpg",
    "Casual Dresses": "/casualdresses.jpg",
    "Luxury Pret": "/luxurypret.jpg",
    "Wedding Wear": "/weddingwear.jpg",
    "Kurtis": "/kurtis.jpg",
    "Two Piece Suits": "/twopiecesuit.jpg",
  };

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-12 md:px-8">
      <div className="text-center">
        <p className="text-xs font-semibold tracking-[0.3em] text-emerald-700">
          EXPLORE NOORÉ
        </p>

        <h1 className="mt-3 font-serif text-4xl font-bold text-slate-900 sm:text-5xl">
          Our Categories
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm text-slate-500 sm:text-base">
          Discover your favorites and explore our latest collections.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => {
          const image =
            categoryImages[category.name] || category.image || "";

          return (
            <Link
              key={category.id || category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group overflow-hidden rounded-2xl bg-[#faf5f2] transition duration-300 hover:-translate-y-1"
            >
              <div className="overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt={category.name}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-[#f0e6df] text-sm text-slate-500">
                    Image not added
                  </div>
                )}
              </div>

              <div className="p-5">
                <h2 className="font-serif text-xl font-semibold text-slate-900">
                  {category.name}
                </h2>

                <p className="mt-2 text-sm font-medium text-emerald-800">
                  Explore collection →
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {params.get("name") && (
        <p className="mt-8 text-center text-sm text-[#766c5e]">
          Selected category: {params.get("name")}
        </p>
      )}
    </main>
  );
}
