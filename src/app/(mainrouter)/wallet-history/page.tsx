import MyWalletHistory from "@/components/pagesComponents/walletHistory/WalletHIstory";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Wallet History | GM-Papa",
  description: "Best gaming top-up",
};

const WalletHistory = () => {
  return <MyWalletHistory />;
};
export default WalletHistory;
