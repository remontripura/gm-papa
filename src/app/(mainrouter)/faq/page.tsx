import FaqComponents from "@/components/pagesComponents/faq/FaqComponents";
import config from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `FAQ | ${config.appName}`,
};

const FaqPage = () => {
  return (
    <>
      <FaqComponents />
    </>
  );
};

export default FaqPage;
