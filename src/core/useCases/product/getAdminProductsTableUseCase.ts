import { ProductEntity } from "@/core/entities/ProductEntity";
import { IProductRepository } from "@/core/interfaces/IProductRepository";
import {
  ProductQueryParams,
  productQuerySchema,
} from "@/core/schemas/productSchema";

export class GetAdminProductsTableUseCase {
  private repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  async execute(params: ProductQueryParams): Promise<{
    products: ProductEntity[];
    total: number;
  }> {
    try {
      // Validate and sanitize input parameters using Zod schema
      const validatedParams = productQuerySchema.parse(params);

      // Get products from repository
      const result =
        await this.repository.getAdminProductsTable(validatedParams);

      return result;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to get products table: ${err.message}`);
    }
  }
}
