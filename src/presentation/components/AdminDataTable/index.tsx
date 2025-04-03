"use client";

import cn from "@/utils/cn";
import { DataTable, DataTableColumn, DataTableProps } from "mantine-datatable";
import React from "react";

type AdminDataTableProps<T> = DataTableProps<T> & {
  onRecordsPerPageChange: (recordsPerPage: number) => void;
  recordsPerPageOptions: number[];
  recordsPerPageLabel?: string;
  groups?: never;
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
        "relative pr-4 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[60%] after:w-px after:bg-gray-400 dark:after:bg-dark-400 last:after:hidden",
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
