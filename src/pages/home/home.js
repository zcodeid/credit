import React from "react";
import { IoMdAdd } from "react-icons/io";
import Fab from "../../component/fab";
import Nav from "../../component/nav";
import NumberFormat from "react-number-format";
import { FormatNumber } from "../../helpers";
import InstallmentTable from "./InstallmentTable";
import InstallmentHighlight from "./InstallmentHighlight";

const startTenor = 6;
const startMargin = 20;
const initTenors = () => {
  const tn = [];
  for (let i = 1; i <= 7; i++) {
    let tenor = 0;
    let margin = 0;
    if (tn.length === 0) {
      tenor = startTenor;
      margin = startMargin;
    } else {
      tenor = tn[i - 2].tenor + 3;
      margin = tn[i - 2].margin + 5;
    }
    tn.push({ tenor, margin });
  }
  return tn;
};
export default (props) => {
  const [dp, setDp] = React.useState(0);
  const [dpErr, setDpErr] = React.useState("");
  const [tenors, setTenors] = React.useState(initTenors());
  const [tenor, setTenor] = React.useState();
  const [installment, setInstallment] = React.useState();
  const [purchasePrice, setPurchasePrice] = React.useState();
  const [purchasePriceErr, setPurchasePriceErr] = React.useState();
  const submit = (e) => {
    e.preventDefault();
  };
  React.useEffect(() => {
    const kelipatan = 10000;
    if (purchasePrice < 0)
      setPurchasePriceErr("Harga barang tidak boleh negative");
    if (dp < 0) setDpErr("DP tidak boleh negative");
    else if (dp % kelipatan !== 0)
      setDpErr("DP harus kelipatan Rp " + FormatNumber(kelipatan));
    else setDpErr("");
    const piutang = purchasePrice - dp;
    if (piutang < 0) return;
    const temp = [...tenors];
    for (let t of temp) {
      const total = (piutang * (100 + t.margin)) / 100;
      t.installment = Math.ceil(total / t.tenor / 1000) * 1000;
    }
    console.log(temp);
    setTenors(temp);
  }, [dp, purchasePrice]);
  const selectInstallment = (o) => {
    setTenor(o.tenor);
    setInstallment(o.installment);
  };
  return (
    <>
      <Nav />
      <div className="main-padding">
        <InstallmentHighlight tenor={tenor} installment={installment} />
        <hr />
        <form className="px-2" onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="purchasePrice">Harga Barang</label>
            <NumberFormat
              id="purchasePrice"
              className="form-control"
              thousandSeparator={true}
              prefix={"Rp "}
              onValueChange={(v) => setPurchasePrice(v.floatValue)}
            />
            <small className="form-text text-danger">{purchasePriceErr}</small>
          </div>
          <div className="form-group">
            <label htmlFor="dp">Down Payment (DP)</label>
            <NumberFormat
              id="dp"
              className="form-control"
              thousandSeparator={true}
              prefix={"Rp "}
              onValueChange={(v) => setDp(v.floatValue)}
            />
            <small className="form-text text-danger">{dpErr}</small>
          </div>
        </form>
        <div className="mx-4">
          <InstallmentTable tenors={tenors} onClick={selectInstallment} />
        </div>
      </div>
      <Fab
        icon={IoMdAdd}
        onClick={() => {
          props.history.push("/transaction/add");
        }}
      />
    </>
  );
};
