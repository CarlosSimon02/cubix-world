import {
  ProductEntity,
  ProductEntityInput,
  ProductUpdateEntity,
} from "@/core/entities/ProductEntity";
import { IProductRepository } from "@/core/interfaces/IProductRepository";
import { ProductQueryParams } from "@/core/schemas/productSchema";
import { timestampToDate } from "@/utils/date";
import { Timestamp } from "firebase-admin/firestore";
import { ProductDatasource } from "../datasources/productDatasource";
import {
  ProductModel,
  ProductModelInput,
  ProductUpdateModel,
} from "../models/productModel";

export class ProductRepository implements IProductRepository {
  private datasource: ProductDatasource;

  constructor(datasource: ProductDatasource) {
    this.datasource = datasource;
  }

  // Admin: Create a new product
  async createProduct(product: ProductEntityInput): Promise<ProductEntity> {
    try {
      const productModel = this.mapProductEntityInputToModel(product);
      const createdProduct = await this.datasource.createProduct(productModel);
      return this.mapProductModelToEntity(createdProduct);
    } catch (error) {
      const err = error as Error;
      throw new Error(`Repository error creating product: ${err.message}`);
    }
  }

  // Admin: Get a product by ID
  async getProductById(id: string): Promise<ProductEntity | null> {
    try {
      const product = await this.datasource.getProductById(id);
      if (!product) return null;
      return this.mapProductModelToEntity(product);
    } catch (error) {
      const err = error as Error;
      throw new Error(`Repository error getting product: ${err.message}`);
    }
  }

  // Admin: Update a product
  async updateProduct(
    id: string,
    updates: ProductUpdateEntity
  ): Promise<ProductEntity> {
    try {
      const updateModel = this.mapProductUpdateEntityToModel(updates);
      const updatedProduct = await this.datasource.updateProduct(
        id,
        updateModel
      );
      return this.mapProductModelToEntity(updatedProduct);
    } catch (error) {
      const err = error as Error;
      throw new Error(`Repository error updating product: ${err.message}`);
    }
  }

  // Admin: Delete a product
  async deleteProduct(id: string): Promise<void> {
    try {
      await this.datasource.deleteProduct(id);
    } catch (error) {
      const err = error as Error;
      throw new Error(`Repository error deleting product: ${err.message}`);
    }
  }

  // Admin: Toggle product active status
  async toggleProductStatus(id: string): Promise<ProductEntity> {
    try {
      const updatedProduct = await this.datasource.toggleProductStatus(id);
      return this.mapProductModelToEntity(updatedProduct);
    } catch (error) {
      const err = error as Error;
      throw new Error(
        `Repository error toggling product status: ${err.message}`
      );
    }
  }

  // Admin: Get products for admin table
  async getAdminProductsTable(params: ProductQueryParams): Promise<{
    products: ProductEntity[];
    total: number;
  }> {
    try {
      // Map filter properties from Entity schema to Model schema
      const filters = params.filters
        ? {
            id: params.filters.id,
            name: params.filters.name,
            description: params.filters.description,
            categoryId: params.filters.categoryId,
            isActive: params.filters.isActive,
          }
        : undefined;

      // Call the datasource
      const result = await this.datasource.getAdminProductsTable({
        page: params.page,
        pageSize: params.pageSize,
        sortField: params.sortField,
        sortDirection: params.sortDirection,
        filters,
      });

      // Map the results from Model to Entity
      return {
        products: result.products.map((product) =>
          this.mapProductModelToEntity(product)
        ),
        total: result.total,
      };
    } catch (error) {
      const err = error as Error;
      throw new Error(
        `Repository error getting admin products table: ${err.message}`
      );
    }
  }

  // Helper: Map ProductEntity to ProductModel (for database operations)
  private mapProductEntityToModel(entity: ProductEntity): ProductModel {
    return {
      id: entity.id,
      name: entity.name,
      isActive: entity.isActive,
      description: entity.description,
      images: entity.images,
      price: entity.price,
      category: entity.category,
      stock: entity.stock,
      createdAt: entity.createdAt
        ? Timestamp.fromDate(entity.createdAt)
        : Timestamp.now(),
      updatedAt: entity.updatedAt
        ? Timestamp.fromDate(entity.updatedAt)
        : Timestamp.now(),
    };
  }

  // Helper: Map ProductEntityInput to ProductModelInput (for create operations)
  private mapProductEntityInputToModel(
    entity: ProductEntityInput
  ): ProductModelInput {
    return {
      id: entity.id,
      name: entity.name,
      isActive: entity.isActive,
      description: entity.description,
      images: entity.images,
      price: entity.price,
      category: entity.category,
      stock: entity.stock,
    };
  }

  // Helper: Map ProductUpdateEntity to ProductUpdateModel (for update operations)
  private mapProductUpdateEntityToModel(
    entity: ProductUpdateEntity
  ): ProductUpdateModel {
    // Filter out undefined values
    const result: ProductUpdateModel = {};

    if (entity.name !== undefined) result.name = entity.name;
    if (entity.isActive !== undefined) result.isActive = entity.isActive;
    if (entity.description !== undefined)
      result.description = entity.description;
    if (entity.images !== undefined) result.images = entity.images;
    if (entity.price !== undefined) result.price = entity.price;
    if (entity.category !== undefined) result.category = entity.category;
    if (entity.stock !== undefined) result.stock = entity.stock;

    return result;
  }

  // Helper: Map ProductModel to ProductEntity (for client response)
  private mapProductModelToEntity(model: ProductModel): ProductEntity {
    return {
      id: model.id,
      name: model.name,
      isActive: model.isActive,
      description: model.description,
      images: model.images,
      price: model.price,
      category: model.category,
      stock: model.stock,
      createdAt: timestampToDate(model.createdAt),
      updatedAt: timestampToDate(model.updatedAt),
    };
  }
}
