import AddWalletComponent from "@/components/pagesComponents/add_wallet/AddWallet";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Wallet | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "Best gaming top-up",
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
