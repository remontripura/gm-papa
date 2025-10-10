import CheckoutComponent from "@/components/pagesComponents/checkout/CheckoutComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Checkout - ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

const CheckoutPage = async () => {
  return (
    <>
      <CheckoutComponent />
    </>
  );
};
export default CheckoutPage;
