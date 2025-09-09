import FaqComponents from "@/components/pagesComponent/faq/FaqComponents";
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
