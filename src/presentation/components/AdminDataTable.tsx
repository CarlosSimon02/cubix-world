"use client";

import cn from "@/utils/cn";
import { MantineSize } from "@mantine/core";
import {
  DataTable,
  DataTableColumn,
  DataTableSortStatus,
} from "mantine-datatable";
import React from "react";

type AdminDataTableProps<T> = {
  withTableBorder?: boolean;
  borderRadius?: MantineSize;
  minHeight?: number;
  rowClassName?: string;
  sortIcons?: {
    sorted: React.ReactNode;
    unsorted: React.ReactNode;
  };
  classNames?: Partial<
    Record<"root" | "table" | "header" | "footer" | "pagination", string>
  >;
  onRecordsPerPageChange: (recordsPerPage: number) => void;
  recordsPerPageOptions?: number[];
  recordsPerPageLabel?: string;
  groups?: never;
  columns: DataTableColumn<T>[];
  records: T[];
  fetching: boolean;
  totalRecords: number;
  recordsPerPage: number;
  page: number;
  onPageChange: (page: number) => void;
  pinLastColumn?: boolean;
  pinFirstColumn?: boolean;
  sortStatus: DataTableSortStatus<T>;
  onSortStatusChange: (sortStatus: DataTableSortStatus<T>) => void;
};

const AdminDataTable = <T extends object>({
  withTableBorder = false,
  borderRadius = "md",
  minHeight = 180,
  recordsPerPageOptions = [10, 20, 50],
  rowClassName,
  sortIcons = {
    sorted: <React.Fragment />,
    unsorted: <React.Fragment />,
  },
  classNames,
  columns,
  ...props
}: AdminDataTableProps<T>) => {
  const { pagination, ...otherClassNames } = classNames || {};

  const transformedColumns: DataTableColumn<T>[] =
    columns?.map((column) => ({
      ...column,
      titleClassName:
        "relative py-4 pr-4 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[60%] after:w-px after:bg-gray-400 dark:after:bg-dark-400 last:after:hidden",
    })) || [];

  return (
    <DataTable
      withTableBorder={withTableBorder}
      borderRadius={borderRadius}
      minHeight={minHeight}
      columns={transformedColumns}
      pinLastColumn
      rowClassName={cn("h-16", rowClassName)}
      recordsPerPageOptions={recordsPerPageOptions}
      sortIcons={sortIcons}
      classNames={{
        pagination: cn("!min-h-16", pagination),
        ...otherClassNames,
      }}
      {...props}
    />
  );
};

export default AdminDataTable;
