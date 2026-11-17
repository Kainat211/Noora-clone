
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
console.log("Entered email:", JSON.stringify(email));
console.log("Entered password:", JSON.stringify(password));
  function handleLogin(e) {
    e.preventDefault();
 if (
  email.trim().toLowerCase() === "tamia@example.com" &&
  password === "tamia@12345"
)   {
      localStorage.setItem("noore-admin", "true");
      setError("");
      navigate("/admin", { replace: true });
    } else {
      localStorage.removeItem("noore-admin");
      setError("Access Denied! Email ya password ghalat hai.");
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f3ec] flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
      >
        <p className="text-center text-sm tracking-[0.3em] text-[#8a7652]">
          NOORE-STORE
        </p>

        <h1 className="mt-4 text-center text-3xl font-semibold text-[#29271f]">
          Admin Login
        </h1>

        <p className="mt-2 text-center text-sm text-gray-500">
          Sign in to manage your store
        </p>

        <label className="mt-8 block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter admin email"
          required
          className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#8a7652]"
        />

        <label className="mt-5 block text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
          className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#8a7652]"
        />

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-[#37392b] py-3 font-medium text-white transition hover:bg-[#555842]"
        >
          Login to Dashboard
        </button>

        <p className="mt-5 text-center text-xs text-gray-500">
          Demo email: admin@noore.com
          <br />
          Demo password: NooreAdmin123
        </p>
      </form>
    </div>
  );
}
