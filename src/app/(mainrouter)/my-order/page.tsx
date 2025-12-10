import MyOrderComponents from "@/components/pagesComponents/myOrder/MyOrderComponents";
import config from "@/config";
import { Metadata } from "next";
import "react-loading-skeleton/dist/skeleton.css";

export const metadata: Metadata = {
  title: `My Order | ${config.appName}`,
};

const MyOrderPage = () => {
  return <MyOrderComponents />;
};

export default MyOrderPage;
