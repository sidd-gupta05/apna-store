"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="ShopEasy Logo"
                width={60}
                height={60}
                className="rounded-lg"
              />
              <span className="ml-3 text-xl font-bold text-gray-900">
                ShopEasy
              </span>
            </div>
            <div className="flex space-x-4">
              <Link href="/customer" className="btn-primary">
                Customer Portal
              </Link>
              <Link href="/owner" className="btn-secondary">
                Owner Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-[#007A7A]">ShopEasy</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your local store now online! Browse products, add to cart, and shop
            conveniently from home.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/customer" className="btn-primary text-lg px-8 py-3">
              Start Shopping
            </Link>
            <Link href="/owner" className="btn-secondary text-lg px-8 py-3">
              Manage Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
