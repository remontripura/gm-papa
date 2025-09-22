// app/profile/page.tsx
import ProfileComponents from "@/components/pagesComponents/profile/ProfileComponents";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | GM-Papa",
  description: "Best gaming top-up",
};

export default function ProfilePage() {
  return <ProfileComponents />;
}
