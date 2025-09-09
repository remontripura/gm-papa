import ProfileEdit from "@/components/pagesComponent/profile/ProfileEditComponents";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Edit-Profile | GM-Papa",
  description: "Best gaming top-up",
};
export default function EditPage() {
  return (
    <>
      <ProfileEdit />
    </>
  );
}
