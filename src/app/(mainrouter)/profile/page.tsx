// app/profile/page.tsx
import ProfileComponents from "@/components/pagesComponents/profile/ProfileComponents";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Profile | ${process.env.NEXT_PUBLIC_APP_NAME}}`,
};

export default function ProfilePage() {
  return <ProfileComponents />;
}
