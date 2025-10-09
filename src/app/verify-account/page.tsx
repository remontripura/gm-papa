import { Metadata } from "next";
import VarifyAccountCompo from "./VerifyAccount";

export const metadata: Metadata = {
  title: `verify account | ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

const VarifyAccount = () => {
  return (
    <>
      <VarifyAccountCompo />
    </>
  );
};

export default VarifyAccount;
