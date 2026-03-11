export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stockQuantity: number;
  rating: number;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  userId: number;
  name: string;
  email: string;
  role: string;
  token: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
  name: string;
  email: string;
  role: string;
}

export interface OrderRequest {
  userId: number;
  userEmail: string;
  shippingAddress: string;
  items: OrderItemRequest[];
}

export interface OrderItemRequest {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface Order {
  id: number;
  userId: number;
  userEmail: string;
  shippingAddress: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  imageUrl: string;
}
