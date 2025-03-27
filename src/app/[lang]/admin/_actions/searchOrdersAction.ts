import { mockData } from "@/app/_temp/temp-data";
import { IOrder } from "@/app/_temp/temp-interfaces";
import getServerActionError from "@/utils/getServerActionError";

const searchOrdersAction = async (
  value: string
): Promise<ServerActionResponse<IOrder[]>> => {
  try {
    if (!value.trim()) {
      return { data: mockData.orders.slice(0, 10), error: null };
    }

    const lowerValue = value.toLowerCase();
    const filtered = mockData.orders.filter(
      (order) =>
        order.orderNumber.toString().includes(lowerValue) ||
        order.user.fullName.toLowerCase().includes(lowerValue) ||
        order.store.title.toLowerCase().includes(lowerValue)
    );

    return { data: filtered.slice(0, 10), error: null };
  } catch (error) {
    return getServerActionError(error);
  }
};

export default searchOrdersAction;
