import { z } from "zod";

// Base schema for product category
const productCategorySchema = z.object({
  id: z.string().min(1, { message: "Category ID is required" }),
  title: z.string().min(1, { message: "Category title is required" }),
});

// Base schema for common product fields
const productBaseSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  isActive: z.boolean().default(true),
  description: z
    .string()
    .min(1, { message: "Product description is required" }),
  images: z
    .array(z.string().url({ message: "Valid image URL is required" }))
    .min(1, {
      message: "At least one product image is required",
    }),
  price: z.number().positive({ message: "Price must be greater than 0" }),
  category: productCategorySchema,
  stock: z
    .number()
    .int()
    .nonnegative({ message: "Stock must be a non-negative integer" }),
});

// Schema for creating new products
export const createProductSchema = productBaseSchema.extend({
  id: z.string().optional(),
});

// Schema for updating products
export const updateProductSchema = productBaseSchema.partial().extend({
  id: z.string().min(1, { message: "Product ID is required" }),
});

// Schema for querying products (admin)
export const productQuerySchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(10),
  sortField: z
    .enum(["name", "price", "stock", "createdAt", "updatedAt"])
    .optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),
  filters: z
    .object({
      id: z.string().optional(),
      name: z.string().optional(),
      description: z.string().optional(),
      categoryId: z.string().optional(),
      isActive: z.boolean().optional(),
    })
    .optional(),
});

// Type inference
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductQueryParams = z.infer<typeof productQuerySchema>;
