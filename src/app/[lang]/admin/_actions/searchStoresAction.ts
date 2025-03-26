import { mockData } from "@/app/_temp/temp-data";
import { IStore } from "@/app/_temp/temp-interfaces";
import getServerActionError from "@/utils/getServerActionError";

const searchStoresAction = async (
  value: string
): Promise<ServerActionResponse<IStore[]>> => {
  try {
    const lowerValue = value.toLowerCase();
    // Filter stores by name
    const filtered = mockData.stores.filter((store) =>
      store.title.toLowerCase().includes(lowerValue)
    );
    return { data: filtered.slice(0, 10), error: null };
  } catch (error) {
    return getServerActionError(error);
  }
};

export default searchStoresAction;
