import { mockData } from "@/app/_temp/temp-data";
import { IProduct } from "@/app/_temp/temp-interfaces";
import getServerActionError from "@/utils/getServerActionError";

interface GetProductsParams {
  page: number;
  pageSize: number;
  sortField?: keyof IProduct;
  sortDirection?: "asc" | "desc";
  filters?: {
    id?: string;
    name?: string;
    description?: string;
    category?: string;
    status?: boolean;
  };
}

const getProductsAction = async (
  params: GetProductsParams
): Promise<ServerActionResponse<{ products: IProduct[]; total: number }>> => {
  try {
    // Filtering
    const filteredProducts = mockData.products.filter((product) => {
      if (params.filters?.id && !product.id.includes(params.filters.id))
        return false;
      if (
        params.filters?.name &&
        !product.name.toLowerCase().includes(params.filters.name.toLowerCase())
      )
        return false;
      if (
        params.filters?.description &&
        !product.description
          .toLowerCase()
          .includes(params.filters.description.toLowerCase())
      )
        return false;
      if (
        params.filters?.category &&
        product.category.id !== params.filters.category
      )
        return false;
      if (
        typeof params.filters?.status !== "undefined" &&
        product.isActive !== params.filters.status
      )
        return false;
      return true;
    });

    // Sorting
    if (params.sortField && params.sortDirection) {
      filteredProducts.sort((a, b) => {
        const aValue = a[params.sortField!];
        const bValue = b[params.sortField!];

        if (typeof aValue === "number" && typeof bValue === "number") {
          return params.sortDirection === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        return (
          String(aValue).localeCompare(String(bValue)) *
          (params.sortDirection === "asc" ? 1 : -1)
        );
      });
    }

    // Pagination
    const total = filteredProducts.length;
    const start = (params.page - 1) * params.pageSize;
    const end = start + params.pageSize;
    const paginatedProducts = filteredProducts.slice(start, end);

    return {
      data: {
        products: paginatedProducts,
        total,
      },
      error: null,
    };
  } catch (error) {
    return getServerActionError(error);
  }
};

export default getProductsAction;
