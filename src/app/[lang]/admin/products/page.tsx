"use client";

import { mockData } from "@/app/_temp/temp-data";
import { IProduct } from "@/app/_temp/temp-interfaces";
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Center,
  CopyButton,
  Group,
  SegmentedControl,
  Select,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import {
  IconArrowDown,
  IconArrowsSort,
  IconArrowUp,
  IconCheck,
  IconCopy,
  IconEye,
  IconLayoutGrid,
  IconList,
  IconSquarePlus,
  IconX,
} from "@tabler/icons-react";
import {
  DataTable,
  DataTableColumn,
  type DataTableSortStatus,
} from "mantine-datatable";
import React, { useMemo, useState } from "react";
import useProducts from "./_hooks/useProducts";

const ProductsPage = () => {
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

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<IProduct>>({
    columnAccessor: "name",
    direction: "asc",
  });

  const categoryOptions = useMemo(
    () => mockData.categories.map((c) => ({ value: c.id, label: c.title })),
    []
  );

  const handleSortStatusChange = (status: DataTableSortStatus<IProduct>) => {
    setSortStatus(status);
    handleSort(status.columnAccessor as keyof IProduct);
  };

  const renderSortIcon = (column: keyof IProduct) => {
    if (sortStatus.columnAccessor === column) {
      return sortStatus.direction === "asc" ? (
        <IconArrowUp size={14} />
      ) : (
        <IconArrowDown size={14} />
      );
    }
    return <IconArrowsSort size={14} />;
  };

  const columns: DataTableColumn<IProduct>[] = [
    {
      accessor: "id",
      width: 150,
      titleClassName:
        "relative pr-4 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[60%] after:w-px after:bg-gray-400 dark:after:bg-dark-400 last:after:hidden",
      title: (
        <Group gap="xs" w={"100%"} justify="space-between">
          <Text size="sm" className="font-semibold">
            ID
          </Text>
          <ActionIcon
            className="mantine-datatable-header-cell-filter-action-icon"
            size="sm"
            variant="default"
            onClick={() =>
              handleSortStatusChange({
                columnAccessor: "id",
                direction:
                  sortStatus.columnAccessor === "id"
                    ? sortStatus.direction === "asc"
                      ? "desc"
                      : "asc"
                    : "asc",
              })
            }
          >
            {renderSortIcon("id")}
          </ActionIcon>
        </Group>
      ),

      sortable: false,
      render: ({ id }) => (
        <Group gap="xs">
          <Text size="sm">{id.substring(0, 8)}</Text>
          <CopyButton value={id} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copied" : "Copy"}
                withArrow
                position="right"
              >
                <ActionIcon
                  color={copied ? "teal" : "gray"}
                  variant="subtle"
                  opacity={0.5}
                  onClick={copy}
                >
                  {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Group>
      ),
      filter: (
        <TextInput
          placeholder="Search by ID"
          value={filters.id || ""}
          onChange={(e) => handleFilter("id", e.target.value)}
          rightSection={
            filters.id && (
              <ActionIcon
                size="sm"
                variant="transparent"
                onClick={() => handleFilter("id", "")}
              >
                <IconX size={14} />
              </ActionIcon>
            )
          }
        />
      ),
      filtering: !!filters.id,
    },
    {
      accessor: "images",
      width: 100,
      titleClassName:
        "relative pr-4 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[60%] after:w-px after:bg-gray-400 dark:after:bg-dark-400 last:after:hidden",
      title: (
        <Group gap="xs" h={40}>
          <Text size="sm" className="font-semibold">
            Image
          </Text>
        </Group>
      ),
      render: ({ images }) => (
        <Avatar src={images[0]?.thumbnailUrl} size={36} radius="sm" />
      ),
    },
    {
      accessor: "name",
      titleClassName:
        "relative pr-4 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[60%] after:w-px after:bg-gray-400 dark:after:bg-dark-400 last:after:hidden",
      title: (
        <Group gap="xs" w={"100%"} justify="space-between">
          <Text size="sm" className="font-semibold">
            Name
          </Text>
          <ActionIcon
            className="mantine-datatable-header-cell-filter-action-icon"
            size="sm"
            variant="default"
            onClick={() =>
              handleSortStatusChange({
                columnAccessor: "name",
                direction:
                  sortStatus.columnAccessor === "name"
                    ? sortStatus.direction === "asc"
                      ? "desc"
                      : "asc"
                    : "asc",
              })
            }
          >
            {renderSortIcon("name")}
          </ActionIcon>
        </Group>
      ),
      sortable: false,
      width: 200,
      render: ({ name }) => (
        <Text size="sm" lineClamp={2}>
          {name}
        </Text>
      ),
      filter: (
        <TextInput
          placeholder="Search by name"
          value={filters.name || ""}
          onChange={(e) => handleFilter("name", e.target.value)}
          rightSection={
            filters.name && (
              <ActionIcon
                size="sm"
                variant="transparent"
                onClick={() => handleFilter("name", "")}
              >
                <IconX size={14} />
              </ActionIcon>
            )
          }
        />
      ),
      filtering: !!filters.name,
    },
    {
      accessor: "description",
      width: 400,
      titleClassName:
        "relative pr-4 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[60%] after:w-px after:bg-gray-400 dark:after:bg-dark-400 last:after:hidden",
      title: (
        <Group gap="xs" w={"100%"} justify="space-between">
          <Text size="sm" className="font-semibold">
            Description
          </Text>
        </Group>
      ),
      render: ({ description }) => (
        <Text size="sm" lineClamp={2}>
          {description}
        </Text>
      ),
    },
    {
      accessor: "price",
      cellsClassName: "min-w-[140px]",
      titleClassName:
        "relative pr-4 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[60%] after:w-px after:bg-gray-400 dark:after:bg-dark-400 last:after:hidden",
      title: (
        <Group gap="xs" w={"100%"} justify="space-between">
          <Text size="sm" className="font-semibold">
            Price
          </Text>
          <ActionIcon
            className="mantine-datatable-header-cell-filter-action-icon"
            size="sm"
            variant="default"
            onClick={() =>
              handleSortStatusChange({
                columnAccessor: "price",
                direction:
                  sortStatus.columnAccessor === "price"
                    ? sortStatus.direction === "asc"
                      ? "desc"
                      : "asc"
                    : "asc",
              })
            }
          >
            {renderSortIcon("price")}
          </ActionIcon>
        </Group>
      ),
      sortable: false,
      render: ({ price }) => `₱${price.toFixed(2)}`,
    },
    {
      accessor: "category",
      title: (
        <Group gap="xs" w={"100%"} justify="space-between">
          <Text size="sm" className="font-semibold">
            Category
          </Text>
        </Group>
      ),
      titleClassName:
        "relative pr-4 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[60%] after:w-px after:bg-gray-400 dark:after:bg-dark-400 last:after:hidden",
      render: ({ category }) => category.title,
      filter: (
        <Select
          placeholder="Category"
          data={categoryOptions}
          value={filters.category}
          onChange={(value) => handleFilter("category", value || "")}
          clearable
        />
      ),
      filtering: !!filters.category,
    },
    {
      accessor: "status",
      width: 100,
      titleClassName:
        "relative pr-4 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[60%] after:w-px after:bg-gray-400 dark:after:bg-dark-400 last:after:hidden",
      title: (
        <Group gap="xs" w={"100%"} justify="space-between">
          <Text size="sm" className="font-semibold">
            Status
          </Text>
        </Group>
      ),
      render: ({ isActive }) => (
        <Badge color={isActive ? "teal" : "red"} variant="light">
          {isActive ? "Active" : "Inactive"}
        </Badge>
      ),
      filter: (
        <Select
          placeholder="Status"
          data={[
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" },
          ]}
          value={filters.status?.toString()}
          onChange={(value) => handleFilter("status", value === "true")}
          clearable
        />
      ),
      filtering: filters.status !== undefined,
    },
    {
      accessor: "actions",
      title: (
        <Group gap="xs" w={"100%"} justify="space-between">
          <Text size="sm" className="font-semibold">
            Actions
          </Text>
        </Group>
      ),
      titleClassName:
        "relative pr-4 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[60%] after:w-px after:bg-gray-400 dark:after:bg-dark-400 last:after:hidden",
      width: 75,
      render: () => (
        <Center>
          <ActionIcon variant="subtle">
            <IconEye size={16} />
          </ActionIcon>
        </Center>
      ),
    },
  ];

  return (
    <>
      <Group py="md" justify="space-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Group gap="xl">
          <SegmentedControl
            bg="transparent"
            size="md"
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

      <DataTable
        withTableBorder={false}
        borderRadius="md"
        minHeight={180}
        columns={columns}
        pinLastColumn
        rowClassName="h-16"
        records={products}
        fetching={isLoading}
        totalRecords={total}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={handlePageChange}
        recordsPerPageOptions={[10, 20, 50]}
        onRecordsPerPageChange={handlePageSizeChange}
        sortStatus={sortStatus}
        onSortStatusChange={handleSortStatusChange}
        sortIcons={{
          sorted: <React.Fragment />,
          unsorted: <React.Fragment />,
        }}
        classNames={{
          pagination: "!min-h-16",
        }}
      />
    </>
  );
};

export default ProductsPage;
