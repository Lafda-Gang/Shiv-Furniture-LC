"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { ReactElement } from "react";
import { generatePagination } from "@/app/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string): string => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="inline-flex gap-2 items-center bg-white/50 p-2 rounded-lg shadow-sm">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex gap-1">
        {allPages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={`${page}-${index}`}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}): ReactElement {
  const className = clsx(
    "flex h-8 w-8 items-center justify-center text-sm rounded-md transition-colors duration-200",
    {
      "bg-pastel-primary text-white font-medium": isActive,
      "hover:bg-pastel-primary/10 hover:text-pastel-primary":
        !isActive && position !== "middle",
      "text-pastel-text/40 pointer-events-none": position === "middle",
      "text-pastel-text": !isActive && position !== "middle",
    },
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}): ReactElement {
  const className = clsx(
    "flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200",
    {
      "pointer-events-none text-pastel-text/30": isDisabled,
      "hover:bg-pastel-primary/10 hover:text-pastel-primary text-pastel-text":
        !isDisabled,
    },
  );

  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4 h-4" />
    ) : (
      <ArrowRightIcon className="w-4 h-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
