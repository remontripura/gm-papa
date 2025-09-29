import { create } from "zustand";
import { Profile } from "@/types/profile/profile"; 

interface ProfileStore {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,

  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null }),
}));
