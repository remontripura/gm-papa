import AddWalletComponent from "@/components/pagesComponents/add_wallet/AddWallet";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wallet | GM-Papa",
  description: "Best gaming top-up",
};
export default function WalletBalance() {
  return (
    <>
      <AddWalletComponent />
    </>
  );
}
