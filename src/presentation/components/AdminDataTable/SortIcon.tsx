// components/SortIcon.tsx
"use client";

import {
  IconArrowDown,
  IconArrowsSort,
  IconArrowUp,
} from "@tabler/icons-react";
import { DataTableSortStatus } from "mantine-datatable";

interface SortIconProps<T> {
  column: keyof T;
  sortStatus: DataTableSortStatus<T>;
}

const SortIcon = <T,>({ column, sortStatus }: SortIconProps<T>) => {
  if (sortStatus.columnAccessor === column) {
    return sortStatus.direction === "asc" ? (
      <IconArrowUp size={14} />
    ) : (
      <IconArrowDown size={14} />
    );
  }
  return <IconArrowsSort size={14} />;
};

export default SortIcon;
