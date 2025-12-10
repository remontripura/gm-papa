// app/profile/page.tsx
import ProfileComponents from "@/components/pagesComponents/profile/ProfileComponents";
import config from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Profile | ${config.appName}}`,
};

export default function ProfilePage() {
  return <ProfileComponents />;
}
