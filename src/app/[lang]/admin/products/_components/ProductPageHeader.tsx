"use client";

import {
  Button,
  Center,
  Group,
  SegmentedControl,
  Tooltip,
} from "@mantine/core";
import { IconLayoutGrid, IconList, IconSquarePlus } from "@tabler/icons-react";
import useProductViewStore from "../_stores/useProductViewStore";

const ProductPageHeader = () => {
  const { view, toggleView } = useProductViewStore();

  return (
    <Group py="md" justify="space-between">
      <h1 className="text-2xl font-semibold">Products</h1>
      <Group gap="xl">
        <SegmentedControl
          bg="transparent"
          size="md"
          value={view}
          onChange={(value) => toggleView(value as "table" | "grid")}
          data={[
            {
              value: "table",
              label: (
                <Tooltip label="Table View">
                  <Center>
                    <IconList size={18} />
                  </Center>
                </Tooltip>
              ),
            },
            {
              value: "grid",
              label: (
                <Tooltip label="Grid View">
                  <Center>
                    <IconLayoutGrid size={18} />
                  </Center>
                </Tooltip>
              ),
            },
          ]}
        />
        <Button leftSection={<IconSquarePlus />}>Add Product</Button>
      </Group>
    </Group>
  );
};

export default ProductPageHeader;
