import { Metadata } from "next";
import VarifyAccountCompo from "./VerifyAccount";

export const metadata: Metadata = {
  title: `verify account | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "verify account",
  keywords:
    "Free Fire top up Bangladesh, freefirebd, cheap diamond top up, gaming offers",
};

const VarifyAccount = () => {
  return (
    <>
      <VarifyAccountCompo />
    </>
  );
};

export default VarifyAccount;
