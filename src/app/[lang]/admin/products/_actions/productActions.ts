"use server";

import {
  ProductEntity,
  ProductEntityInput,
  ProductUpdateEntity,
} from "@/core/entities/ProductEntity";
import {
  CreateProductInput,
  ProductQueryParams,
  UpdateProductInput,
} from "@/core/schemas/productSchema";
import {
  createProductUseCase,
  deleteProductUseCase,
  getAdminProductsTableUseCase,
  getProductUseCase,
  toggleProductStatusUseCase,
  updateProductUseCase,
} from "@/factories/product";
import getServerActionError from "@/utils/getServerActionError";

/**
 * Create a new product (admin only)
 */
export const createProduct = async (
  productData: CreateProductInput
): Promise<ServerActionResponse<{ id: string }>> => {
  try {
    // Convert to entity input
    const productInput: ProductEntityInput = {
      name: productData.name,
      isActive: productData.isActive ?? true,
      description: productData.description,
      images: productData.images,
      price: productData.price,
      category: productData.category,
      stock: productData.stock,
    };

    // Create product using the use case
    const product = await createProductUseCase.execute(productInput);

    return {
      data: { id: product.id },
      error: null,
    };
  } catch (error) {
    return getServerActionError(error);
  }
};

/**
 * Get a product by ID (admin only)
 */
export const getProduct = async (
  id: string
): Promise<ServerActionResponse<ProductEntity>> => {
  try {
    const product = await getProductUseCase.execute(id);

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return {
      data: product,
      error: null,
    };
  } catch (error) {
    return getServerActionError(error);
  }
};

/**
 * Get products for admin table with filtering, sorting, and pagination
 */
export const getAdminProductsTable = async (
  params: ProductQueryParams
): Promise<
  ServerActionResponse<{ products: ProductEntity[]; total: number }>
> => {
  try {
    const result = await getAdminProductsTableUseCase.execute(params);

    return {
      data: result,
      error: null,
    };
  } catch (error) {
    return getServerActionError(error);
  }
};

/**
 * Update a product (admin only)
 */
export const updateProduct = async (
  id: string,
  updates: UpdateProductInput
): Promise<ServerActionResponse<ProductEntity>> => {
  try {
    // Convert to entity update
    const updateInput: ProductUpdateEntity = {
      name: updates.name,
      isActive: updates.isActive,
      description: updates.description,
      images: updates.images,
      price: updates.price,
      category: updates.category,
      stock: updates.stock,
    };

    // Update the product using the use case
    const updatedProduct = await updateProductUseCase.execute(id, updateInput);

    return {
      data: updatedProduct,
      error: null,
    };
  } catch (error) {
    return getServerActionError(error);
  }
};

/**
 * Delete a product (admin only)
 */
export const deleteProduct = async (
  id: string
): Promise<ServerActionResponse<{ success: boolean }>> => {
  try {
    await deleteProductUseCase.execute(id);

    return {
      data: { success: true },
      error: null,
    };
  } catch (error) {
    return getServerActionError(error);
  }
};

/**
 * Toggle product active status (admin only)
 */
export const toggleProductStatus = async (
  id: string
): Promise<ServerActionResponse<ProductEntity>> => {
  try {
    const updatedProduct = await toggleProductStatusUseCase.execute(id);

    return {
      data: updatedProduct,
      error: null,
    };
  } catch (error) {
    return getServerActionError(error);
  }
};
