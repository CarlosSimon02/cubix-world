"use client";

import { mockData } from "@/app/_temp/temp-data";
import { IProduct } from "@/app/_temp/temp-interfaces";
import AdminDataTable from "@/presentation/components/AdminDataTable";
import AdminTableHeaderTitle from "@/presentation/components/AdminDataTable/AdminTableHeaderTitle";
import {
  ActionIcon,
  Avatar,
  Badge,
  Center,
  CopyButton,
  Group,
  Select,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconCopy, IconEye, IconX } from "@tabler/icons-react";
import { DataTableColumn, DataTableSortStatus } from "mantine-datatable";
import { useMemo, useState } from "react";

type ProductsTableProps = {
  products: IProduct[];
  total: number;
  isLoading: boolean;
  page: number;
  pageSize: number;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (pageSize: number) => void;
  handleFilter: (column: string, value: string | boolean) => void;
  handleSort: (column: keyof IProduct) => void;
  filters: {
    id: string | undefined;
    name: string | undefined;
    description: string | undefined;
    category: string | undefined;
    status: boolean | undefined;
  };
};

const ProductsTable = ({
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
}: ProductsTableProps) => {
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

  const columns: DataTableColumn<IProduct>[] = [
    {
      accessor: "id",
      width: 150,
      title: (
        <AdminTableHeaderTitle
          title="ID"
          sortable
          onSort={handleSortStatusChange}
          column="id"
          sortStatus={sortStatus}
        />
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
      title: <AdminTableHeaderTitle title="Image" column="images" />,
      render: ({ images }) => (
        <Avatar src={images[0]?.thumbnailUrl} size={36} radius="sm" />
      ),
    },
    {
      accessor: "name",
      title: (
        <AdminTableHeaderTitle
          title="Name"
          column="name"
          sortable
          onSort={handleSortStatusChange}
          sortStatus={sortStatus}
        />
      ),
      sortable: false,
      width: 150,
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
      width: 300,
      title: <AdminTableHeaderTitle title="Description" column="description" />,
      render: ({ description }) => (
        <Text size="sm" lineClamp={2}>
          {description}
        </Text>
      ),
    },
    {
      accessor: "price",
      cellsClassName: "min-w-[140px]",
      title: (
        <AdminTableHeaderTitle
          title="Price"
          column="price"
          sortable
          onSort={handleSortStatusChange}
          sortStatus={sortStatus}
        />
      ),
      sortable: false,
      render: ({ price }) => `₱${price.toFixed(2)}`,
    },
    {
      accessor: "category",
      cellsClassName: "min-w-[160px]",
      title: (
        <AdminTableHeaderTitle
          title="Category"
          column="category"
          sortable
          onSort={handleSortStatusChange}
          sortStatus={sortStatus}
        />
      ),
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
      width: 150,
      title: (
        <AdminTableHeaderTitle
          title="Status"
          column="isActive"
          sortable
          onSort={handleSortStatusChange}
          sortStatus={sortStatus}
        />
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
      title: <AdminTableHeaderTitle title="Actions" column="actions" />,
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
    <AdminDataTable
      pinLastColumn
      columns={columns}
      records={products}
      fetching={isLoading}
      totalRecords={total}
      recordsPerPage={pageSize}
      page={page}
      onPageChange={handlePageChange}
      onRecordsPerPageChange={handlePageSizeChange}
      sortStatus={sortStatus}
      onSortStatusChange={handleSortStatusChange}
    />
  );
};

export default ProductsTable;
