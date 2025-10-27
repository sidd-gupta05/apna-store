import { Product } from "@/app/types";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="card p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-w-1 aspect-h-1 mb-4">
        <Image
          src={product.image || "/placeholder-product.jpg"}
          alt={product.name}
          width={200}
          height={200}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
        {product.description}
      </p>
      <div className="flex justify-between items-center mb-3">
        <span className="text-2xl font-bold text-[#005a5a]">
          ${product.price}
        </span>
        <span
          className={`text-sm ${
            product.stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </span>
      </div>
      <button
        onClick={() => onAddToCart(product)}
        disabled={product.stock === 0}
        className={`w-full py-2 px-4 rounded-lg font-medium ${
          product.stock > 0
            ? "bg-[#005A5A] hover:bg-[#006A6A] text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        } transition-colors duration-200`}
      >
        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
