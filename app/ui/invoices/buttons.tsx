"use client";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteInvoice } from "@/app/lib/actions";
import { useState, useTransition } from "react";

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDelete = () => {
    const confirmed = confirm(
      "Are you sure you want to delete this invoice? This action cannot be undone.",
    );

    if (!confirmed) return;

    setError(null);
    setSuccess(false);
    startTransition(async () => {
      try {
        await deleteInvoice(id);
        setSuccess(true);
        // Auto-hide success message after 2 seconds
        setTimeout(() => setSuccess(false), 2000);
      } catch (err) {
        console.error("Failed to delete invoice:", err);
        setError("Failed to delete invoice. Please try again.");
        // Auto-hide error after 5 seconds
        setTimeout(() => setError(null), 5000);
      }
    });
  };

  return (
    <div className="relative">
      <button
        onClick={handleDelete}
        disabled={isPending || success}
        className={`rounded-md border p-2 transition-all duration-200 group ${
          success
            ? "bg-green-50 border-green-300 cursor-default"
            : isPending
              ? "opacity-50 cursor-not-allowed bg-gray-100 animate-pulse"
              : "hover:bg-red-50 hover:border-red-300 hover:scale-105"
        }`}
        title={
          success
            ? "Invoice deleted successfully"
            : isPending
              ? "Deleting invoice..."
              : "Delete invoice"
        }
      >
        <span className="sr-only">
          {success
            ? "Invoice deleted"
            : isPending
              ? "Deleting invoice..."
              : "Delete"}
        </span>
        {isPending ? (
          <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        ) : success ? (
          <svg
            className="w-5 h-5 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <TrashIcon className="w-5 text-gray-600 group-hover:text-red-600" />
        )}
      </button>

      {/* Error notification */}
      {error && (
        <div className="absolute top-full left-0 mt-1 p-2 bg-red-100 text-red-700 text-xs rounded border border-red-300 whitespace-nowrap z-20 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex items-center gap-1">
            <svg
              className="w-3 h-3 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-2 text-red-900 hover:text-red-700 font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Success notification */}
      {success && (
        <div className="absolute top-full left-0 mt-1 p-2 bg-green-100 text-green-700 text-xs rounded border border-green-300 whitespace-nowrap z-20 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex items-center gap-1">
            <svg
              className="w-3 h-3 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Invoice deleted successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
}
