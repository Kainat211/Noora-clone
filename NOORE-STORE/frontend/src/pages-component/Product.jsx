
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories } from "../data/products";
import ProductCard from "../assets/components/ProductCard.jsx";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCategory = searchParams.get("category") || "All";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(urlCategory);
  const [sort, setSort] = useState("default");

  // URL mein category change ho to dropdown bhi update ho
  useEffect(() => {
    setCategory(urlCategory);
  }, [urlCategory]);

  const handleCategoryChange = (value) => {
    setCategory(value);

    if (value === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }

    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category?.toLowerCase() === category.toLowerCase();

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, category, sort]);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-12 md:px-8">
      <div className="text-center">
        <p className="text-xs font-semibold tracking-[0.3em] text-[#9b6c63]">
          NOORÉ COLLECTION
        </p>

        <h1 className="mt-3 font-serif text-4xl text-[#382923] sm:text-5xl">
          {category === "All" ? "Discover Your Style" : category}
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm text-[#766c5e] sm:text-base">
          Explore elegant dresses, beautiful suits and timeless styles
          for every occasion.
        </p>
      </div>

      <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search dresses..."
          className="rounded-lg border border-[#ddd0c2] bg-white px-4 py-3 outline-none focus:border-[#9b6c63]"
        />

        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="rounded-lg border border-[#ddd0c2] bg-white px-4 py-3"
        >
          <option value="All">All Dress Categories</option>

          {categories.map((item) => (
            <option key={item.id || item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-[#ddd0c2] bg-white px-4 py-3"
        >
          <option value="default">Sort: Recommended</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="my-7 flex items-center justify-between gap-3">
        <h2 className="font-serif text-xl text-[#382923]">
          {category === "All" ? "Our Dresses" : `${category} Collection`}
        </h2>

        <p className="text-sm text-[#766c5e]">
          {filteredProducts.length} products found
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <h2 className="font-serif text-2xl text-[#382923]">
            No dresses found
          </h2>

          <p className="mt-2 text-sm text-[#766c5e]">
            Is category mein abhi products nahi hain, ya search match nahi hui.
          </p>

          <button
            onClick={() => {
              setSearch("");
              setSort("default");
              handleCategoryChange("All");
            }}
            className="mt-5 rounded-lg bg-[#9b6c63] px-6 py-3 text-white transition hover:bg-[#80554d]"
          >
            Show All Dresses
          </button>
        </div>
      )}
    </main>
  );
}
