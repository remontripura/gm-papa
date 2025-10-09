import MyWalletHistory from "@/components/pagesComponents/walletHistory/WalletHIstory";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: `Wallet History | ${process.env.NEXT_PUBLIC_APP_NAME}}`,
};

const WalletHistory = () => {
  return <MyWalletHistory />;
};
export default WalletHistory;
