"use client";

import { useDictionary } from "@/presentation/contexts/DictionaryContext";
import handleServerActionResponse from "@/utils/handleServerActionResponse";
import { ComboboxStringData } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import searchCouriersAction from "../_actions/searchCouriersAction";
import searchOrdersAction from "../_actions/searchOrdersAction";
import searchStoresAction from "../_actions/searchStoresAction";

export type RenderItemData = {
  id: string;
  image?: string;
  title: string;
  subtitle?: string;
};

const useSearch = (value: string) => {
  const [autocompleteData, setAutoCompleteData] = useState<ComboboxStringData>(
    []
  );
  const [renderItemData, setRenderItemData] = useState<RenderItemData[]>([]);
  const t = useDictionary();

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["search", "orders", value],
    queryFn: async () =>
      handleServerActionResponse(await searchOrdersAction(value)),
  });

  const { data: stores, isLoading: storesLoading } = useQuery({
    queryKey: ["search", "stores", value],
    queryFn: async () =>
      handleServerActionResponse(await searchStoresAction(value)),
  });

  const { data: couriers, isLoading: couriersLoading } = useQuery({
    queryKey: ["search", "couriers", value],
    queryFn: async () =>
      handleServerActionResponse(await searchCouriersAction(value)),
  });

  const isLoading = ordersLoading || storesLoading || couriersLoading;

  useEffect(() => {
    const newAutocompleteData: ComboboxStringData = [
      {
        group: "Orders",
        items: orders?.map((item) => item.id.toString()) || [],
      },
      {
        group: "Stores",
        items: stores?.map((item) => item.id.toString()) || [],
      },
      {
        group: "Couriers",
        items: couriers?.map((item) => item.id.toString()) || [],
      },
    ];

    const newRenderItemData: RenderItemData[] = [
      ...(orders || []).map((item) => ({
        id: item.id.toString(),
        image: item.user.avatar[0].url,
        title: item.user.fullName,
        subtitle: `#${item.orderNumber}`,
      })),
      ...(stores || []).map((item) => ({
        id: item.id.toString(),
        title: item.title,
      })),
      ...(couriers || []).map((item) => ({
        id: item.id.toString(),
        image: item.avatar[0].url,
        title: item.name,
        subtitle: item.licensePlate,
      })),
    ];

    setAutoCompleteData(newAutocompleteData);
    setRenderItemData(newRenderItemData);
  }, [orders, stores, couriers, t]);

  return { autocompleteData, isLoading, renderItemData };
};

export default useSearch;
