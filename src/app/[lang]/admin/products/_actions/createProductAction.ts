import { mockData } from "@/app/_temp/temp-data";
import { IProduct } from "@/app/_temp/temp-interfaces";
import getServerActionError from "@/utils/getServerActionError";

interface ProductInput {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: {
    id: string;
    title: string;
  };
  isActive: boolean;
  images: Array<{
    name: string;
    percent: number;
    size: number;
    status: "error" | "success" | "done" | "uploading" | "removed";
    type: string;
    uid: string;
    url: string;
    thumbnailUrl?: string;
  }>;
}

const createProductAction = async (
  data: ProductInput
): Promise<ServerActionResponse<IProduct>> => {
  try {
    // Simulate a delay for the API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For edit mode
    if (data.id) {
      // Find the product in mock data
      const productIndex = mockData.products.findIndex((p) => p.id === data.id);

      if (productIndex === -1) {
        throw new Error("Product not found");
      }

      // Update the product in mock data
      const updatedProduct: IProduct = {
        ...mockData.products[productIndex],
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        isActive: data.isActive,
        images: data.images,
      };

      // Update in the mock array (in a real app this would be a database update)
      mockData.products[productIndex] = updatedProduct;

      return { data: updatedProduct, error: null };
    }
    // For create mode
    else {
      // Create a new product with mock ID and createdAt
      const newProduct: IProduct = {
        id: Math.random().toString(36).substring(2, 15),
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        isActive: data.isActive,
        images: data.images,
        createdAt: new Date().toISOString(),
        stock: 100, // Default stock value
      };

      // Add to mock data (in a real app this would be a database insert)
      mockData.products.unshift(newProduct);

      return { data: newProduct, error: null };
    }
  } catch (error) {
    return getServerActionError(error);
  }
};

export default createProductAction;
