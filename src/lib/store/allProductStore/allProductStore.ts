// stores/useCategoryStore.ts
import { ICategory } from "@/types/productsDataType/productsDataType";
import { create } from "zustand";

interface CategoryState {
    categories: ICategory[];
    setCategoryData: (data: {
        categories: ICategory[];
    }) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    setCategoryData: ({ categories }) =>
        set({ categories }),
}));
