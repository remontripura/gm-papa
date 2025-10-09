import AddWalletComponent from "@/components/pagesComponents/add_wallet/AddWallet";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Wallet | ${process.env.NEXT_PUBLIC_APP_NAME}`,
};
export default function WalletBalance() {
  return (
    <>
      <AddWalletComponent />
    </>
  );
}
