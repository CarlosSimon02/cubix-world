import { Timestamp } from "firebase-admin/firestore";

export interface ProductModel {
  id: string;
  name: string;
  isActive: boolean;
  description: string;
  images: string[];
  price: number;
  category: {
    id: string;
    title: string;
  };
  stock: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProductModelInput
  extends Omit<ProductModel, "id" | "createdAt" | "updatedAt"> {
  id?: string;
}

export type ProductUpdateModel = Partial<ProductModelInput>;
