// store/usePurchaseStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
type FormValue = string | number | boolean | null | undefined | FormValue[] | { [key: string]: FormValue };

interface PurchaseState {
  count: number;
  balance: number;
  name: string;
  player_id: string;
  product_id: string;
  items_id: string;
  formData: Record<string, FormValue>;

  setCount: (count: number) => void;
  setBalance: (balance: number) => void;
  setName: (name: string) => void;
  setProductId: (product_id: string) => void;
  setItemsId: (items_id: string) => void;
  setPlayerId: (player_id: string) => void;
  setFormData: (data: Record<string, FormValue>) => void;
  reset: () => void;
}

export const usePurchaseStore = create<PurchaseState>()(
  persist(
    (set) => ({
      count: 1,
      balance: 0,
      name: "",
      player_id: "",
      product_id: "",
      items_id: "",
      formData: {},

      setCount: (count) => set({ count }),
      setBalance: (balance) => set({ balance }),
      setName: (name) => set({ name }),
      setProductId: (product_id) => set({ product_id }),
      setItemsId: (items_id) => set({ items_id }),
      setPlayerId: (player_id) => set({ player_id }),
      setFormData: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            ...data,
          },
        })),
      reset: () =>
        set({
          count: 1,
          balance: 0,
          name: "",
          player_id: "",
          product_id: "",
          items_id: "",
          formData: {},
        }),
    }),
    {
      name: "purchase-storage",
    }
  )
);
