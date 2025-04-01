"use client";

import { IProduct } from "@/app/_temp/temp-interfaces";
import handleServerActionResponse from "@/utils/handleServerActionResponse";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import getProductsAction from "../_actions/getProductsAction";

const useProducts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current params from URL
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const sortField =
    (searchParams.get("sortField") as keyof IProduct) || undefined;
  const sortDirection =
    (searchParams.get("sortDirection") as "asc" | "desc") || undefined;

  // Parse filters from URL
  const filters = useMemo(
    () => ({
      id: searchParams.get("id") || undefined,
      name: searchParams.get("name") || undefined,
      description: searchParams.get("description") || undefined,
      category: searchParams.get("category") || undefined,
      status: searchParams.get("status")
        ? searchParams.get("status") === "true"
        : undefined,
    }),
    [searchParams]
  );

  // Update URL params
  const updateParams = useCallback(
    (newParams: Record<string, string | number | undefined>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      router.replace(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page, pageSize, sortField, sortDirection, filters],
    queryFn: async () =>
      handleServerActionResponse(
        await getProductsAction({
          page,
          pageSize,
          sortField,
          sortDirection,
          filters,
        })
      ),
  });

  // Pagination handlers
  const handlePageChange = (newPage: number) => updateParams({ page: newPage });

  const handlePageSizeChange = (newSize: number) =>
    updateParams({ pageSize: newSize, page: 1 });

  // Sorting handler
  const handleSort = (newSortField: keyof IProduct) => {
    const isSameField = newSortField === sortField;
    const newDirection =
      isSameField && sortDirection === "asc" ? "desc" : "asc";
    updateParams({
      sortField: newSortField,
      sortDirection: newDirection,
    });
  };

  // Filter handlers
  const handleFilter = (filterName: string, value: string | boolean) =>
    updateParams({ [filterName]: value ? String(value) : undefined, page: 1 });
  return {
    products: data?.products || [],
    total: data?.total || 0,
    isLoading,
    error,
    page,
    pageSize,
    sortField,
    sortDirection,
    filters,
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    handleFilter,
  };
};

export default useProducts;
