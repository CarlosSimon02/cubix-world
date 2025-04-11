import { ProductEntity } from "@/core/entities/ProductEntity";
import { IProductRepository } from "@/core/interfaces/IProductRepository";

export class GetProductUseCase {
  private repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<ProductEntity | null> {
    try {
      if (!id) {
        throw new Error("Product ID is required");
      }

      const product = await this.repository.getProductById(id);
      return product;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to get product: ${err.message}`);
    }
  }
}
