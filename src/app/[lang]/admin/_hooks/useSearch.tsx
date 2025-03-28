"use client";

import { useDictionary } from "@/presentation/contexts/DictionaryContext";
import handleServerActionResponse from "@/utils/handleServerActionResponse";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Avatar } from "primereact/avatar";
import { useEffect, useState } from "react";
import searchCouriersAction from "../_actions/searchCouriersAction";
import searchOrdersAction from "../_actions/searchOrdersAction";
import searchStoresAction from "../_actions/searchStoresAction";

type OptionGroup = {
  value: string;
  label: string | React.ReactNode;
};

type Options = {
  label: string | React.ReactNode;
  options: OptionGroup[];
};

const Label = ({ title }: { title: string }) => {
  const t = useDictionary();

  return (
    <div className="border-surface-border mb-2 flex items-center justify-between border-b-1 pb-2">
      <span className="text-base font-semibold">{title}</span>
      <Link
        href={`/${title.toLowerCase()}`}
        className="text-primary hover:text-primary-hover text-sm"
      >
        {t.search.more}
      </Link>
    </div>
  );
};

const renderItem = (title: string, imageUrl: string, link: string) => ({
  value: title,
  label: (
    <Link
      href={link}
      className="align-items-center hover:bg-surface-hover flex p-2"
    >
      {imageUrl && (
        <Avatar
          image={imageUrl}
          size="large"
          shape="circle"
          className="mr-3 min-w-[2rem]"
        />
      )}
      <span className="text-color">{title}</span>
    </Link>
  ),
});

const useSearch = (value: string) => {
  const [options, setOptions] = useState<Options[]>([]);
  const t = useDictionary();

  const { data: orders } = useQuery({
    queryKey: ["search", "orders", value],
    queryFn: async () =>
      handleServerActionResponse(await searchOrdersAction(value)),
  });

  const { data: stores } = useQuery({
    queryKey: ["search", "stores", value],
    queryFn: async () =>
      handleServerActionResponse(await searchStoresAction(value)),
  });

  const { data: couriers } = useQuery({
    queryKey: ["search", "couriers", value],
    queryFn: async () =>
      handleServerActionResponse(await searchCouriersAction(value)),
  });

  useEffect(() => {
    const newOptions: Options[] = [];

    if (orders?.length) {
      newOptions.push({
        label: <Label title={t.orders.orders} />,
        options: orders.map((item) =>
          renderItem(
            `${item.store.title} / #${item.orderNumber}`,
            item?.products?.[0]?.images?.[0]?.url ||
              "/images/default-order-img.png",
            `/orders/show/${item.id}`
          )
        ),
      });
    }

    if (stores?.length) {
      newOptions.push({
        label: <Label title={t.stores.stores} />,
        options: stores.map((item) =>
          renderItem(item.title, "", `/stores/edit/${item.id}`)
        ),
      });
    }

    if (couriers?.length) {
      newOptions.push({
        label: <Label title={t.couriers.couriers} />,
        options: couriers.map((item) =>
          renderItem(
            `${item.name} ${item.surname}`,
            item.avatar[0]?.url,
            `/couriers/show/${item.id}`
          )
        ),
      });
    }

    setOptions(newOptions);
  }, [orders, stores, couriers, t]);

  return { options };
};

export default useSearch;
