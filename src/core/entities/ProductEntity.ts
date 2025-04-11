export interface ProductEntity {
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
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface ProductEntityInput
  extends Omit<ProductEntity, "id" | "createdAt" | "updatedAt"> {
  id?: string;
}

export type ProductUpdateEntity = Partial<ProductEntityInput>;
