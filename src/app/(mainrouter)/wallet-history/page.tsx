import MyWalletHistory from "@/components/pagesComponents/walletHistory/WalletHIstory";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: `Wallet History | ${process.env.NEXT_PUBLIC_APP_NAME}}`,
  description: "Best gaming top-up",
};

const WalletHistory = () => {
  return <MyWalletHistory />;
};
export default WalletHistory;
