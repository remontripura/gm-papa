import CheckoutComponent from "@/components/pagesComponents/checkout/CheckoutComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Checkout | Free Fire Top Up Bangladesh - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "Free Fire top up Bangladesh",
  keywords:
    "Free Fire top up Bangladesh, freefirebd, cheap diamond top up, gaming offers",
};

const CheckoutPage = async () => {
  return (
    <>
      <CheckoutComponent />
    </>
  );
};
export default CheckoutPage;
