"use client";
import { useState } from "react";
import { Product, DashboardStats, Order } from "../types";
import ProductForm from "@/components/Retailer/ProductForm";
import {
  Plus,
  TrendingUp,
  DollarSign,
  Package,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";

// Mock data
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 99.99,
    buyingCost: 60.0,
    category: "electronics",
    image: "/placeholder-product.jpg",
    stock: 15,
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Organic Coffee",
    description: "Premium organic coffee beans from Ethiopia",
    price: 24.99,
    buyingCost: 12.0,
    category: "food",
    image: "/placeholder-product.jpg",
    stock: 50,
    createdAt: new Date(),
  },
];

const initialOrders: Order[] = [
  {
    id: "1",
    items: [
      { product: initialProducts[0], quantity: 2 },
      { product: initialProducts[1], quantity: 1 },
    ],
    total: 224.97,
    status: "completed",
    createdAt: new Date("2024-01-15"),
  },
];

export default function OwnerDashboard() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders] = useState<Order[]>(initialOrders);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const stats: DashboardStats = {
    totalRevenue: orders
      .filter((order) => order.status === "completed")
      .reduce((sum, order) => sum + order.total, 0),
    totalProfit: orders
      .filter((order) => order.status === "completed")
      .reduce(
        (sum, order) =>
          sum +
          order.items.reduce(
            (itemSum, item) =>
              itemSum +
              (item.product.price - item.product.buyingCost) * item.quantity,
            0
          ),
        0
      ),
    totalOrders: orders.length,
    popularProducts: products.sort((a, b) => b.stock - a.stock).slice(0, 5),
    lowStockProducts: products.filter((p) => p.stock < 10),
  };

  const addProduct = (productData: Omit<Product, "id" | "createdAt">) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setProducts((prev) => [...prev, newProduct]);
    setShowProductForm(false);
  };

  const updateProduct = (productData: Omit<Product, "id" | "createdAt">) => {
    if (!editingProduct) return;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === editingProduct.id
          ? {
              ...productData,
              id: editingProduct.id,
              createdAt: editingProduct.createdAt,
            }
          : p
      )
    );
    setEditingProduct(null);
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="ShopEasy Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="ml-2 text-lg font-bold">
                ShopEasy - Owner Dashboard
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats.totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Profit
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats.totalProfit.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="text-purple-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalOrders}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Low Stock Items
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.lowStockProducts.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product List */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Products</h2>
                <button
                  onClick={() => setShowProductForm(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-600">
                          {product.category}
                        </p>
                        <div className="flex space-x-4 mt-2 text-sm">
                          <span>Cost: ${product.buyingCost}</span>
                          <span>Price: ${product.price}</span>
                          <span>Stock: {product.stock}</span>
                          <span className="font-semibold text-green-600">
                            Profit: $
                            {(product.price - product.buyingCost).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <AlertTriangle className="text-red-600 mr-2" size={20} />
                Low Stock Alerts
              </h3>
              <div className="space-y-2">
                {stats.lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex justify-between items-center p-2 bg-red-50 rounded"
                  >
                    <span className="font-medium">{product.name}</span>
                    <span className="text-red-600 font-bold">
                      {product.stock} left
                    </span>
                  </div>
                ))}
                {stats.lowStockProducts.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    All products are well stocked
                  </p>
                )}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="card p-6">
              <h3 className="text-lg font-bold mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="border-b pb-3 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">
                          {order.items.length} items • ${order.total}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      {(showProductForm || editingProduct) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <ProductForm
                product={editingProduct || undefined}
                onSubmit={editingProduct ? updateProduct : addProduct}
                onCancel={() => {
                  setShowProductForm(false);
                  setEditingProduct(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
