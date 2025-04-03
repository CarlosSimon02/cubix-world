import { IProduct } from "@/app/_temp/temp-interfaces";
import { create } from "zustand";

interface ProductDrawerStore {
  isOpen: boolean;
  editProduct: IProduct | null;
  hasUnsavedChanges: boolean;
  openDrawer: (product?: IProduct | null) => void;
  closeDrawer: () => void;
  setHasUnsavedChanges: (value: boolean) => void;
}

const useProductDrawerStore = create<ProductDrawerStore>((set) => ({
  isOpen: false,
  editProduct: null,
  hasUnsavedChanges: false,
  openDrawer: (product = null) =>
    set({ isOpen: true, editProduct: product, hasUnsavedChanges: false }),
  closeDrawer: () =>
    set({ isOpen: false, editProduct: null, hasUnsavedChanges: false }),
  setHasUnsavedChanges: (value: boolean) => set({ hasUnsavedChanges: value }),
}));

export default useProductDrawerStore;
