import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-white/50 backdrop-blur-sm">
      <Link
        className="mb-4 flex items-center gap-2 rounded-xl clay-card hover:translate-y-[-2px] transition-all duration-300 p-4"
        href="/"
      >
        <Image
          src="/logo.jpeg"
          alt="Shiv Furniture Logo"
          width={40}
          height={40}
          className="rounded-lg"
        />
        <div className={`${lusitana.className} text-pastel-text`}>
          <div className="text-lg md:text-xl font-bold leading-tight">
            <span className="block">Shiv</span>
            <span className="block text-pastel-primary">Furniture</span>
          </div>
        </div>
      </Link>

      <div className="flex grow flex-col gap-2">
        <div className="glass-card p-2">
          <NavLinks />
        </div>

        <div className="hidden h-auto w-full grow md:block"></div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="flex h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-white/50 p-3 text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-all duration-300 group">
            <PowerIcon className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
