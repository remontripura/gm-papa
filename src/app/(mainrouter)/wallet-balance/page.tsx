import AddWalletComponent from "@/components/pagesComponents/add_wallet/AddWallet";
import config from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Wallet | ${config.appName}`,
};
export default function WalletBalance() {
  return (
    <>
      <AddWalletComponent />
    </>
  );
}
