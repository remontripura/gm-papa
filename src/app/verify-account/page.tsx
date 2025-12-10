import { Metadata } from "next";
import VarifyAccountCompo from "./VerifyAccount";
import config from "@/config";

export const metadata: Metadata = {
  title: `verify account | ${config.appName}`,
};

const VarifyAccount = () => {
  return (
    <>
      <VarifyAccountCompo />
    </>
  );
};

export default VarifyAccount;
