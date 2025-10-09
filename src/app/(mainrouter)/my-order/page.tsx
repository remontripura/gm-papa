import MyOrderComponents from "@/components/pagesComponents/myOrder/MyOrderComponents";
import { Metadata } from "next";
import "react-loading-skeleton/dist/skeleton.css";

export const metadata: Metadata = {
  title: `My Order | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "the most trusted shop",
  keywords:
    "Free Fire top up Bangladesh, freefirebd, cheap diamond top up, gaming offers",
};

const MyOrderPage = () => {
  return <MyOrderComponents />;
};

export default MyOrderPage;
