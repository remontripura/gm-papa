import CheckoutComponent from "@/components/pagesComponents/checkout/CheckoutComponent";
import config from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Checkout - ${config.appName}`,
};

const CheckoutPage = async () => {
  return (
    <>
      <CheckoutComponent />
    </>
  );
};
export default CheckoutPage;
