import { create } from "zustand";

interface ProductViewStore {
  view: "table" | "grid";
  toggleView: (view: "table" | "grid") => void;
}

const useProductViewStore = create<ProductViewStore>((set) => ({
  view: "table",
  toggleView: (view: "table" | "grid") => set({ view }),
}));

export default useProductViewStore;
