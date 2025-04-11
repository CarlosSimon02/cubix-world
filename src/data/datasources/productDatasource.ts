import { adminFirestore } from "@/services/firebase/firebaseAdmin";
import { FieldValue, Query } from "firebase-admin/firestore";
import {
  ProductModel,
  ProductModelInput,
  ProductUpdateModel,
} from "../models/productModel";

export class ProductDatasource {
  private readonly productsCollection = adminFirestore
    .collection("cms")
    .doc("products")
    .collection("items");

  // Admin: Create a new product
  async createProduct(product: ProductModelInput): Promise<ProductModel> {
    try {
      const productId = product.id || this.productsCollection.doc().id;

      // Create a clean version of the product without the server timestamp fields
      const productData = { ...product };
      delete productData.id;

      // Prepare the new product with server timestamps
      await this.productsCollection.doc(productId).set({
        ...productData,
        id: productId,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });

      // Retrieve the document to get the server timestamps
      const productDoc = await this.productsCollection.doc(productId).get();
      if (!productDoc.exists) {
        throw new Error(
          `Failed to retrieve created product with ID: ${productId}`
        );
      }

      return productDoc.data() as ProductModel;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to create product: ${err.message}`);
    }
  }

  // Admin: Get a product by ID
  async getProductById(id: string): Promise<ProductModel | null> {
    try {
      const doc = await this.productsCollection.doc(id).get();
      if (!doc.exists) return null;
      return doc.data() as ProductModel;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to get product: ${err.message}`);
    }
  }

  // Admin: Update a product
  async updateProduct(
    id: string,
    updates: ProductUpdateModel
  ): Promise<ProductModel> {
    try {
      const updateData = {
        ...updates,
        updatedAt: FieldValue.serverTimestamp(),
      };

      await this.productsCollection.doc(id).update(updateData);

      // Retrieve the updated document
      const updatedDoc = await this.productsCollection.doc(id).get();
      if (!updatedDoc.exists) {
        throw new Error(`Product with ID ${id} not found after update`);
      }

      return updatedDoc.data() as ProductModel;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to update product: ${err.message}`);
    }
  }

  // Admin: Delete a product
  async deleteProduct(id: string): Promise<void> {
    try {
      await this.productsCollection.doc(id).delete();
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to delete product: ${err.message}`);
    }
  }

  // Admin: Toggle product active status
  async toggleProductStatus(id: string): Promise<ProductModel> {
    try {
      const doc = await this.productsCollection.doc(id).get();
      if (!doc.exists) {
        throw new Error(`Product with ID ${id} not found`);
      }

      const productData = doc.data() as ProductModel;
      const newStatus = !productData.isActive;

      await this.productsCollection.doc(id).update({
        isActive: newStatus,
        updatedAt: FieldValue.serverTimestamp(),
      });

      // Retrieve the updated document
      const updatedDoc = await this.productsCollection.doc(id).get();
      return updatedDoc.data() as ProductModel;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to toggle product status: ${err.message}`);
    }
  }

  // Admin: Get products for admin table with filtering, sorting, and pagination
  async getAdminProductsTable(params: {
    page: number;
    pageSize: number;
    sortField?: string;
    sortDirection?: "asc" | "desc";
    filters?: {
      id?: string;
      name?: string;
      description?: string;
      categoryId?: string;
      isActive?: boolean;
    };
  }): Promise<{ products: ProductModel[]; total: number }> {
    try {
      // Start with the base query
      let query: Query = this.productsCollection;

      // Apply filters
      if (params.filters) {
        if (params.filters.id) {
          // For ID, we need to use startsWith since exact match might be too restrictive
          const idEnd = params.filters.id + "\uf8ff";
          query = query
            .where("id", ">=", params.filters.id)
            .where("id", "<=", idEnd);
        }

        if (params.filters.categoryId) {
          query = query.where("category.id", "==", params.filters.categoryId);
        }

        if (typeof params.filters.isActive === "boolean") {
          query = query.where("isActive", "==", params.filters.isActive);
        }

        // String contains filters need to be handled in-memory after fetching
      }

      // Get total count (for pagination)
      const totalQuery = query;
      const totalSnapshot = await totalQuery.count().get();
      const total = totalSnapshot.data().count;

      // Apply sorting
      if (params.sortField && params.sortDirection) {
        query = query.orderBy(params.sortField, params.sortDirection);
      } else {
        // Default sorting by createdAt descending if no sort specified
        query = query.orderBy("createdAt", "desc");
      }

      // Apply pagination
      query = query
        .offset((params.page - 1) * params.pageSize)
        .limit(params.pageSize);

      // Execute query
      const snapshot = await query.get();
      let products = snapshot.docs.map((doc) => doc.data() as ProductModel);

      // Apply in-memory filtering for text contains operations
      if (params.filters) {
        if (params.filters.name) {
          products = products.filter((product) =>
            product.name
              .toLowerCase()
              .includes(params.filters!.name!.toLowerCase())
          );
        }

        if (params.filters.description) {
          products = products.filter((product) =>
            product.description
              .toLowerCase()
              .includes(params.filters!.description!.toLowerCase())
          );
        }
      }

      return { products, total };
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to fetch products: ${err.message}`);
    }
  }
}
