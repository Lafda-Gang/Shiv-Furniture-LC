import Link from "next/link";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-pastel-background overflow-x-hidden">
      {/* Navigation */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.jpeg"
              alt="Shiv Furniture Logo"
              width={50}
              height={50}
              className="object-contain rounded-lg"
            />
            <span
              className={`${lusitana.className} text-2xl font-bold text-pastel-text`}
            >
              Shiv Furniture
            </span>
          </div>
          <Link href="/login" className="btn-primary">
            Admin Login
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <section className="bg-white py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1
              className={`${lusitana.className} text-4xl md:text-5xl font-bold text-pastel-text mb-6`}
            >
              Elegant Furniture for Your Dream Home
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover our exquisite collection of handcrafted furniture,
              designed to bring timeless beauty and comfort to your living
              spaces.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/login" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="clay-card hover:translate-y-[-4px] text-center"
              >
                <div className="text-pastel-primary text-4xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-pastel-text">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pastel-text text-white py-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Image
                src="/logo.jpeg"
                alt="Shiv Furniture Logo"
                width={40}
                height={40}
                className="object-contain rounded-lg"
              />
              <span className={`${lusitana.className} text-xl font-bold`}>
                Shiv Furniture
              </span>
            </div>
            <div className="text-center md:text-right">
              <p>&copy; 2024 Shiv Furniture. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

const features = [
  {
    icon: "🪑",
    title: "Custom Furniture",
    description:
      "Bespoke furniture pieces crafted to your exact specifications, bringing your vision to life.",
  },
  {
    icon: "🏠",
    title: "Interior Design",
    description:
      "Expert design consultation to help you create harmonious and functional living spaces.",
  },
  {
    icon: "✨",
    title: "Quality Craftsmanship",
    description:
      "Each piece is masterfully crafted using premium materials and traditional techniques.",
  },
];
