"use client";

import { lusitana } from "@/app/ui/fonts";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const formData = new FormData(e.target as HTMLFormElement);
    const enteredEmail = formData.get("email") as string;
    const enteredPassword = formData.get("password") as string;

    if (
      enteredEmail === "shivfun@gmail.com" &&
      enteredPassword === "rootAdmin"
    ) {
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-pastel-text"
        >
          Email
        </label>
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            defaultValue="shivfun@gmail.com"
            readOnly
            className="input-field font-medium"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-pastel-text"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type="password"
            defaultValue="rootAdmin"
            readOnly
            className="input-field font-medium"
            required
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center min-h-11"
        >
          {loading ? (
            <>
              <div className="spinner !w-5 !h-5 !border-2 mr-2" />
              <span>Logging in...</span>
            </>
          ) : (
            "Log In"
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 text-sm px-4 py-2 rounded-lg text-center">
          {error}
        </div>
      )}

      <div className="text-center text-sm text-pastel-text/70">
        <p>Demo Credentials</p>
        <p>Email: shivfun@gmail.com</p>
        <p>Password: rootAdmin</p>
      </div>
    </form>
  );
}
