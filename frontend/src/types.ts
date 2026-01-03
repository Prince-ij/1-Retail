export interface UserEntryType {
  details: {
    firstName: string;
    lastName: string;
    email: string;
  };
  password: string;
}
export interface UserType {
  id: string;
  details: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface ProductType {
  id: string;
  name: string;
  description: string;
  size: string;
  price: number;
  cost: number;
  supplier: string;
  stock: number;
}
export interface ProductEntryType {
  name: string;
  description?: string;
  size?: string;
  price: number;
  cost: number;
  supplier?: string;
  stock: number;
}

export interface SalesType {
  id: string;
  product: string;
  buyer: string;
  date: string;
  quantity: number;
  totalPrice: number;
  receiptId: string;
}

export interface SalesEntryType {
  product: string;
  buyer: string;
  quantity: number;
}

export interface DebtType {
  id: string;
  product: string;
  buyer: string;
  quantity: number;
  date: string;
  amountPaid: number;
  totalDebt: number;
  status: "settled" | "pending";
  receiptId: string;
}

export interface DebtEntryType {
  product: string,
  buyer: string,
  quantity: number,
}
