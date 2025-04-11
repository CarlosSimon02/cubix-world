import { ProductEntity } from "@/core/entities/ProductEntity";
import { IProductRepository } from "@/core/interfaces/IProductRepository";

export class ToggleProductStatusUseCase {
  private repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<ProductEntity> {
    try {
      if (!id) {
        throw new Error("Product ID is required");
      }

      // Verify product exists
      const existingProduct = await this.repository.getProductById(id);
      if (!existingProduct) {
        throw new Error(`Product with ID ${id} not found`);
      }

      // Toggle the product status
      const updatedProduct = await this.repository.toggleProductStatus(id);

      return updatedProduct;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to toggle product status: ${err.message}`);
    }
  }
}
