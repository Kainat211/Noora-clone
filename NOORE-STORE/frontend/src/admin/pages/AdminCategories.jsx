import { useState } from "react";
import { adminCategories } from "../../data/adminData.js";

const STORAGE_KEY = "noore-admin-categories";

export default function AdminCategories() {
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : adminCategories;
    } catch {
      return adminCategories;
    }
  });

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  function handleImageChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please image file select karein.");
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
      setImage(reader.result);
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  }

  function addCategory(e) {
    e.preventDefault();

    const categoryName = name.trim();

    if (!categoryName) return;

    if (
      categories.some((item) => {
        const existingName =
          typeof item === "string" ? item : item.name;

        return existingName?.toLowerCase() === categoryName.toLowerCase();
      })
    ) {
      alert("Ye category pehle se mojood hai.");
      return;
    }

    if (!image) {
      alert("Please category ki image select karein.");
      return;
    }

    const newCategory = {
      id: Date.now(),
      name: categoryName,
      image: image,
    };

    const updated = [...categories, newCategory];

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setCategories(updated);
      setName("");
      setImage("");
      setImagePreview("");

      alert("Category successfully add ho gayi!");
    } catch {
      alert("Category save nahi hui. Choti image select karke try karein.");
    }
  }

  function deleteCategory(category) {
    const categoryName =
      typeof category === "string" ? category : category.name;

    const updated = categories.filter((item) => item !== category);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setCategories(updated);
    } catch {
      alert(`${categoryName} delete nahi ho saki.`);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold text-[#292b21]">
        Categories
      </h1>

      <p className="mt-2 text-gray-500">
        Create and manage product categories.
      </p>

      <form
        onSubmit={addCategory}
        className="mt-8 max-w-xl space-y-5 rounded-2xl bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Category Name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#8a7652]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Category Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-[#37392b] file:px-4 file:py-2 file:text-white"
          />

          <p className="mt-2 text-xs text-gray-500">
            JPG, PNG ya WEBP select karein. Maximum size 1 MB.
          </p>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Category preview"
              className="mt-4 h-40 w-40 rounded-xl border border-gray-200 object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          className="rounded-lg bg-[#37392b] px-6 py-3 text-white hover:bg-[#555842]"
        >
          Add Category
        </button>
      </form>

      <div className="mt-8 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const categoryName =
            typeof category === "string" ? category : category.name;

          const categoryImage =
            typeof category === "string" ? "" : category.image;

          const categoryId =
            typeof category === "string" ? category : category.id;

          return (
            <div
              key={categoryId}
              className="overflow-hidden rounded-xl bg-white shadow-sm"
            >
              {categoryImage ? (
                <img
                  src={categoryImage}
                  alt={categoryName}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="flex h-48 items-center justify-center bg-[#f0e8df] text-sm text-gray-500">
                  No image available
                </div>
              )}

              <div className="flex items-center justify-between gap-3 p-4">
                <span className="font-medium text-[#292b21]">
                  {categoryName}
                </span>

                <button
                  type="button"
                  onClick={() => deleteCategory(category)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
