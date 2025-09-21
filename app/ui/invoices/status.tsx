import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        {
          "bg-pastel-secondary/10 text-pastel-secondary border border-pastel-secondary/20":
            status === "pending",
          "bg-pastel-primary/10 text-pastel-primary border border-pastel-primary/20":
            status === "paid",
        },
      )}
    >
      {status === "pending" ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 h-4 text-pastel-secondary" />
        </>
      ) : (
        <>
          Paid
          <CheckIcon className="ml-1 w-4 h-4 text-pastel-primary" />
        </>
      )}
    </span>
  );
}
