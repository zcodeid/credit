import React from "react";
import { FormatNumber, useLocalStorage, expiredStorage } from "../../helpers";
import { cashflowTotal } from "../../api/api";

export default (props) => {
  const [totalTrx, setTotalTrx] = useLocalStorage("trx_totalTrx", 0);
  const [loading, setLoading] = React.useState(false);

  const init = () => {
    setLoading(true);
    cashflowTotal().then((r) => {
      setTotalTrx(r.data.total);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    if (expiredStorage("trx_totalTrx")) init();
  }, []);
  return (
    <div className="text-right">
      <small>Transaction</small>
      <span className="d-block font-weight-bold">
        {loading ? (
          <span
            className="d-block z-loading"
            style={{ minWidth: "100px" }}
          ></span>
        ) : (
          `Rp ${FormatNumber(totalTrx)}`
        )}
      </span>
    </div>
  );
};
