import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MyOrders() {
  const { user } = useAuth();

  let allOrders = [];

  try {
    allOrders = JSON.parse(
      localStorage.getItem("noore-orders") || "[]"
    );
  } catch {
    allOrders = [];
  }

  const orders = allOrders.filter(
    (order) => order.email === user?.email
  );

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-12 md:px-8">
      <h1 className="font-serif text-4xl text-[#292b21]">
        My Orders
      </h1>

      <p className="mt-3 text-sm text-[#766c5e]">
        View your order details and delivery information.
      </p>

      {!user ? (
        <div className="py-16 text-center">
          <p>Please log in to view your orders.</p>

          <Link
            to="/login"
            className="mt-5 inline-block bg-[#4b4b38] px-6 py-3 text-white"
          >
            Login
          </Link>
        </div>
      ) : !orders.length ? (
        <div className="py-16 text-center">
          <p className="text-[#766c5e]">
            You haven't placed any orders yet.
          </p>

          <Link
            to="/products"
            className="mt-5 inline-block underline"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-xl border border-[#e2d6ca] bg-white p-5 md:p-7"
            >
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <p className="text-xs text-[#766c5e]">
                    ORDER NUMBER
                  </p>

                  <h2 className="mt-1 font-medium">
                    #{order.id}
                  </h2>
                </div>

                <span className="h-fit rounded-md bg-[#eee9dc] px-3 py-2 text-xs">
                  {order.status || "Pending"}
                </span>
              </div>

              <p className="mt-3 text-sm text-[#766c5e]">
                Order Date: {order.date || "Not available"}
              </p>

              <div className="mt-6">
                <h3 className="font-serif text-xl">
                  Ordered Products
                </h3>

                <div className="mt-4 space-y-4">
                  {(order.items || []).map((item, index) => (
                    <div
                      key={item.id ?? index}
                      className="flex items-center gap-4 border-b border-[#eee7df] pb-4"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-16 rounded-md object-cover"
                        />
                      ) : (
                        <div className="flex h-20 w-16 items-center justify-center bg-[#f0e8df] text-xs">
                          No image
                        </div>
                      )}

                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-[#766c5e]">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="text-sm">
                        Rs.{" "}
                        {(
                          Number(item.price || 0) *
                          Number(item.quantity || 0)
                        ).toLocaleString("en-PK")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-[#faf7f2] p-4">
                <h3 className="font-serif text-xl">
                  Delivery Address
                </h3>

                {order.address ? (
                  <div className="mt-3 space-y-1 text-sm text-[#766c5e]">
                    <p>{order.address.fullName}</p>
                    <p>{order.address.phone}</p>
                    <p>{order.address.line}</p>
                    <p>
                      {order.address.city}
                      {order.address.postalCode
                        ? `, ${order.address.postalCode}`
                        : ""}
                    </p>
                    <p>{order.address.country}</p>
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-[#766c5e]">
                    Delivery address is unavailable.
                  </p>
                )}
              </div>

              <div className="mt-5 border-t border-[#e2d6ca] pt-4 text-sm">
                <p>
                  Payment Method: {order.payment || "Not specified"}
                </p>

                <p className="mt-3 flex justify-between font-semibold">
                  <span>Total Amount</span>

                  <span>
                    Rs.{" "}
                    {Number(order.total || 0).toLocaleString("en-PK")}
                  </span>
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
