"use client";
import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  Printer,
  Send,
  CheckCircle,
  X,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { UserIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import Link from "next/link";

type CustomerCartItem = {
  id: number;
  product: string;
  description: string;
  category: string;
  qty: number;
  unitPrice: number;
  taxPercent: number;
};

type CustomerDetails = {
  id: number;
  customerName: string;
  companyName: string;
  email: string;
  phone: string;
  customerNumber: string;
  address: string;
  gst: string;
  totalPending: number;
  totalOrders: number;
};

// Mock data based on customer ID
const getCustomerData = (id: string): CustomerDetails => {
  const customers: { [key: string]: CustomerDetails } = {
    "1": {
      id: 1,
      customerName: "Rajesh Kumar",
      companyName: "Kumar Interiors Pvt Ltd",
      email: "rajesh@kumarinteriors.com",
      phone: "+91 98765 43210",
      customerNumber: "CUST-001",
      address: "123 Business Park, Corporate City, CC 560001",
      gst: "29KUMAR1234F1Z5",
      totalPending: 25000,
      totalOrders: 15,
    },
    "2": {
      id: 2,
      customerName: "Priya Sharma",
      companyName: "Sharma Hospitality Group",
      email: "priya@sharmahotels.com",
      phone: "+91 87654 32109",
      customerNumber: "CUST-002",
      address: "456 Hotel Plaza, Hospitality District, HD 560002",
      gst: "29SHARMA5678G2H6",
      totalPending: 156400,
      totalOrders: 22,
    },
  };

  return customers[id] || customers["1"];
};

const getCustomerCartItems = (id: string): CustomerCartItem[] => {
  const cartItems: { [key: string]: CustomerCartItem[] } = {
    "1": [
      {
        id: 1,
        product: "Executive Office Chair",
        description: "Ergonomic leather chair with lumbar support",
        category: "Office Furniture",
        qty: 2,
        unitPrice: 15500,
        taxPercent: 18,
      },
      {
        id: 2,
        product: "Wooden Dining Table",
        description: "6-seater solid wood dining table",
        category: "Dining Furniture",
        qty: 1,
        unitPrice: 28500,
        taxPercent: 18,
      },
      {
        id: 3,
        product: "Study Desk",
        description: "Computer desk with drawers and cable management",
        category: "Office Furniture",
        qty: 1,
        unitPrice: 16000,
        taxPercent: 18,
      },
    ],
    "2": [
      {
        id: 1,
        product: "Modern Sofa Set",
        description: "3-piece L-shaped sofa with cushions",
        category: "Living Room",
        qty: 2,
        unitPrice: 45000,
        taxPercent: 18,
      },
      {
        id: 2,
        product: "Coffee Table",
        description: "Elegant glass-top coffee table",
        category: "Living Room",
        qty: 3,
        unitPrice: 12000,
        taxPercent: 18,
      },
      {
        id: 3,
        product: "Bookshelf Unit",
        description: "5-tier wooden bookshelf",
        category: "Storage",
        qty: 1,
        unitPrice: 8500,
        taxPercent: 12,
      },
    ],
  };

  return cartItems[id] || cartItems["1"];
};

function calcUntaxedAmount(item: CustomerCartItem): number {
  return item.qty * item.unitPrice;
}

function calcTaxAmount(item: CustomerCartItem): number {
  return calcUntaxedAmount(item) * (item.taxPercent / 100);
}

function calcTotal(item: CustomerCartItem): number {
  return calcUntaxedAmount(item) + calcTaxAmount(item);
}

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function CustomerCartPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap params Promise for Next.js 15 compatibility
  const { id: customerId } = use(params);
  const customerDetails = getCustomerData(customerId);
  const [cartItems, setCartItems] = useState<CustomerCartItem[]>(
    getCustomerCartItems(customerId),
  );
  const router = useRouter();

  // Customer-specific URLs for Create Bill button
  const CREATE_BILL_URLS: { [key: string]: string } = {
    "1": "https://rzp.io/rzp/pCEALeNu", // Rajesh Kumar
    "2": "https://rzp.io/rzp/5RyMYvp", // Priya Sharma
  };

  // Customer-specific PDF files for Print button
  const CUSTOMER_PDF_URLS: { [key: string]: string } = {
    "1": "/ramesh.pdf", // Rajesh Kumar
    "2": "/priya.pdf", // Priya Sharma
  };

  const handleCreateBill = () => {
    const billUrl = CREATE_BILL_URLS[customerId];
    if (billUrl) {
      // Open the Razorpay link in a new tab
      window.open(billUrl, "_blank");
    } else {
      // Fallback URL if customer ID not found
      router.push("/dashboard/bills/create");
    }
  };

  const handlePrint = () => {
    const pdfUrl = CUSTOMER_PDF_URLS[customerId];
    if (pdfUrl) {
      // Open the PDF in a new tab
      window.open(pdfUrl, "_blank");
    } else {
      // Fallback - try to print the current page
      window.print();
    }
  };

  const updateQuantity = (id: number, newQty: number) => {
    if (newQty < 1) return;
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, qty: newQty } : item)),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const grandUntaxedTotal = cartItems.reduce(
    (sum, item) => sum + calcUntaxedAmount(item),
    0,
  );
  const grandTaxTotal = cartItems.reduce(
    (sum, item) => sum + calcTaxAmount(item),
    0,
  );
  const grandTotal = grandUntaxedTotal + grandTaxTotal;
  const grandTotalText = `Grand Total: ${formatCurrency(grandTotal)}`;

  return (
    <div className="w-full">
      {/* Header with Back Button */}
      <div className="flex w-full items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/customers"
            className="flex items-center gap-2 text-green-600 hover:text-green-800"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Customers</span>
          </Link>
        </div>
      </div>

      {/* Customer Details Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <UserIcon className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex-1">
            <h1 className={`${lusitana.className} text-2xl mb-2`}>
              {customerDetails.customerName}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-gray-600">
                    Company Name:
                  </span>{" "}
                  {customerDetails.companyName}
                </p>
                <p>
                  <span className="font-medium text-gray-600">
                    Customer Number:
                  </span>{" "}
                  {customerDetails.customerNumber}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Email:</span>{" "}
                  {customerDetails.email}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Phone:</span>{" "}
                  {customerDetails.phone}
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-gray-600">GST Number:</span>{" "}
                  {customerDetails.gst}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Address:</span>{" "}
                  {customerDetails.address}
                </p>
                <p>
                  <span className="font-medium text-gray-600">
                    Pending Amount:
                  </span>{" "}
                  <span className="text-red-600 font-medium">
                    {formatCurrency(customerDetails.totalPending)}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-600">
                    Total Orders:
                  </span>{" "}
                  {customerDetails.totalOrders}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
          <CheckCircle className="w-4 h-4" />
          Confirm
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
          <Send className="w-4 h-4" />
          Send
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors">
          <FileText className="w-4 h-4" />
          Draft
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          onClick={handleCreateBill}
          className="px-3 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 transition-colors"
        >
          Create Bill
        </button>
      </div>

      {/* Cart Items Table */}
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            {/* Mobile View */}
            <div className="md:hidden">
              {cartItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">
                          #{idx + 1}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-medium">{item.product}</p>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                      <p className="text-xs text-green-600 font-medium">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Quantity:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.qty - 1)}
                          className="w-6 h-6 rounded border flex items-center justify-center"
                          disabled={item.qty <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.qty + 1)}
                          className="w-6 h-6 rounded border flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Unit Price:</span>
                      <span>{formatCurrency(item.unitPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span>{formatCurrency(calcUntaxedAmount(item))}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Tax ({item.taxPercent}%):
                      </span>
                      <span>{formatCurrency(calcTaxAmount(item))}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>{formatCurrency(calcTotal(item))}</span>
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
                    Sr. No.
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Product
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium text-center">
                    Qty
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium text-right">
                    Unit Price
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium text-right">
                    Untaxed
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium text-center">
                    Tax
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium text-right">
                    Tax Amount
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium text-right">
                    Total
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {cartItems.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      {idx + 1}
                    </td>
                    <td className="px-3 py-3">
                      <div className="space-y-1">
                        <div className="font-medium">{item.product}</div>
                        <div className="text-xs text-gray-500">
                          {item.description}
                        </div>
                        <div className="text-xs text-green-600 font-medium">
                          {item.category}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.qty - 1)}
                          className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          disabled={item.qty <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.qty + 1)}
                          className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-right">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-right">
                      {formatCurrency(calcUntaxedAmount(item))}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-center">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {item.taxPercent}%
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-right">
                      {formatCurrency(calcTaxAmount(item))}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-right font-medium">
                      {formatCurrency(calcTotal(item))}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {/* Summary Row */}
                <tr className="bg-gray-50 font-medium">
                  <td colSpan={4} className="px-4 py-3 pl-6">
                    <div className="text-sm">
                      Items: {cartItems.length} | Qty:{" "}
                      {cartItems.reduce((sum, item) => sum + item.qty, 0)}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right">
                    {formatCurrency(grandUntaxedTotal)}
                  </td>
                  <td className="px-3 py-3"></td>
                  <td className="px-3 py-3 text-right">
                    {formatCurrency(grandTaxTotal)}
                  </td>
                  <td className="px-3 py-3 text-right text-lg font-bold text-green-600">
                    {formatCurrency(grandTotal)}
                  </td>
                  <td className="px-3 py-3"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Comprehensive Totals Summary */}
      {cartItems.length > 0 && (
        <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Order Summary
          </h3>

          {/* Item Counts */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Items:</span>
              <span className="font-medium">{cartItems.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Quantity:</span>
              <span className="font-medium">
                {cartItems.reduce((sum, item) => sum + item.qty, 0)}
              </span>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="space-y-2 border-t pt-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal (Before Tax):</span>
              <span className="font-medium">
                {formatCurrency(grandUntaxedTotal)}
              </span>
            </div>

            {/* Tax Breakdown by Rate */}
            {Array.from(new Set(cartItems.map((item) => item.taxPercent))).map(
              (taxRate) => {
                const itemsWithThisRate = cartItems.filter(
                  (item) => item.taxPercent === taxRate,
                );
                const taxableAmount = itemsWithThisRate.reduce(
                  (sum, item) => sum + calcUntaxedAmount(item),
                  0,
                );
                const taxAmount = itemsWithThisRate.reduce(
                  (sum, item) => sum + calcTaxAmount(item),
                  0,
                );

                return (
                  <div key={taxRate} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Tax @ {taxRate}% (on {formatCurrency(taxableAmount)}):
                    </span>
                    <span className="font-medium">
                      {formatCurrency(taxAmount)}
                    </span>
                  </div>
                );
              },
            )}

            <div className="flex justify-between text-sm font-medium border-t pt-2">
              <span className="text-gray-700">Total Tax:</span>
              <span className="text-gray-700">
                {formatCurrency(grandTaxTotal)}
              </span>
            </div>
          </div>

          {/* Grand Total Section */}
          <div className="border-t-2 border-gray-300 pt-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-bold text-gray-900">
                Grand Total:
              </span>
              <span className="text-2xl font-bold text-green-600">
                {formatCurrency(grandTotal)}
              </span>
            </div>

            <div className="text-center bg-green-50 rounded-lg p-3">
              <p className="text-lg font-semibold text-green-700">
                {grandTotalText}
              </p>
              <p className="text-sm text-green-600 mt-1">
                Amount Payable: {formatCurrency(grandTotal)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty Cart Message */}
      {cartItems.length === 0 && (
        <div className="mt-6 rounded-lg bg-gray-50 p-12 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-500">
            Add some furniture items to get started!
          </p>
        </div>
      )}
    </div>
  );
}
