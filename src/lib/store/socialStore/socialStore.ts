// store/useSocialLinksStore.ts
import { SocialLink } from "@/types/helpline/helpline";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SocialLinksState {
  socialLinks: SocialLink[];
  setSocialLinks: (links: SocialLink[]) => void;
  clearSocialLinks: () => void;
}

// ---- Store ----
export const useSocialLinksStore = create<SocialLinksState>()(
  persist(
    (set) => ({
      socialLinks: [],
      setSocialLinks: (links) => set({ socialLinks: links }),
      clearSocialLinks: () => set({ socialLinks: [] }),
    }),
    {
      name: "social-links-storage",
    }
  )
);
