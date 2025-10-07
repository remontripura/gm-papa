import { Metadata } from "next";
import LogoutComponent from "./Logout";

export const metadata: Metadata = {
  title: `logout | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "logout",
};
const LogoutPage = () => {
  return (
    <>
      <LogoutComponent />
    </>
  );
};
export default LogoutPage;
