import LoginForm from "@/app/ui/login-form";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-pastel-background">
      <div className="relative w-full max-w-[400px] mx-auto p-4">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-20 w-20 relative mb-2">
            <Image
              src="/logo.jpeg"
              alt="Shiv Furniture Logo"
              fill
              className="object-contain rounded-2xl"
            />
          </div>
          <h1
            className={`${lusitana.className} text-2xl font-bold text-pastel-text`}
          >
            Shiv Furniture
          </h1>
          <p className="text-sm text-pastel-text/70 mt-1">
            Management Dashboard
          </p>
        </div>

        {/* Login Form Section */}
        <div className="clay-card">
          <LoginForm />
        </div>

        {/* Optional Footer */}
        <p className="text-center text-sm text-pastel-text/50 mt-8">
          © 2024 Shiv Furniture. All rights reserved.
        </p>
      </div>
    </main>
  );
}
