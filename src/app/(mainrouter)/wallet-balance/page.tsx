import AddWalletComponent from "@/components/pagesComponents/add_wallet/AddWallet";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Wallet | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "Best gaming top-up",
  keywords:
    "Free Fire top up Bangladesh, freefirebd, cheap diamond top up, gaming offers",
  alternates: {
    canonical: `${process.env.NEXTAUTH_URL}/wallet-balance`,
  },
};
export default function WalletBalance() {
  return (
    <>
      <AddWalletComponent />
    </>
  );
}
