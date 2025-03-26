import { useDictionary } from "@/presentation/contexts/DictionaryContext";
import handleServerActionResponse from "@/utils/handleServerActionResponse";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Typography } from "antd";
import Link from "next/link";
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

const { Text } = Typography;

const Label = ({ title }: { title: string }) => {
  const t = useDictionary();

  const styles: Styles = {
    headerTitle: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "14px",
      fontWeight: "bold",
      borderBottom: "1px",
    },
  };

  return (
    <div style={styles.headerTitle}>
      <Text style={{ fontSize: "16px" }}>{title}</Text>
      <Link href={`/${title.toLowerCase()}`}>{t.search.more}</Link>
    </div>
  );
};

const renderItem = (title: string, imageUrl: string, link: string) => ({
  value: title,
  label: (
    <Link href={link} style={{ display: "flex", alignItems: "center" }}>
      {imageUrl && (
        <Avatar
          size={32}
          src={imageUrl}
          style={{ minWidth: "32px", marginRight: "16px" }}
        />
      )}
      <Text>{title}</Text>
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
            item?.products?.[0].images?.[0]?.url ||
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
            item.avatar[0].url,
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
