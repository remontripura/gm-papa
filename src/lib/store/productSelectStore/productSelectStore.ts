// /lib/store/productSelectionStore.ts
import { IItem } from "@/types/productsDataType/SingleProductType";
import { create } from "zustand";

interface ProductSelectionState {
  active: string;
  selectedItem: IItem | null;
  setActive: (name: string) => void;
  setSelectedItem: (item: IItem | null) => void;
}

export const useProductSelectionStore = create<ProductSelectionState>((set) => ({
  active: "",
  selectedItem: null,
  setActive: (name) => set({ active: name }),
  setSelectedItem: (item) => set({ selectedItem: item }),
}));
