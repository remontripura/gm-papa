import MyWalletHistory from "@/components/pagesComponents/walletHistory/WalletHIstory";
import config from "@/config";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: `Wallet History | ${config.appName}}`,
};

const WalletHistory = () => {
  return <MyWalletHistory />;
};
export default WalletHistory;
