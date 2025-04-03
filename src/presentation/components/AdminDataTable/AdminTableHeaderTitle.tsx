import { ActionIcon, Group, Text } from "@mantine/core";
import { DataTableSortStatus } from "mantine-datatable";
import SortIcon from "./SortIcon";

interface AdminTableHeaderTitle<T> {
  title: string;
  column: keyof T;
  sortable?: boolean;
  onSort?: (status: DataTableSortStatus<T>) => void;
  sortStatus?: DataTableSortStatus<T>;
}

const AdminTableHeaderTitle = <T,>({
  title,
  sortable = false,
  onSort,
  column,
  sortStatus,
}: AdminTableHeaderTitle<T>) => {
  return (
    <Group gap="xs" w={"100%"} justify="space-between">
      <Text size="sm" className="font-semibold">
        {title}
      </Text>
      {sortable && onSort && sortStatus && (
        <ActionIcon
          className="mantine-datatable-header-cell-filter-action-icon !mr-0"
          size="sm"
          variant="default"
          onClick={() =>
            onSort({
              columnAccessor: column,
              direction: sortStatus.direction === "asc" ? "desc" : "asc",
            })
          }
        >
          <SortIcon column={column} sortStatus={sortStatus} />
        </ActionIcon>
      )}
    </Group>
  );
};

export default AdminTableHeaderTitle;
