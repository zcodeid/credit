import React from "react";
import Fab from "../../component/fab";
import { IoMdAdd } from "react-icons/io";
import Empty from "../../component/Empty";
import { walletGet } from "../../api/api";
import WalletLoader from "../../loader/WalletLoader";
import { useLocalStorage, expiredStorage } from "../../helpers";
import WalletCardEdit from "./WalletCardEdit";
import WalletCardSelect from "./WalletCardSelect";

export default (props) => {
  const type = props.type;
  const currentId = props.match.params.current;
  const KEY = props.match.params.key;
  const all = props.match.params.all;
  console.log(currentId);
  const allWallet = {
    id: "0",
    name: "All Wallet",
    description: "Semua Wallet",
  };
  const [wallets, setWallets] = useLocalStorage("wl_data", []);
  const [data, setData] = React.useState(wallets);
  const [loading, setLoading] = React.useState(false);
  const loadData = async () => {
    setLoading(true);
    try {
      const response = await walletGet();
      if (all === "all") {
        const w = [allWallet, ...response.data];
        setData(w);
        setWallets(w);
      } else {
        setWallets(response.data);
        setData(response.data);
      }
    } catch (err) {}
    setLoading(false);
  };
  React.useEffect(() => {
    const isExpired = expiredStorage("wl_data");
    if (isExpired) loadData();
    else {
      if (all === "all") setData([allWallet, ...wallets]);
    }
  }, []);
  const edit = (wallet) => {
    localStorage.setItem("wallet", JSON.stringify(wallet));
    props.history.push("/wallet/edit");
  };
  const selectWallet = (wallet) => {
    localStorage.setItem(KEY, JSON.stringify(wallet));
    window.history.back();
  };
  const searchWallet = (e) => {
    const s = e.target.value;
    const result = wallets.filter(
      (w) => w.name.toLowerCase().indexOf(s.toLowerCase()) >= 0
    );
    setData(result);
  };
  if (loading) return <WalletLoader />;
  if (wallets.length === 0) {
    return (
      <>
        <Empty />
        <Fab
          icon={IoMdAdd}
          onClick={(e) => props.history.push("/wallet/add")}
        />
      </>
    );
  }
  return (
    <>
      <div className="main-padding">
        <input
          type="search"
          className="form-control"
          placeholder="search"
          onChange={searchWallet}
        />
        <div className="mt-3 cursor-pointer">
          {data.map((d, i) =>
            type === "edit" ? (
              <WalletCardEdit
                key={i}
                data={d}
                selected={d.id === currentId}
                onClick={(e) => edit(d)}
              />
            ) : (
              <WalletCardSelect
                key={i}
                data={d}
                selected={d.id === currentId}
                onClick={(e) => selectWallet(d)}
              />
            )
          )}
        </div>
      </div>
      <Fab icon={IoMdAdd} onClick={(e) => props.history.push("/wallet/add")} />
    </>
  );
};
