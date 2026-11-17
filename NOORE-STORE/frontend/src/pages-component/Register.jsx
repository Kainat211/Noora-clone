import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 8) {
      setError("Password kam az kam 8 characters ka hona chahiye.");
      return;
    }

    setLoading(true);

    try {
      const result = await register(name, email, password);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setSuccess(
        result.message ||
          "Registration successful! Please verify your email."
      );

      setName("");
      setEmail("");
      setPassword("");
    } catch {
      setError("Registration nahi ho saki. Dobara try karein.");
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
              Discover
              <br />
              Your Style.
            </p>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#716456]">
              Create your NOORÉ account to explore timeless fashion and enjoy
              a personalized shopping experience.
            </p>
          </div>

          <p className="font-serif text-xl italic text-[#806b54]">
            Elegance in every detail.
          </p>
        </section>

        <section className="flex items-center justify-center p-7 sm:p-12 lg:p-14">
          <div className="w-full max-w-md">
            <p className="text-xs font-semibold tracking-[0.25em] text-[#9a8065]">
              JOIN NOORÉ
            </p>

            <h1 className="mt-3 font-serif text-4xl text-[#29291f]">
              Create Account
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#81796f]">
              Enter your details to get started.
            </p>

            {error && (
              <p
                role="alert"
                className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {success && (
              <div
                role="status"
                className="mt-5 rounded-lg bg-green-50 p-4 text-sm leading-6 text-green-800"
              >
                <p className="font-semibold">
                  Registration successful!
                </p>

                <p className="mt-1">
                  {success}
                </p>

                <p className="mt-2">
                  Please open your Mailtrap inbox and click the Verify Email
                  button to activate your account.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="mt-4 font-semibold underline underline-offset-4"
                >
                  Go to Login
                </button>
              </div>
            )}

            {!success && (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="registerName"
                    className="mb-2 block text-sm font-medium text-[#454337]"
                  >
                    Full Name
                  </label>

                  <input
                    id="registerName"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-[#d9cbbb] bg-[#fffdfa] px-4 py-3.5 text-sm outline-none transition focus:border-[#4b4b38] focus:ring-1 focus:ring-[#4b4b38]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="registerEmail"
                    className="mb-2 block text-sm font-medium text-[#454337]"
                  >
                    Email Address
                  </label>

                  <input
                    id="registerEmail"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-[#d9cbbb] bg-[#fffdfa] px-4 py-3.5 text-sm outline-none transition focus:border-[#4b4b38] focus:ring-1 focus:ring-[#4b4b38]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="registerPassword"
                    className="mb-2 block text-sm font-medium text-[#454337]"
                  >
                    Password
                  </label>

                  <div className="flex border border-[#d9cbbb] bg-[#fffdfa] focus-within:border-[#4b4b38] focus-within:ring-1 focus-within:ring-[#4b4b38]">
                    <input
                      id="registerPassword"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="At least 8 characters"
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm outline-none"
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
                  className="w-full bg-[#a6ad91] px-5 py-4 text-sm font-semibold tracking-widest text-[#292b21] transition hover:bg-[#c5cbb5] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                </button>
              </form>
            )}

            <p className="mt-7 text-center text-sm text-[#766e63]">
              Already registered?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#4b4b38] underline underline-offset-4"
              >
                Login
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}