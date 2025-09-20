"use client";
import React, { useState, use } from "react";
import {
  Trash2,
  Plus,
  Minus,
  Receipt,
  Printer,
  Send,
  CheckCircle,
  X,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import Link from "next/link";

type VendorCartItem = {
  id: number;
  product: string;
  description: string;
  category: string;
  qty: number;
  unitPrice: number;
  taxPercent: number;
};

type VendorDetails = {
  id: number;
  partnerName: string;
  accountName: string;
  email: string;
  phone: string;
  vendorNumber: string;
  address: string;
  gst: string;
  totalPending: number;
  totalOrders: number;
};

// Mock data based on vendor ID
const getVendorData = (id: string): VendorDetails => {
  const vendors: { [key: string]: VendorDetails } = {
    "1": {
      id: 1,
      partnerName: "Premium Wood Suppliers",
      accountName: "PWS Trading Co.",
      email: "contact@premiumwood.com",
      phone: "+91 98765 43210",
      vendorNumber: "VND-001",
      address: "123 Wood Street, Timber City, TC 560001",
      gst: "29ABCDE1234F1Z5",
      totalPending: 45000,
      totalOrders: 12,
    },
    "2": {
      id: 2,
      partnerName: "Elite Hardware Solutions",
      accountName: "EHS Manufacturing",
      email: "orders@elitehardware.com",
      phone: "+91 87654 32109",
      vendorNumber: "VND-002",
      address: "456 Steel Avenue, Metal Park, MP 560002",
      gst: "29XYZAB5678G2H6",
      totalPending: 19913,
      totalOrders: 8,
    },
  };

  return vendors[id] || vendors["1"];
};

const getVendorCartItems = (id: string): VendorCartItem[] => {
  const cartItems: { [key: string]: VendorCartItem[] } = {
    "1": [
      {
        id: 1,
        product: "Premium Teak Wood Planks",
        description: "High-quality teak wood planks for furniture making",
        category: "Raw Materials",
        qty: 25,
        unitPrice: 1800,
        taxPercent: 18,
      },
      {
        id: 2,
        product: "Mahogany Wood Sheets",
        description: "Premium mahogany wood sheets",
        category: "Raw Materials",
        qty: 15,
        unitPrice: 2200,
        taxPercent: 18,
      },
      {
        id: 3,
        product: "Wood Polish & Stain",
        description: "Premium finishing materials",
        category: "Finishing",
        qty: 8,
        unitPrice: 650,
        taxPercent: 18,
      },
    ],
    "2": [
      {
        id: 1,
        product: "Premium Metal Hinges",
        description: "Heavy-duty cabinet hinges",
        category: "Hardware",
        qty: 100,
        unitPrice: 45,
        taxPercent: 18,
      },
      {
        id: 2,
        product: "Furniture Screws Set",
        description: "Assorted furniture screws and bolts",
        category: "Hardware",
        qty: 50,
        unitPrice: 120,
        taxPercent: 18,
      },
      {
        id: 3,
        product: "Steel Brackets",
        description: "Wall mounting steel brackets",
        category: "Hardware",
        qty: 75,
        unitPrice: 85,
        taxPercent: 18,
      },
    ],
  };

  return cartItems[id] || cartItems["1"];
};

function calcUntaxedAmount(item: VendorCartItem): number {
  return item.qty * item.unitPrice;
}

function calcTaxAmount(item: VendorCartItem): number {
  return calcUntaxedAmount(item) * (item.taxPercent / 100);
}

function calcTotal(item: VendorCartItem): number {
  return calcUntaxedAmount(item) + calcTaxAmount(item);
}

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function VendorCartPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap params Promise for Next.js 15 compatibility
  const { id: vendorId } = use(params);
  const vendorDetails = getVendorData(vendorId);
  const [cartItems, setCartItems] = useState<VendorCartItem[]>(
    getVendorCartItems(vendorId),
  );

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

  return (
    <div className="w-full">
      {/* Header with Back Button */}
      <div className="flex w-full items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/vender"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Vendors</span>
          </Link>
        </div>
      </div>

      {/* Vendor Details Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <UserGroupIcon className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h1 className={`${lusitana.className} text-2xl mb-2`}>
              {vendorDetails.partnerName}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-gray-600">
                    Account Name:
                  </span>{" "}
                  {vendorDetails.accountName}
                </p>
                <p>
                  <span className="font-medium text-gray-600">
                    Vendor Number:
                  </span>{" "}
                  {vendorDetails.vendorNumber}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Email:</span>{" "}
                  {vendorDetails.email}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Phone:</span>{" "}
                  {vendorDetails.phone}
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-gray-600">GST Number:</span>{" "}
                  {vendorDetails.gst}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Address:</span>{" "}
                  {vendorDetails.address}
                </p>
                <p>
                  <span className="font-medium text-gray-600">
                    Pending Amount:
                  </span>{" "}
                  <span className="text-red-600 font-medium">
                    {formatCurrency(vendorDetails.totalPending)}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-600">
                    Total Orders:
                  </span>{" "}
                  {vendorDetails.totalOrders}
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
          Approve Order
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
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
          Reject
        </button>
        <button className="px-3 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors">
          Process Payment
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
                      <p className="text-xs text-orange-600 font-medium">
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
                        <div className="text-xs text-orange-600 font-medium">
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
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
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
                  <td className="px-3 py-3 text-right text-lg font-bold text-orange-600">
                    {formatCurrency(grandTotal)}
                  </td>
                  <td className="px-3 py-3"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      {cartItems.length > 0 && (
        <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Order Summary
          </h3>

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

          <div className="border-t-2 border-gray-300 pt-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-bold text-gray-900">
                Order Total:
              </span>
              <span className="text-2xl font-bold text-orange-600">
                {formatCurrency(grandTotal)}
              </span>
            </div>

            <div className="text-center bg-orange-50 rounded-lg p-3">
              <p className="text-lg font-semibold text-orange-700">
                Amount to be Paid: {formatCurrency(grandTotal)}
              </p>
              <p className="text-sm text-orange-600 mt-1">
                Pending Payment: {formatCurrency(vendorDetails.totalPending)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty Cart Message */}
      {cartItems.length === 0 && (
        <div className="mt-6 rounded-lg bg-gray-50 p-12 text-center">
          <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No items in cart
          </h3>
          <p className="text-gray-500">
            This vendor has no pending items in their cart.
          </p>
        </div>
      )}
    </div>
  );
}
