import {
  ProductEntity,
  ProductEntityInput,
} from "@/core/entities/ProductEntity";
import { IProductRepository } from "@/core/interfaces/IProductRepository";
import { createProductSchema } from "@/core/schemas/productSchema";

export class CreateProductUseCase {
  private repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  async execute(productData: ProductEntityInput): Promise<ProductEntity> {
    try {
      // Validate input data using Zod schema
      const validatedData = createProductSchema.parse(productData);

      // Create the product
      const product = await this.repository.createProduct(validatedData);

      return product;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to create product: ${err.message}`);
    }
  }
}
