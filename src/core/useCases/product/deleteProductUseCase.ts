import { IProductRepository } from "@/core/interfaces/IProductRepository";

export class DeleteProductUseCase {
  private repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<void> {
    try {
      if (!id) {
        throw new Error("Product ID is required");
      }

      // Verify product exists
      const existingProduct = await this.repository.getProductById(id);
      if (!existingProduct) {
        throw new Error(`Product with ID ${id} not found`);
      }

      // Delete the product
      await this.repository.deleteProduct(id);
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to delete product: ${err.message}`);
    }
  }
}
