import { mockData } from "@/app/_temp/temp-data";
import { IOrder } from "@/app/_temp/temp-interfaces";
import getServerActionError from "@/utils/getServerActionError";

const searchOrdersAction = async (
  value: string
): Promise<ServerActionResponse<IOrder[]>> => {
  try {
    const lowerValue = value.toLowerCase();
    // Filter orders by order number, user name, or store name
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
