import React from "react";
import { FormatNumber, useLocalStorage, expiredStorage } from "../../helpers";
import { realCashTotal } from "../../api/api";

export default (props) => {
  const [totalCash, setTotalCash] = useLocalStorage("cs_totalCash", 0);
  const [loading, setLoading] = React.useState(false);

  const init = () => {
    setLoading(true);
    realCashTotal().then((r) => {
      setTotalCash(r.data.total);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    if (expiredStorage("cs_totalCash")) init();
  }, []);
  return (
    <div className="text-left">
      <small>Cash</small>
      <span className="d-block font-weight-bold">
        {loading ? (
          <span
            className="d-block z-loading"
            style={{ minWidth: "100px" }}
          ></span>
        ) : (
          `Rp ${FormatNumber(totalCash)}`
        )}
      </span>
    </div>
  );
};
