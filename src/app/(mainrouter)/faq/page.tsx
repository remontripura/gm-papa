import FaqComponents from "@/components/pagesComponents/faq/FaqComponents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `FAQ | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "the most trusted shop",
  keywords:
    "Free Fire top up Bangladesh, freefirebd, cheap diamond top up, gaming offers",
};

const FaqPage = () => {
  return (
    <>
      <FaqComponents />
    </>
  );
};

export default FaqPage;
