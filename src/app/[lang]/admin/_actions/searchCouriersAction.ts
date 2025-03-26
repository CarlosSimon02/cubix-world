import { mockData } from "@/app/_temp/temp-data";
import { ICourier } from "@/app/_temp/temp-interfaces";
import getServerActionError from "@/utils/getServerActionError";

const searchCouriersAction = async (
  value: string
): Promise<ServerActionResponse<ICourier[]>> => {
  try {
    const lowerValue = value.toLowerCase();
    // Filter couriers by name, surname, or email
    const filtered = mockData.couriers.filter(
      (courier) =>
        courier.name.toLowerCase().includes(lowerValue) ||
        courier.surname.toLowerCase().includes(lowerValue) ||
        courier.email.toLowerCase().includes(lowerValue)
    );
    return { data: filtered.slice(0, 10), error: null };
  } catch (error) {
    return getServerActionError(error);
  }
};

export default searchCouriersAction;
