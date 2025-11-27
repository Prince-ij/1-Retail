export interface Product {
  id: string;
  name: string;
  description?: string;
  size?: string;
  price: number;
  cost: number;
  supplier?: string;
  stock: number;
}

export type ProductWithoutId = Omit<Product, "id">;

export interface Sales {
  id: string;
  product: Product;
  buyer: string;
  date: string;
  quantity: number;
  totalPrice: number;
  recieptId: string;
}

export type SalesWithoutId = Omit<Sales, "id">;

export interface Credit {
  id: string;
  product: Product;
  buyer: string;
  date: string;
  quantity: number;
  amountPaid?: number;
  totalDebt: number;
  status: "settled" | "pending";
  recieptId: string;
}

export type CreditWithoutID = Omit<Credit, "id">;

interface Details {
  firstName: string;
  lastName: string;
  email: string;
}

export interface User {
  details: Details;
  password: string;
  products: Product;
  sales: Sales;
  credits: Credit;
}

export type UserWithoutId = Omit<User, "id">;
