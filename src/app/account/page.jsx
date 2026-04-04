"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { loginUser, registerUser } from "services/api/account";

export default function AccountPage() {
  const [mode, setMode] = useState("login"); // login or register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await loginUser({ email, password });
      if (!res || !res.status) {
        setError(res?.message || "Login failed");
        setLoading(false);
        return;
      }

      console.log("resss", res, res.token);
      debugger;

      setSuccess("Login successful!");
      console.log("Logged in user:", res.token);

      // Store token if needed
      localStorage.setItem("authToken", res.token);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await registerUser({ firstName, lastName, email, password });
      if (!res || !res.status) {
        setError(res?.message || "Registration failed");
        setLoading(false);
        return;
      }

      setSuccess("Registration successful! You can now log in.");
      setMode("login"); // switch to login after successful register
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <h1 className="font-display text-4xl font-light text-center mb-2">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="font-body text-xs tracking-editorial text-stone text-center mb-10">
            {mode === "login"
              ? "SIGN IN TO YOUR COOMBB ACCOUNT"
              : "JOIN THE INNER CIRCLE"}
          </p>

          <div className="flex mb-8 border border-bone">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-3 font-body text-xs tracking-editorial transition-colors ${
                mode === "login" ? "bg-charcoal text-white" : "text-stone hover:text-charcoal"
              }`}
            >
              SIGN IN
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-3 font-body text-xs tracking-editorial transition-colors ${
                mode === "register" ? "bg-charcoal text-white" : "text-stone hover:text-charcoal"
              }`}
            >
              REGISTER
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {mode === "register" && (
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border border-bone px-4 py-3 font-body text-sm focus:outline-none focus:border-charcoal w-full"
                />
                <input
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border border-bone px-4 py-3 font-body text-sm focus:outline-none focus:border-charcoal w-full"
                />
              </div>
            )}

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-bone px-4 py-3 font-body text-sm focus:outline-none focus:border-charcoal"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-bone px-4 py-3 font-body text-sm focus:outline-none focus:border-charcoal"
            />

            {mode === "login" && (
              <div className="text-right">
                <a href="#" className="font-body text-xs text-stone hover:text-charcoal hover-underline">
                  Forgot password?
                </a>
              </div>
            )}

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <button
              type="button"
              onClick={mode === "login" ? handleLogin : handleRegister}
              className="w-full font-body text-xs tracking-editorial py-4 bg-charcoal text-white hover:bg-charcoal/90 transition-colors mt-2"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "SIGN IN"
                : "CREATE ACCOUNT"}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
}