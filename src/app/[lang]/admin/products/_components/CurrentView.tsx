"use client";

import useProducts from "../_hooks/useProducts";
import useProductViewStore from "../_stores/useProductViewStore";
import ProductsGrid from "./ProductsGrid";
import ProductsTable from "./ProductsTable";

const CurrentView = () => {
  const { view } = useProductViewStore();

  const {
    products,
    total,
    isLoading,
    page,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    handleFilter,
    handleSort,
    filters,
  } = useProducts();

  return view === "table" ? (
    <ProductsTable
      products={products}
      total={total}
      isLoading={isLoading}
      page={page}
      pageSize={pageSize}
      handlePageChange={handlePageChange}
      handlePageSizeChange={handlePageSizeChange}
      handleFilter={handleFilter}
      handleSort={handleSort}
      filters={filters}
    />
  ) : (
    <ProductsGrid
      products={products}
      total={total}
      isLoading={isLoading}
      page={page}
      pageSize={pageSize}
      handlePageChange={handlePageChange}
      handleFilter={handleFilter}
      filters={filters}
    />
  );
};

export default CurrentView;
