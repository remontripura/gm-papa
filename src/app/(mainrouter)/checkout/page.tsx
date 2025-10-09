import CheckoutComponent from "@/components/pagesComponents/checkout/CheckoutComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Checkout | ${process.env.NEXT_PUBLIC_APP_NAME}}`,
  description: "Best gaming top-up",
  keywords:
    "Checkout, Free Fire top up Bangladesh, freefirebd, cheap diamond top up, gaming offers",
};

const CheckoutPage = async () => {
  return (
    <>
      <CheckoutComponent />
    </>
  );
};
export default CheckoutPage;
