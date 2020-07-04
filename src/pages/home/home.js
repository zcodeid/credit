import React from "react";
import { IoMdAdd, IoIosArrowForward, IoIosMagnet } from "react-icons/io";
import Nav from "../../component/nav";
import { cashflowBalance, walletAmount } from "../../api/api";
import Fab from "../../component/fab";
import SummaryMonth from "./SummaryMonth";
import TotalTransaction from "./TotalTransaction";
import TotalCash from "./TotalCash";
import TransactionWallet from "./TransactionWallet";
import { useLocalStorage, expiredStorage } from "../../helpers";

export default (props) => {
  const walletHome = JSON.parse(localStorage.getItem("walletHome")) || {};
  const [loading, setLoading] = React.useState(false);
  const [balance, setBalance] = useLocalStorage("trx_balance", []);
  const [walletAmounts, setWalletAmounts] = useLocalStorage(
    "trx_walletAmounts",
    []
  );
  const [wallet, setWallet] = React.useState(walletHome);
  const loadData = async () => {
    setLoading(true);
    try {
      // const promises = [realCashTotal(), cashflowTotal()];
      // const [cash, trx] = await Promise.allSettled(promises);
      walletAmount().then((res) => {
        setWalletAmounts(res.data);
        setLoading(false);
        if (walletHome.id === undefined && res.data.length === 0) return;
        const w = walletHome.id ? walletHome : res.data[0].wallet;
        setWallet(w);
        cashflowBalance(w.id).then((res2) => setBalance(res2.data));
      });
    } catch (err) {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    const exp =
      expiredStorage("trx_balance") || expiredStorage("trx_walletAmounts");
    if (exp) loadData();
  }, []);

  const selectWallet = (e) => {
    const url = `/wallet/search/${wallet.id}/walletHome/notall`;
    props.history.push(url);
  };

  return (
    <>
      <Nav />
      <div className="main-padding mb-5">
        <div className="z-card d-flex justify-content-center mb-2">
          <TotalTransaction />
          <div className="v1" />
          <TotalCash />
        </div>

        <div className="z-card mb-2">
          <div
            className="d-flex justify-content-between align-items-center"
            onClick={(e) => props.history.push("/transaction")}
          >
            <div>
              <IoIosMagnet className="mr-1" />
              <span className="font-weight-bold">Transaction by Wallet</span>
            </div>
            <IoIosArrowForward />
          </div>
          <hr className="mt-1" />
          <div className="column-2">
            <TransactionWallet loading={loading} data={walletAmounts} />
          </div>
        </div>
        <SummaryMonth
          wallet={wallet}
          data={balance}
          onSelectWallet={selectWallet}
        />
      </div>
      <Fab
        icon={IoMdAdd}
        onClick={(e) => {
          localStorage.removeItem("walletSearch");
          props.history.push("/transaction/add");
        }}
      />
    </>
  );
};
