import { Metadata } from "next";
import LogoutComponent from "./Logout";
import config from "@/config";

export const metadata: Metadata = {
  title: `logout | ${config.appName}`,
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
