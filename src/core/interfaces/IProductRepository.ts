import {
  ProductEntity,
  ProductEntityInput,
  ProductUpdateEntity,
} from "../entities/ProductEntity";
import { ProductQueryParams } from "../schemas/productSchema";

export interface IProductRepository {
  // Admin operations
  createProduct(product: ProductEntityInput): Promise<ProductEntity>;
  getProductById(id: string): Promise<ProductEntity | null>;
  updateProduct(
    id: string,
    updates: ProductUpdateEntity
  ): Promise<ProductEntity>;
  deleteProduct(id: string): Promise<void>;
  toggleProductStatus(id: string): Promise<ProductEntity>;
  getAdminProductsTable(params: ProductQueryParams): Promise<{
    products: ProductEntity[];
    total: number;
  }>;
}
