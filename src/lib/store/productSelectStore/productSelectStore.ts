// /lib/store/productSelectionStore.ts
import { create } from "zustand";
import { IItem } from "@/types/procutsDataType/SingleProductType";

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
