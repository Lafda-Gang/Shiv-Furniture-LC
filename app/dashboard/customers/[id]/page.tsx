"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";

type CustomerCartItem = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
};

type CustomerDetails = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
};

// Mock data based on customer ID
const getCustomerData = (id: string): CustomerDetails => {
  const customers: { [key: string]: CustomerDetails } = {
    "1": {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@kumarinteriors.com",
      phone: "+91 98765 43210",
      address: "123 Business Park, Corporate City, CC 560001",
      status: "Active",
    },
    "2": {
      id: 2,
      name: "Priya Sharma",
      email: "priya@sharmahotels.com",
      phone: "+91 87654 32109",
      address: "456 Hotel Plaza, Hospitality District, HD 560002",
      status: "Active",
    },
  };

  return customers[id] || customers["1"];
};

const getCustomerCartItems = (id: string): CustomerCartItem[] => {
  const cartItems: { [key: string]: CustomerCartItem[] } = {
    "1": [
      {
        id: 1,
        name: "Executive Office Chair",
        description: "Ergonomic leather chair with lumbar support",
        quantity: 2,
        price: 15500,
      },
      {
        id: 2,
        name: "Wooden Dining Table",
        description: "6-seater solid wood dining table",
        quantity: 1,
        price: 28500,
      },
      {
        id: 3,
        name: "Study Desk",
        description: "Modern study desk with drawers",
        quantity: 3,
        price: 12000,
      },
    ],
    "2": [
      {
        id: 1,
        name: "Hotel Lobby Sofa",
        description: "3-seater premium leather sofa",
        quantity: 4,
        price: 45000,
      },
      {
        id: 2,
        name: "Reception Desk",
        description: "Custom designed reception counter",
        quantity: 1,
        price: 75000,
      },
    ],
  };

  return cartItems[id] || cartItems["1"];
};

// Helper functions for calculations
const calcUntaxedAmount = (price: number, quantity: number): number => {
  return price * quantity;
};

const calcTaxAmount = (price: number, quantity: number): number => {
  return calcUntaxedAmount(price, quantity) * 0.18; // 18% tax
};

const calcTotal = (price: number, quantity: number): number => {
  return calcUntaxedAmount(price, quantity) + calcTaxAmount(price, quantity);
};

const formatCurrency = (amount: number): string => {
  return amount.toLocaleString("en-IN");
};

// Main component
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

  // Animation and interaction states
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

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

  // Event handlers
  const handleCardHover = (cardId: string) => {
    setSelectedCard(cardId);
    setIsHovered(true);
  };

  const handleCardLeave = () => {
    setSelectedCard(null);
    setIsHovered(false);
  };

  const handleCreateBill = () => {
    const billUrl = CREATE_BILL_URLS[customerId];
    if (billUrl) {
      window.open(billUrl, "_blank");
    } else {
      router.push("/dashboard/bills/create");
    }
  };

  const handlePrint = () => {
    const pdfUrl = CUSTOMER_PDF_URLS[customerId];
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    } else {
      window.print();
    }
  };

  const updateQuantity = (id: number, newQty: number) => {
    if (newQty < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item,
      ),
    );
  };

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-pastel-background to-pastel-background/90">
      <div className="glass-card max-w-7xl mx-auto p-8 space-y-8">
        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleCreateBill}
            className="btn-primary flex items-center gap-2"
          >
            Create Bill
          </button>
          <button
            onClick={handlePrint}
            className="btn-secondary flex items-center gap-2"
          >
            Print Details
          </button>
        </div>

        {/* Customer Header */}
        <div
          className="clay-card hover:scale-[1.02] transition-transform"
          onMouseEnter={() => handleCardHover("header")}
          onMouseLeave={handleCardLeave}
        >
          <h1 className="text-3xl font-bold text-pastel-primary mb-4">
            {customerDetails.name}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-pastel-text">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {customerDetails.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {customerDetails.phone}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {customerDetails.address}
            </p>
            <p>
              <span className="font-semibold">Status:</span>
              <span
                className={`ml-2 px-3 py-1 rounded-full ${
                  customerDetails.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {customerDetails.status}
              </span>
            </p>
          </div>
        </div>

        {/* Cart Items */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-pastel-primary mb-4">
            Cart Items
          </h2>
          <div className="grid gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className={`clay-card ${
                  selectedCard === `item-${item.id}` ? "scale-[1.02]" : ""
                }`}
                onMouseEnter={() => handleCardHover(`item-${item.id}`)}
                onMouseLeave={handleCardLeave}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-pastel-primary">
                      {item.name}
                    </h3>
                    <p className="text-pastel-text">{item.description}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="btn-secondary p-2 rounded-full"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(0, item.quantity - 1),
                          )
                        }
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        className="btn-secondary p-2 rounded-full"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-pastel-primary">
                        ₹{formatCurrency(calcTotal(item.price, item.quantity))}
                      </p>
                      <p className="text-sm text-pastel-text">
                        ₹{formatCurrency(item.price)} each
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="clay-card mt-8">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-pastel-text">
                <span>Subtotal</span>
                <span>
                  ₹
                  {formatCurrency(
                    cartItems.reduce(
                      (sum, item) =>
                        sum + calcUntaxedAmount(item.price, item.quantity),
                      0,
                    ),
                  )}
                </span>
              </div>
              <div className="flex justify-between text-pastel-text">
                <span>Tax (18%)</span>
                <span>
                  ₹
                  {formatCurrency(
                    cartItems.reduce(
                      (sum, item) =>
                        sum + calcTaxAmount(item.price, item.quantity),
                      0,
                    ),
                  )}
                </span>
              </div>
              <div className="h-px bg-pastel-primary/20 my-2"></div>
              <div className="flex justify-between font-bold text-lg text-pastel-primary">
                <span>Total</span>
                <span>
                  ₹
                  {formatCurrency(
                    cartItems.reduce(
                      (sum, item) => sum + calcTotal(item.price, item.quantity),
                      0,
                    ),
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
