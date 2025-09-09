import MyOrderComponents from "@/components/pagesComponent/myOrder/MyOrderComponents";
import { Metadata } from "next";
import "react-loading-skeleton/dist/skeleton.css";

export const metadata: Metadata = {
  title: "GMPAPA | My-Order",
  description: "the most trusted shop",
};

const MyOrderPage = () => {
  return <MyOrderComponents />;
};

export default MyOrderPage;
