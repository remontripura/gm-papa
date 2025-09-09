// store/selectedItemStore.ts
import { create } from "zustand";

interface SelectedItemState {
  select: boolean;
  setSelected: (value: boolean) => void;
}

export const useSelectedItemStore = create<SelectedItemState>((set) => ({
  select: false,
  setSelected: (value) => set({ select: value }),
}));
