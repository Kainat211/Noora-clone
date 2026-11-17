
import { createContext, useContext, useState } from "react";

const WishlistContext = createContext(null);

function getSavedWishlist() {
  try {
    return JSON.parse(localStorage.getItem("noore-wishlist") || "[]");
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(getSavedWishlist);

  function saveWishlist(updatedWishlist) {
    setWishlist(updatedWishlist);
    localStorage.setItem("noore-wishlist", JSON.stringify(updatedWishlist));
  }

  function isInWishlist(productId) {
    return wishlist.some(
      (item) => String(item.id) === String(productId)
    );
  }

  function toggleWishlist(product) {
    if (isInWishlist(product.id)) {
      saveWishlist(
        wishlist.filter(
          (item) => String(item.id) !== String(product.id)
        )
      );
    } else {
      saveWishlist([...wishlist, product]);
    }
  }

  function removeFromWishlist(productId) {
    saveWishlist(
      wishlist.filter(
        (item) => String(item.id) !== String(productId)
      )
    );
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
}
