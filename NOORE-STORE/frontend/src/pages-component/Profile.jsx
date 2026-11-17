
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <main className="mx-auto min-h-[65vh] max-w-3xl px-5 py-14">
      <p className="text-xs tracking-[0.3em] text-[#9b6c63]">YOUR ACCOUNT</p>
      <h1 className="mt-3 font-serif text-4xl">My Profile</h1>

      <div className="mt-8 border border-[#e2d6ca] bg-white p-6">
        <p className="text-sm text-[#766c5e]">Full name</p>
        <p className="mt-1 text-lg">{user?.name}</p>

        <p className="mt-5 text-sm text-[#766c5e]">Email address</p>
        <p className="mt-1">{user?.email}</p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/my-orders" className="bg-[#4b4b38] px-5 py-3 text-sm text-white">
            My Orders
          </Link>
          <Link to="/address" className="border border-[#4b4b38] px-5 py-3 text-sm">
            My Address
          </Link>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="border border-[#c8b8aa] px-5 py-3 text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}
