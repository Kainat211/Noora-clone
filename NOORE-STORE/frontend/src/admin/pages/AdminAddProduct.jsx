import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminProducts, adminCategories } from "../../data/adminData.js";

const STORAGE_KEY = "noore-admin-products";

export default function AdminAddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: adminCategories[0] || "",
    price: "",
    stock: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("Image 1 MB se choti honi chahiye.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result;

      setForm((prev) => ({
        ...prev,
        image: imageData,
      }));

      setImagePreview(imageData);
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const products = saved ? JSON.parse(saved) : adminProducts;

      const newProduct = {
        id: Date.now(),
        name: form.name.trim(),
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
        image: form.image,
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...products, newProduct])
      );

      alert("Product added successfully!");
      navigate("/admin/products");
    } catch {
      alert(
        "Product save nahi ho saka. Choti image select karke dobara try karein."
      );
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold text-[#292b21]">
        Add Product
      </h1>

      <p className="mt-2 text-gray-500">
        Add a new product to NOORE-STORE.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-sm md:p-8"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Product Name
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter product name"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#8a7652]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#8a7652]"
          >
            {adminCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Price (PKR)
          </label>

          <input
            name="price"
            type="number"
            min="1"
            value={form.price}
            onChange={handleChange}
            required
            placeholder="Enter price"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#8a7652]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Stock Quantity
          </label>

          <input
            name="stock"
            type="number"
            min="0"
            value={form.stock}
            onChange={handleChange}
            required
            placeholder="Enter stock quantity"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#8a7652]"
          />
        </div>

        {/* Image Upload Field */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-[#37392b] file:px-4 file:py-2 file:text-white"
          />

          <p className="mt-2 text-xs text-gray-500">
            JPG, PNG, WEBP — maximum 1 MB.
          </p>

          {imagePreview && (
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium">
                Image Preview
              </p>

              <img
                src={imagePreview}
                alt="Product preview"
                className="h-48 w-48 rounded-xl border border-gray-200 object-cover"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="rounded-lg bg-[#37392b] px-6 py-3 text-white hover:bg-[#555842]"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
