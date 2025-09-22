import FaqComponents from "@/components/pagesComponents/faq/FaqComponents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GMPAPA | Faq",
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
