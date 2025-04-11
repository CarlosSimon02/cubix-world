import {
  ProductEntity,
  ProductUpdateEntity,
} from "@/core/entities/ProductEntity";
import { IProductRepository } from "@/core/interfaces/IProductRepository";
import { updateProductSchema } from "@/core/schemas/productSchema";

export class UpdateProductUseCase {
  private repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  async execute(
    id: string,
    updates: ProductUpdateEntity
  ): Promise<ProductEntity> {
    try {
      if (!id) {
        throw new Error("Product ID is required");
      }

      // Verify product exists
      const existingProduct = await this.repository.getProductById(id);
      if (!existingProduct) {
        throw new Error(`Product with ID ${id} not found`);
      }

      // Validate update data with id
      // Just validate without assigning to a variable
      updateProductSchema.partial().parse({
        id,
        ...updates,
      });

      // Update the product
      const updatedProduct = await this.repository.updateProduct(id, updates);

      return updatedProduct;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to update product: ${err.message}`);
    }
  }
}
