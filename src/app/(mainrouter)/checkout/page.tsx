import CheckoutComponent from "@/components/pagesComponent/checkout/CheckoutComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | GM-Papa",
  description: "Best gaming top-up",
};

const CheckoutPage = async () => {
  return (
    <>
      <CheckoutComponent />
    </>
  );
};
export default CheckoutPage;
