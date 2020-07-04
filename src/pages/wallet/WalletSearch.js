import React from "react";
import { IoIosWallet } from "react-icons/io";
import NavTop from "../../component/navTop";
import WalletList from "./WalletList";

export default (props) => {
  console.log("xx");
  return (
    <>
      <NavTop title="Wallet" icon={IoIosWallet} />
      <WalletList type="select" {...props} />
    </>
  );
};
