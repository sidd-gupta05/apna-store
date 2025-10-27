export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  buyingCost: number;
  category: string;
  image: string;
  stock: number;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
}

export interface DashboardStats {
  totalRevenue: number;
  totalProfit: number;
  totalOrders: number;
  popularProducts: Product[];
  lowStockProducts: Product[];
}
