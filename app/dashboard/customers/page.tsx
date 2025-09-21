"use client";
import React from "react";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";

type CustomerProduct = {
  id: number;
  name: string;
  qty: number;
  unitPrice: number;
  total: number;
};

type Customer = {
  id: number;
  customerName: string;
  companyName: string;
  email: string;
  phone: string;
  orderNumber: string;
  orderDate: string;
  deliveryDate: string;
  amount: number;
  balance: number;
  status: "paid" | "pending" | "overdue";
  products: CustomerProduct[];
};

const customerData: Customer[] = [
  {
    id: 1,
    customerName: "Rajesh Kumar",
    companyName: "Kumar Interiors Pvt Ltd",
    email: "rajesh@kumarinteriors.com",
    phone: "+91 98765 43210",
    orderNumber: "ORD-2024-001",
    orderDate: "2024-01-15",
    deliveryDate: "2024-02-15",
    amount: 89200,
    balance: 25000,
    status: "pending",
    products: [
      {
        id: 1,
        name: "Executive Office Chair",
        qty: 2,
        unitPrice: 15500,
        total: 36580,
      },
      {
        id: 2,
        name: "Wooden Dining Table",
        qty: 1,
        unitPrice: 28500,
        total: 33630,
      },
      {
        id: 3,
        name: "Study Desk",
        qty: 1,
        unitPrice: 16000,
        total: 18880,
      },
    ],
  },
  {
    id: 2,
    customerName: "Priya Sharma",
    companyName: "Sharma Hospitality Group",
    email: "priya@sharmahotels.com",
    phone: "+91 87654 32109",
    orderNumber: "ORD-2024-002",
    orderDate: "2024-01-20",
    deliveryDate: "2024-02-10",
    amount: 156400,
    balance: 156400,
    status: "overdue",
    products: [
      {
        id: 1,
        name: "Modern Sofa Set",
        qty: 2,
        unitPrice: 45000,
        total: 106200,
      },
      {
        id: 2,
        name: "Coffee Table",
        qty: 3,
        unitPrice: 12000,
        total: 42480,
      },
      {
        id: 3,
        name: "Bookshelf Unit",
        qty: 1,
        unitPrice: 8500,
        total: 10020,
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

function CustomerStatus({ status }: { status: string }) {
  let statusClasses = "";
  let statusText = "";

  switch (status) {
    case "paid":
      statusClasses =
        "bg-pastel-primary/10 text-pastel-primary border border-pastel-primary/20";
      statusText = "Paid";
      break;
    case "pending":
      statusClasses =
        "bg-pastel-secondary/10 text-pastel-secondary border border-pastel-secondary/20";
      statusText = "Pending";
      break;
    case "overdue":
      statusClasses = "bg-red-50 text-red-500 border border-red-200";
      statusText = "Overdue";
      break;
    default:
      statusClasses = "bg-gray-100 text-pastel-text/70 border border-gray-200";
      statusText = "Unknown";
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${statusClasses}`}
    >
      {statusText}
    </span>
  );
}

export default function CustomersPage() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <div></div>
        <Link
          href="/dashboard/customers/create"
          className="btn-primary flex items-center gap-2"
        >
          <span className="hidden md:block">Create Customer</span>{" "}
          <PlusIcon className="h-5 md:ml-4" />
        </Link>
      </div>

      {/* Customer Table */}
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg clay-card p-2 md:pt-0">
            {/* Mobile View */}
            <div className="md:hidden">
              {customerData.map((customer) => (
                <div
                  key={customer.id}
                  className="mb-2 w-full rounded-xl glass-card p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <div className="w-8 h-8 bg-pastel-primary/10 rounded-full flex items-center justify-center mr-3">
                          <UserIcon className="w-4 h-4 text-pastel-primary" />
                        </div>
                        <div>
                          <Link
                            href={`/dashboard/customers/${customer.id}`}
                            className="font-medium text-green-600 hover:text-green-800 hover:underline"
                          >
                            {customer.customerName}
                          </Link>
                          <p className="text-sm text-pastel-text/70">
                            {customer.companyName}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </div>
                    <CustomerStatus status={customer.status} />
                  </div>
                  <div className="pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-pastel-text/70">Order Number:</span>
                      <span className="font-medium">
                        {customer.orderNumber}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-pastel-text/70">Order Date:</span>
                      <span>{formatDate(customer.orderDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-pastel-text/70">
                        Delivery Date:
                      </span>
                      <span>{formatDate(customer.deliveryDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-pastel-text/70">Amount:</span>
                      <span className="font-medium">
                        {formatCurrency(customer.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-pastel-text/70">Balance:</span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(customer.balance)}
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm font-medium text-pastel-text mb-2">
                        Products ({customer.products.length} items):
                      </p>
                      <div className="space-y-1">
                        {customer.products.slice(0, 2).map((product) => (
                          <div
                            key={product.id}
                            className="flex justify-between text-xs"
                          >
                            <span className="text-pastel-text/70 truncate">
                              {product.name} (×{product.qty})
                            </span>
                            <span className="font-medium ml-2">
                              {formatCurrency(product.total)}
                            </span>
                          </div>
                        ))}
                        {customer.products.length > 2 && (
                          <p className="text-xs text-pastel-text/50 italic">
                            +{customer.products.length - 2} more items...
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button className="w-8 h-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors flex items-center justify-center">
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
            <table className="hidden min-w-full text-pastel-text md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-5 font-semibold text-pastel-primary sm:pl-6"
                  >
                    Customer Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Company Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Order Number
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Order Date
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Delivery Date
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
              <tbody className="glass-card">
                {customerData.map((customer) => (
                  <tr
                    key={customer.id}
                    className="w-full border-b border-pastel-primary/10 py-3 text-sm last-of-type:border-none hover:bg-pastel-primary/5 transition-colors duration-200 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <UserIcon className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <Link
                            href={`/dashboard/customers/${customer.id}`}
                            className="font-medium text-pastel-primary hover:text-pastel-primary/80 hover:underline"
                          >
                            {customer.customerName}
                          </Link>
                          <p className="text-xs text-gray-500">
                            {customer.email}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {customer.products.length} products in cart
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <div>
                        <p className="font-medium">{customer.companyName}</p>
                        <p className="text-xs text-gray-500">
                          {customer.phone}
                        </p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <span className="font-mono text-sm">
                        {customer.orderNumber}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDate(customer.orderDate)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <span
                        className={
                          new Date(customer.deliveryDate) < new Date()
                            ? "text-red-600 font-medium"
                            : ""
                        }
                      >
                        {formatDate(customer.deliveryDate)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-right">
                      <span className="font-medium">
                        {formatCurrency(customer.amount)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-right">
                      <span className="font-medium text-red-600">
                        {formatCurrency(customer.balance)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <CustomerStatus status={customer.status} />
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-2">
                        <button className="w-8 h-8 rounded-full bg-pastel-primary/10 text-pastel-primary hover:bg-pastel-primary/20 transition-colors flex items-center justify-center">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-pastel-secondary/10 text-pastel-secondary hover:bg-pastel-secondary/20 transition-colors flex items-center justify-center">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors flex items-center justify-center">
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
      {customerData.length === 0 && (
        <div className="mt-6 rounded-lg bg-gray-50 p-12 text-center">
          <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No customers found
          </h3>
          <p className="text-gray-500">
            Get started by adding your first customer.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
            Add Customer
          </button>
        </div>
      )}
    </div>
  );
}
