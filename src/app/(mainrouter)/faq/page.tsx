import FaqComponents from "@/components/pagesComponents/faq/FaqComponents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `FAQ | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "the most trusted shop",
};

const FaqPage = () => {
  return (
    <>
      <FaqComponents />
    </>
  );
};

export default FaqPage;
