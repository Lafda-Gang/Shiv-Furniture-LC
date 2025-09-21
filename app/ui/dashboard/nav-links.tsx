"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { TruckIcon } from "@heroicons/react/24/outline";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
    description: "Overview & Analytics",
  },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: DocumentDuplicateIcon,
    description: "Manage Bills & Payments",
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
    icon: UserGroupIcon,
    description: "Customer Database",
  },
  {
    name: "Vendors",
    href: "/dashboard/vender",
    icon: TruckIcon,
    description: "Supplier Management",
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2">
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "group relative flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
              {
                "bg-pastel-primary/10 text-pastel-primary": isActive,
                "hover:bg-pastel-primary/5 text-pastel-text hover:text-pastel-primary":
                  !isActive,
              },
            )}
          >
            <LinkIcon
              className={clsx("h-5 w-5 transition-colors duration-200", {
                "text-pastel-primary": isActive,
                "text-pastel-text/70 group-hover:text-pastel-primary":
                  !isActive,
              })}
            />
            <div>
              <span className="font-medium">{link.name}</span>
              <span
                className={clsx(
                  "block text-xs transition-colors duration-200",
                  {
                    "text-pastel-primary/70": isActive,
                    "text-pastel-text/50 group-hover:text-pastel-primary/70":
                      !isActive,
                  },
                )}
              >
                {link.description}
              </span>
            </div>
            {isActive && (
              <div className="absolute inset-y-0 left-0 w-1 rounded-r-full bg-pastel-primary" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
