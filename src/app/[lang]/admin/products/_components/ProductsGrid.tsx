"use client";

import { mockData } from "@/app/_temp/temp-data";
import { IProduct } from "@/app/_temp/temp-interfaces";
import {
  ActionIcon,
  Badge,
  Card,
  Center,
  Grid,
  Group,
  Image,
  Pagination,
  Paper,
  Radio,
  Text,
} from "@mantine/core";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";

type ProductsGridProps = {
  products: IProduct[];
  total: number;
  isLoading: boolean;
  page: number;
  pageSize: number;
  handlePageChange: (page: number) => void;
  handleFilter: (column: string, value: string | boolean) => void;
  filters: {
    id: string | undefined;
    name: string | undefined;
    description: string | undefined;
    category: string | undefined;
    status: boolean | undefined;
  };
};

// Radio Card component for better category visualization
function CategoryRadioCard({
  value,
  label,
  checked,
  onChange,
}: {
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <Paper withBorder p="md" radius="md" onClick={onChange}>
      <Radio
        checked={checked}
        onChange={onChange}
        value={value}
        label={null}
        styles={{ root: { cursor: "pointer" } }}
      />
      <Text size="sm" fw={500} mt={5} ta="center">
        {label}
      </Text>
    </Paper>
  );
}

const ProductsGrid = ({
  products,
  total,
  isLoading,
  page,
  pageSize,
  handlePageChange,
  handleFilter,
  filters,
}: ProductsGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    filters.category || ""
  );

  // Category filter options with "All" option
  const categoryOptions = [
    { value: "", label: "All Categories" },
    ...mockData.categories.map((c) => ({ value: c.id, label: c.title })),
  ];

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    handleFilter("category", value);
  };

  // Update selected category when filters change
  useEffect(() => {
    setSelectedCategory(filters.category || "");
  }, [filters.category]);

  return (
    <div>
      {/* Category Filters */}
      <Grid mb="xl" justify="center">
        {categoryOptions.map((category) => (
          <Grid.Col
            key={category.value}
            span={{ base: 6, xs: 4, sm: 3, md: 2 }}
          >
            <CategoryRadioCard
              value={category.value}
              label={category.label}
              checked={selectedCategory === category.value}
              onChange={() => handleCategoryChange(category.value)}
            />
          </Grid.Col>
        ))}
      </Grid>

      {/* Products Grid */}
      {isLoading ? (
        <Center p="xl">
          <Text>Loading products...</Text>
        </Center>
      ) : products.length === 0 ? (
        <Center p="xl">
          <Text>No products found</Text>
        </Center>
      ) : (
        <Grid>
          {products.map((product) => (
            <Grid.Col key={product.id} span={{ base: 12, xs: 6, md: 4, lg: 3 }}>
              <Card withBorder radius="md" p="md">
                <Card.Section>
                  <Image
                    src={
                      product.images[0]?.thumbnailUrl ||
                      "/placeholder-product.jpg"
                    }
                    alt={product.name}
                    height={180}
                    fit="cover"
                  />
                </Card.Section>

                <Card.Section mt="md">
                  <Group justify="apart">
                    <Text fw={500} fz="lg" lineClamp={1}>
                      {product.name}
                    </Text>
                    <Badge
                      size="sm"
                      color={product.isActive ? "teal" : "red"}
                      variant="light"
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </Group>
                  <Text fz="xl" fw={700} c="blue" mt="xs">
                    ₱{product.price.toFixed(2)}
                  </Text>
                  <Text fz="sm" mt="xs" lineClamp={2} c="dimmed">
                    {product.description}
                  </Text>
                </Card.Section>

                <Card.Section mt="auto">
                  <Group justify="space-between" mt="md">
                    <Badge size="sm" variant="light">
                      {product.category.title}
                    </Badge>
                    <Group gap={8}>
                      <ActionIcon variant="subtle" color="blue">
                        <IconEye size={16} />
                      </ActionIcon>
                      <ActionIcon variant="subtle" color="green">
                        <IconPencil size={16} />
                      </ActionIcon>
                      <ActionIcon variant="subtle" color="red">
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Group>
                </Card.Section>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {products.length > 0 && (
        <Center mt="xl">
          <Pagination
            total={Math.ceil(total / pageSize)}
            value={page}
            onChange={handlePageChange}
          />
        </Center>
      )}
    </div>
  );
};

export default ProductsGrid;
