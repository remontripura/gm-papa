import { IUser } from "@/types/loginDataType/loginDataType";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
    }
  )
);
