"use client";
import React from "react";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserGroupIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";

type VendorProduct = {
  id: number;
  name: string;
  qty: number;
  unitPrice: number;
  total: number;
};

type Vendor = {
  id: number;
  partnerName: string;
  accountName: string;
  email: string;
  phone: string;
  billNumber: string;
  billDate: string;
  dueDate: string;
  amount: number;
  balance: number;
  status: "paid" | "pending" | "overdue";
  products: VendorProduct[];
};

const vendorData: Vendor[] = [
  {
    id: 1,
    partnerName: "Premium Wood Suppliers",
    accountName: "PWS Trading Co.",
    email: "contact@premiumwood.com",
    phone: "+91 98765 43210",
    billNumber: "PWS-2024-001",
    billDate: "2024-01-15",
    dueDate: "2024-02-15",
    amount: 98176,
    balance: 45000,
    status: "pending",
    products: [
      {
        id: 1,
        name: "Premium Teak Wood Planks",
        qty: 25,
        unitPrice: 1800,
        total: 53100,
      },
      {
        id: 2,
        name: "Mahogany Wood Sheets",
        qty: 15,
        unitPrice: 2200,
        total: 38940,
      },
      {
        id: 3,
        name: "Wood Polish & Stain",
        qty: 8,
        unitPrice: 650,
        total: 6136,
      },
    ],
  },
  {
    id: 2,
    partnerName: "Elite Hardware Solutions",
    accountName: "EHS Manufacturing",
    email: "orders@elitehardware.com",
    phone: "+91 87654 32109",
    billNumber: "EHS-2024-002",
    billDate: "2024-01-20",
    dueDate: "2024-01-25",
    amount: 19913,
    balance: 19913,
    status: "overdue",
    products: [
      {
        id: 1,
        name: "Premium Metal Hinges",
        qty: 100,
        unitPrice: 45,
        total: 5310,
      },
      {
        id: 2,
        name: "Furniture Screws Set",
        qty: 50,
        unitPrice: 120,
        total: 7080,
      },
      {
        id: 3,
        name: "Steel Brackets",
        qty: 75,
        unitPrice: 85,
        total: 7523,
      },
    ],
  },
];

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN");
}

function VendorStatus({ status }: { status: string }) {
  let statusClasses = "";
  let statusText = "";

  switch (status) {
    case "paid":
      statusClasses = "bg-green-100 text-green-800";
      statusText = "Paid";
      break;
    case "pending":
      statusClasses = "bg-yellow-100 text-yellow-800";
      statusText = "Pending";
      break;
    case "overdue":
      statusClasses = "bg-red-100 text-red-800";
      statusText = "Overdue";
      break;
    default:
      statusClasses = "bg-gray-100 text-gray-800";
      statusText = "Unknown";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses}`}
    >
      {statusText}
    </span>
  );
}

export default function VendorPage() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Vendors</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <div></div>
        <Link
          href="/dashboard/vender/create"
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Create Vendor</span>{" "}
          <PlusIcon className="h-5 md:ml-4" />
        </Link>
      </div>

      {/* Vendor Table */}
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            {/* Mobile View */}
            <div className="md:hidden">
              {vendorData.map((vendor) => (
                <div
                  key={vendor.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <UserGroupIcon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <Link
                            href={`/dashboard/vender/${vendor.id}`}
                            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {vendor.partnerName}
                          </Link>
                          <p className="text-sm text-gray-500">
                            {vendor.accountName}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{vendor.email}</p>
                    </div>
                    <VendorStatus status={vendor.status} />
                  </div>
                  <div className="pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Bill Number:</span>
                      <span className="font-medium">{vendor.billNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Bill Date:</span>
                      <span>{formatDate(vendor.billDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Due Date:</span>
                      <span>{formatDate(vendor.dueDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium">
                        {formatCurrency(vendor.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Balance:</span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(vendor.balance)}
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Products ({vendor.products.length} items):
                      </p>
                      <div className="space-y-1">
                        {vendor.products.slice(0, 2).map((product) => (
                          <div
                            key={product.id}
                            className="flex justify-between text-xs"
                          >
                            <span className="text-gray-600 truncate">
                              {product.name} (×{product.qty})
                            </span>
                            <span className="font-medium ml-2">
                              {formatCurrency(product.total)}
                            </span>
                          </div>
                        ))}
                        {vendor.products.length > 2 && (
                          <p className="text-xs text-gray-500 italic">
                            +{vendor.products.length - 2} more items...
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors flex items-center justify-center">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center justify-center">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Partner Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Account Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Bill Number
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Bill Date
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Due Date
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium text-right">
                    Amount
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium text-right">
                    Balance
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Status
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {vendorData.map((vendor) => (
                  <tr
                    key={vendor.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <UserGroupIcon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <Link
                            href={`/dashboard/vender/${vendor.id}`}
                            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {vendor.partnerName}
                          </Link>
                          <p className="text-xs text-gray-500">
                            {vendor.email}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {vendor.products.length} products in cart
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <div>
                        <p className="font-medium">{vendor.accountName}</p>
                        <p className="text-xs text-gray-500">{vendor.phone}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <span className="font-mono text-sm">
                        {vendor.billNumber}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDate(vendor.billDate)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <span
                        className={
                          new Date(vendor.dueDate) < new Date()
                            ? "text-red-600 font-medium"
                            : ""
                        }
                      >
                        {formatDate(vendor.dueDate)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-right">
                      <span className="font-medium">
                        {formatCurrency(vendor.amount)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-right">
                      <span className="font-medium text-red-600">
                        {formatCurrency(vendor.balance)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <VendorStatus status={vendor.status} />
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-2">
                        <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors flex items-center justify-center">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center justify-center">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {vendorData.length === 0 && (
        <div className="mt-6 rounded-lg bg-gray-50 p-12 text-center">
          <UserGroupIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No vendors found
          </h3>
          <p className="text-gray-500">
            Get started by adding your first vendor.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
            Add Vendor
          </button>
        </div>
      )}
    </div>
  );
}
