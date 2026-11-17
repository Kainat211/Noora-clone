
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";

import Navbar from "./assets/components/Navbar.jsx";
import Footer from "./assets/components/Footer.jsx";
import ProtectedRoute from "./assets/components/ProtectedRoute.jsx";

// Storefront pages
import Home from "./pages-component/Home.jsx";
import Products from "./pages-component/Product.jsx";
import ProductDetails from "./pages-component/productinfo.jsx";
import Categories from "./pages-component/Categories.jsx";
import Cart from "./pages-component/Cart.jsx";
import Checkout from "./pages-component/Checkout.jsx";
import Address from "./pages-component/Address.jsx";
import MyOrders from "./pages-component/MyOrders.jsx";
import Login from "./pages-component/Login.jsx";
import Register from "./pages-component/Register.jsx";
import Profile from "./pages-component/Profile.jsx";
import Wishlist from "./pages-component/Wishlist.jsx";
import NotFound from "./pages-component/NotFound.jsx";

// Admin pages
import AdminLogin from "./admin/pages/AdminLogin.jsx";
import AdminDashboard from "./admin/pages/AdminDashboard.jsx";
import AdminProducts from "./admin/pages/AdminProducts.jsx";
import AdminAddProduct from "./admin/pages/AdminAddProduct.jsx";
import AdminCategories from "./admin/pages/AdminCategories.jsx";
import AdminOrders from "./admin/pages/AdminOrders.jsx";
import AdminCustomers from "./admin/pages/AdminCustomers.jsx";
import AdminMessages from "./admin/pages/AdminMessages.jsx";
import AdminSettings from "./admin/pages/AdminSettings.jsx";

// Admin components
import AdminLayout from "./admin/components/AdminLayout.jsx";
import AdminProtectedRoute from "./admin/components/AdminProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />

              <div className="flex-1">
                <Routes>
                  {/* Storefront routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />

                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Protected customer routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/address" element={<Address />} />
                    <Route path="/my-orders" element={<MyOrders />} />
                    <Route path="/profile" element={<Profile />} />
                  </Route>

                  {/* Admin login */}
                  <Route
                    path="/admin/login"
                    element={<AdminLogin />}
                  />

                  {/* Protected admin routes */}
                  <Route element={<AdminProtectedRoute />}>
                    <Route path="/admin" element={<AdminLayout />}>
                      <Route
                        index
                        element={<AdminDashboard />}
                      />

                      <Route
                        path="products"
                        element={<AdminProducts />}
                      />

                      <Route
                        path="add-product"
                        element={<AdminAddProduct />}
                      />

                      <Route
                        path="categories"
                        element={<AdminCategories />}
                      />

                      <Route
                        path="orders"
                        element={<AdminOrders />}
                      />

                      <Route
                        path="customers"
                        element={<AdminCustomers />}
                      />

                      <Route
                        path="messages"
                        element={<AdminMessages />}
                      />

                      <Route
                        path="settings"
                        element={<AdminSettings />}
                      />
                    </Route>
                  </Route>

                  {/* Not found */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>

              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
