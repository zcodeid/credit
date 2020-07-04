import React from "react";
import Nav from "../../component/nav";
import { IoIosWallet } from "react-icons/io";
import WalletList from "./WalletList";

export default (props) => {
  return (
    <>
      <Nav title="Wallet" icon={IoIosWallet} />
      <WalletList type="edit" {...props} />
    </>
  );
};
