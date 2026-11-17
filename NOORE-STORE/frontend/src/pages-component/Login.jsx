import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);

      if (!result.success) {
        setError(result.message || "Login failed. Please try again.");
        return;
      }

      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] px-4 py-12 sm:px-8">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-[#e8ded1] bg-white shadow-xl md:grid-cols-2">
        <section className="flex flex-col justify-center bg-[#f0e8df] p-8 sm:p-12 lg:p-14">
          <p className="font-serif text-3xl font-bold tracking-wide text-[#29291f]">
            NOORE-<span className="text-[#8c735c]">STORE</span>
          </p>

          <p className="mt-2 text-xs tracking-[0.25em] text-[#81715e]">
            YOUR STYLE, OUR PRIORITY
          </p>

          <div className="my-12 border-y border-[#d6c4b1] py-8">
            <p className="font-serif text-4xl leading-tight text-[#4b4b38] sm:text-5xl">
              Welcome
              <br />
              Back.
            </p>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#716456]">
              Your favorite styles are waiting for you. Sign in to explore
              timeless fashion and discover your next look.
            </p>
          </div>

          <p className="font-serif text-xl italic text-[#806b54]">
            Elegance in every detail.
          </p>
        </section>

        <section className="flex items-center justify-center p-7 sm:p-12 lg:p-14">
          <div className="w-full max-w-md">
            <p className="text-xs font-semibold tracking-[0.25em] text-[#9a8065]">
              YOUR ACCOUNT
            </p>

            <h1 className="mt-3 font-serif text-4xl text-[#29291f]">
              Login
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#81796f]">
              Welcome back. Please enter your details.
            </p>

            {error && (
              <p
                role="alert"
                className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="loginEmail"
                  className="mb-2 block text-sm font-medium text-[#454337]"
                >
                  Email Address
                </label>

                <input
                  id="loginEmail"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full border border-[#d9cbbb] bg-[#fffdfa] px-4 py-3.5 text-sm outline-none transition focus:border-[#4b4b38] focus:ring-1 focus:ring-[#4b4b38] disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="loginPassword"
                  className="mb-2 block text-sm font-medium text-[#454337]"
                >
                  Password
                </label>

                <div className="flex border border-[#d9cbbb] bg-[#fffdfa] focus-within:border-[#4b4b38] focus-within:ring-1 focus-within:ring-[#4b4b38]">
                  <input
                    id="loginPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm outline-none disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-3 text-xs text-[#6c604e]"
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#4b4b38] px-5 py-4 text-sm font-semibold tracking-widest text-white transition hover:bg-[#363629] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "PLEASE WAIT..." : "LOGIN"}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-[#766e63]">
              New to NOORE-STORE?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#4b4b38] underline underline-offset-4"
              >
                Create account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}