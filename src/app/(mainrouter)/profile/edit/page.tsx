import ProfileEdit from "@/components/pagesComponents/profile/ProfileEditComponents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Edit Profile | ${process.env.NEXT_PUBLIC_APP_NAME}}`,
  description: "Best gaming top-up",
  keywords:
    "Free Fire top up Bangladesh, freefirebd, cheap diamond top up, gaming offers",
};
export default function EditPage() {
  return (
    <>
      <ProfileEdit />
    </>
  );
}
