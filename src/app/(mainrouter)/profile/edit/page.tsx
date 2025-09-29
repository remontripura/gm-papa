import ProfileEdit from "@/components/pagesComponents/profile/ProfileEditComponents";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: `Edit Profile | ${process.env.NEXT_PUBLIC_APP_NAME}}`,
  description: "Best gaming top-up",
};
export default function EditPage() {
  return (
    <>
      <ProfileEdit />
    </>
  );
}
