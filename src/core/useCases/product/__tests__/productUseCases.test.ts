import {
  ProductEntity,
  ProductEntityInput,
} from "@/core/entities/ProductEntity";
import { IProductRepository } from "@/core/interfaces/IProductRepository";
import { ProductQueryParams } from "@/core/schemas/productSchema";
import { CreateProductUseCase } from "../createProductUseCase";
import { GetProductUseCase } from "../getProductUseCase";

// Mock repository implementation
class MockProductRepository implements IProductRepository {
  private products: ProductEntity[] = [];

  async createProduct(product: ProductEntityInput): Promise<ProductEntity> {
    const newProduct: ProductEntity = {
      ...product,
      id: product.id || `product-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async getProductById(id: string): Promise<ProductEntity | null> {
    const product = this.products.find((p) => p.id === id);
    return product || null;
  }

  async updateProduct(
    id: string,
    updates: Partial<ProductEntityInput>
  ): Promise<ProductEntity> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found`);
    }

    const updatedProduct: ProductEntity = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date(),
    };

    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found`);
    }

    this.products.splice(index, 1);
  }

  async toggleProductStatus(id: string): Promise<ProductEntity> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found`);
    }

    const updatedProduct: ProductEntity = {
      ...this.products[index],
      isActive: !this.products[index].isActive,
      updatedAt: new Date(),
    };

    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  async getAdminProductsTable(params: ProductQueryParams): Promise<{
    products: ProductEntity[];
    total: number;
  }> {
    // Apply filters
    let filteredProducts = [...this.products];

    if (params.filters) {
      if (params.filters.id) {
        filteredProducts = filteredProducts.filter((p) =>
          p.id.includes(params.filters!.id!)
        );
      }

      if (params.filters.name) {
        filteredProducts = filteredProducts.filter((p) =>
          p.name.toLowerCase().includes(params.filters!.name!.toLowerCase())
        );
      }

      if (params.filters.description) {
        filteredProducts = filteredProducts.filter((p) =>
          p.description
            .toLowerCase()
            .includes(params.filters!.description!.toLowerCase())
        );
      }

      if (params.filters.categoryId) {
        filteredProducts = filteredProducts.filter(
          (p) => p.category.id === params.filters!.categoryId
        );
      }

      if (typeof params.filters.isActive === "boolean") {
        filteredProducts = filteredProducts.filter(
          (p) => p.isActive === params.filters!.isActive
        );
      }
    }

    // Apply sorting
    if (params.sortField && params.sortDirection) {
      filteredProducts.sort((a, b) => {
        const aValue = a[params.sortField!];
        const bValue = b[params.sortField!];

        const comparison =
          typeof aValue === "string"
            ? aValue.localeCompare(String(bValue))
            : (aValue as number) - (bValue as number);

        return params.sortDirection === "asc" ? comparison : -comparison;
      });
    }

    // Apply pagination
    const total = filteredProducts.length;
    const start = (params.page - 1) * params.pageSize;
    const end = start + params.pageSize;
    const paginatedProducts = filteredProducts.slice(start, end);

    return {
      products: paginatedProducts,
      total,
    };
  }
}

describe("Product Use Cases", () => {
  let repository: MockProductRepository;
  let createProductUseCase: CreateProductUseCase;
  let getProductUseCase: GetProductUseCase;

  beforeEach(() => {
    repository = new MockProductRepository();
    createProductUseCase = new CreateProductUseCase(repository);
    getProductUseCase = new GetProductUseCase(repository);
  });

  describe("CreateProductUseCase", () => {
    it("should create a new product", async () => {
      const productInput: ProductEntityInput = {
        name: "Test Product",
        isActive: true,
        description: "Test description",
        images: ["https://example.com/image.jpg"],
        price: 99.99,
        category: {
          id: "category-1",
          title: "Test Category",
        },
        stock: 10,
      };

      const result = await createProductUseCase.execute(productInput);

      expect(result).toHaveProperty("id");
      expect(result.name).toBe(productInput.name);
      expect(result.isActive).toBe(productInput.isActive);
      expect(result.description).toBe(productInput.description);
      expect(result.images).toEqual(productInput.images);
      expect(result.price).toBe(productInput.price);
      expect(result.category).toEqual(productInput.category);
      expect(result.stock).toBe(productInput.stock);
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it("should throw an error for invalid input", async () => {
      const invalidInput = {
        name: "",
        isActive: true,
        description: "Test description",
        images: [],
        price: -10,
        category: {
          id: "",
          title: "",
        },
        stock: -5,
      } as ProductEntityInput;

      await expect(
        createProductUseCase.execute(invalidInput)
      ).rejects.toThrow();
    });
  });

  describe("GetProductUseCase", () => {
    it("should get a product by ID", async () => {
      // Create a product first
      const productInput: ProductEntityInput = {
        name: "Test Product",
        isActive: true,
        description: "Test description",
        images: ["https://example.com/image.jpg"],
        price: 99.99,
        category: {
          id: "category-1",
          title: "Test Category",
        },
        stock: 10,
      };

      const createdProduct = await createProductUseCase.execute(productInput);

      // Get the product
      const result = await getProductUseCase.execute(createdProduct.id);

      expect(result).not.toBeNull();
      expect(result!.id).toBe(createdProduct.id);
      expect(result!.name).toBe(productInput.name);
    });

    it("should return null for non-existent product", async () => {
      const result = await getProductUseCase.execute("non-existent-id");
      expect(result).toBeNull();
    });
  });

  // More tests for other use cases...
});
