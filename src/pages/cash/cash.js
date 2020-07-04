import React from "react";
import Nav from "../../component/nav";
import { IoIosPulse, IoMdAdd, IoIosArrowForward } from "react-icons/io";
import Fab from "../../component/fab";
import Empty from "../../component/Empty";
import { realCash, realCashTotal } from "../../api/api";
import { FormatNumber, useLocalStorage, expiredStorage } from "../../helpers";
import CashLoader from "../../loader/CashLoader";

export default (props) => {
  const [data, setData] = useLocalStorage("cs_data", []);
  const [amount, setAmount] = useLocalStorage("cs_totalCash", 0);
  const [loading, setLoading] = React.useState(false);

  const loadData = async () => {
    setLoading(true);
    const response = await realCash();
    const response2 = await realCashTotal();
    setData(response.data);
    setAmount(response2.data.total);
    setLoading(false);
  };

  React.useEffect(() => {
    const exp = expiredStorage("cs_data") || expiredStorage("cs_totalCash");
    if (data.length === 0 || exp) loadData();
  }, []);

  if (loading) {
    return (
      <>
        <Nav title="Cash" icon={IoIosPulse} />
        <CashLoader />
      </>
    );
  }
  if (data.length === 0) {
    return (
      <>
        <Nav title="Cash" icon={IoIosPulse} />
        <Empty className="mt-5" />
        <Fab icon={IoMdAdd} onClick={(e) => props.history.push("/cash/add")} />
      </>
    );
  }
  return (
    <>
      <Nav title="Cash" icon={IoIosPulse} />
      <div className="main-padding">
        <small className="d-block m-auto text-center">Total Cash</small>
        <h2 className="text-center">
          <small>Rp</small> {FormatNumber(amount)}
        </h2>
        <hr />
        {data.map((d, i) => (
          <div
            key={i}
            className="z-card mb-2 d-flex justify-content-between align-items-center cursor-pointer"
            onClick={() =>
              props.history.push(`/cash/edit/${d.id}/${d.name}/${d.amount}`)
            }
          >
            <div>
              <span className="d-block mb-n1 font-weight-bold">
                Rp {FormatNumber(d.amount)}
              </span>
              <small className="text-secondary">{d.name}</small>
            </div>
            <IoIosArrowForward />
          </div>
        ))}
      </div>
      <Fab icon={IoMdAdd} onClick={(e) => props.history.push("/cash/add")} />
    </>
  );
};
