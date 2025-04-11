import { CreateProductUseCase } from "@/core/useCases/product/createProductUseCase";
import { DeleteProductUseCase } from "@/core/useCases/product/deleteProductUseCase";
import { GetAdminProductsTableUseCase } from "@/core/useCases/product/getAdminProductsTableUseCase";
import { GetProductUseCase } from "@/core/useCases/product/getProductUseCase";
import { ToggleProductStatusUseCase } from "@/core/useCases/product/toggleProductStatusUseCase";
import { UpdateProductUseCase } from "@/core/useCases/product/updateProductUseCase";
import { ProductDatasource } from "@/data/datasources/productDatasource";
import { ProductRepository } from "@/data/repositories/productRepository";

const productDatasource = new ProductDatasource();
const productRepository = new ProductRepository(productDatasource);

export const createProductUseCase = new CreateProductUseCase(productRepository);
export const getProductUseCase = new GetProductUseCase(productRepository);
export const getAdminProductsTableUseCase = new GetAdminProductsTableUseCase(
  productRepository
);
export const updateProductUseCase = new UpdateProductUseCase(productRepository);
export const deleteProductUseCase = new DeleteProductUseCase(productRepository);
export const toggleProductStatusUseCase = new ToggleProductStatusUseCase(
  productRepository
);

export { productDatasource, productRepository };
