// store/orderStore.ts
import { Order } from "@/types/orderDataType/orderDataType";
import { create } from "zustand";

interface OrderState {
    order: Order | null;
    setOrder: (data: Order) => void;
    resetOrder: () => void;
    title: string;
    setTitle: (title: string) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
    order: null,
    title: "",
    setTitle: (data) => set({ title: data }),
    setOrder: (data) => set({ order: data }),
    resetOrder: () => set({ order: null }),
}));
