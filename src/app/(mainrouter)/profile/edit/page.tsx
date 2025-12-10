import ProfileEdit from "@/components/pagesComponents/profile/ProfileEditComponents";
import config from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Edit Profile | ${config.appName}}`,
};
export default function EditPage() {
  return (
    <>
      <ProfileEdit />
    </>
  );
}
