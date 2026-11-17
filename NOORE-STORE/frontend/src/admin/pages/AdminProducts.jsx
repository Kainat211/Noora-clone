
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminProducts } from "../../data/adminData.js";

const STORAGE_KEY = "noore-admin-products";

export default function AdminProducts() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : adminProducts;
    } catch {
      return adminProducts;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  function deleteProduct(id) {
    const confirmed = window.confirm("Delete this product?");

    if (confirmed) {
      setProducts((current) =>
        current.filter((product) => product.id !== id)
      );
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-[#292b21]">Products</h1>
          <p className="mt-2 text-gray-500">Manage your store products.</p>
        </div>

        <Link
          to="/admin/add-product"
          className="rounded-lg bg-[#37392b] px-5 py-3 text-sm text-white hover:bg-[#555842]"
        >
          + Add Product
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl bg-white p-5 shadow-sm">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-4">Product</th>
              <th className="py-4">Category</th>
              <th className="py-4">Price</th>
              <th className="py-4">Stock</th>
              <th className="py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b last:border-0">
                <td className="py-4 font-medium">{product.name}</td>
                <td className="py-4">{product.category}</td>
                <td className="py-4">
                  Rs. {Number(product.price).toLocaleString()}
                </td>
                <td className="py-4">{product.stock}</td>
                <td className="py-4">
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="py-8 text-center text-gray-500">
            No products found. Add your first product.
          </p>
        )}
      </div>
    </div>
  );
}
