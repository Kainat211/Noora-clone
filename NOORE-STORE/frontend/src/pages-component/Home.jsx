
import { Link } from "react-router-dom";
import Hero from "../assets/components/Hero.jsx";
import ProductCard from "../assets/components/ProductCard.jsx";
import { products, categories } from "../data/products";

export default function Home() {
  const categoryImages = {
    "Women's Wear": "/womenswear.jpg",
    "Formal Dresses": "/formaldresses.jpg",
    "Embroidered Suits": "/embroidedsuits.jpg",
    Unstitched: "/unstitched.jpg",
    "Casual Dresses": "/casualdresses.jpg",
    "Luxury Pret": "/luxurypret.jpg",
    "Wedding Wear": "/weddingwear.jpg",
    Kurtis: "/kurtis.jpg",
    "Two Piece Suits": "/twopiecesuit.jpg",
  };

  return (
    <>
      <Hero />

      {/* SHOP BY CATEGORY */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
        <div className="mb-8 flex items-center justify-center gap-5">
          <span className="h-px w-10 bg-[#b9a18b]" />

          <h2 className="font-serif text-2xl tracking-[0.16em] sm:text-3xl">
            SHOP BY CATEGORY
          </h2>

          <span className="h-px w-10 bg-[#b9a18b]" />
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {categories.map((category) => {
            const image =
              categoryImages[category.name] || category.image || "";

            return (
              <Link
                key={category.id}
                to={`/categories?name=${encodeURIComponent(category.name)}`}
                className="group overflow-hidden bg-[#f0e8df]"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  {image ? (
                    <img
                      src={image}
                      alt={category.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling.style.display =
                          "flex";
                      }}
                    />
                  ) : null}

                  <div
                    className="absolute inset-0 items-center justify-center bg-[#e8d9ca] text-sm text-gray-600"
                    style={{ display: image ? "none" : "flex" }}
                  >
                    Add {category.name} image
                  </div>
                </div>

                <div className="flex items-center justify-between p-4">
                  <span className="text-sm font-medium uppercase tracking-wider">
                    {category.name}
                  </span>
                  <span>→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* THE MOST LOVED */}
      <section className="mx-auto max-w-7xl px-5 pb-10 md:px-8">
        <div className="mb-8 flex items-center justify-center gap-5">
          <span className="h-px w-10 bg-[#b9a18b]" />

          <h2 className="font-serif text-2xl tracking-[0.16em] sm:text-3xl">
            THE MOST LOVED
          </h2>

          <span className="h-px w-10 bg-[#b9a18b]" />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-9 text-center">
          <Link
            to="/products"
            className="inline-block border border-[#4b4b38] px-8 py-3 text-xs tracking-[0.16em] transition hover:bg-[#c5b99e] hover:text-white"
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </section>

      {/* STORE BENEFITS */}
      <section className="mt-8 grid grid-cols-1 gap-5 bg-[#f1e5df] px-6 py-8 text-center text-xs tracking-[0.16em] sm:grid-cols-3">
        <p>◇ SECURE CHECKOUT</p>
        <p>◇ EASY RETURNS</p>
        <p>◇ MADE WITH CARE</p>
      </section>
    </>
  );
}
