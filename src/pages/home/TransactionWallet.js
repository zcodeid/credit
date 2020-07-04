import React from "react";
import { FormatNumber } from "../../helpers";

export default (props) => {
  const { data, loading } = props;
  const dummies = [...Array(10).keys()];
  if (loading) {
    return (
      <>
        {dummies.map((d, i) => (
          <div key={i} className="text-center">
            <small
              className="d-block mx-auto z-loading mb-1"
              style={{ maxWidth: "80px", fontSize: "0.5rem" }}
            ></small>
            <span
              className="d-block m-auto z-loading"
              style={{ maxWidth: "150px" }}
            ></span>
          </div>
        ))}
      </>
    );
  }
  return (
    <>
      {data.map((wa, i) => {
        const color = wa.amount < 0 ? "text-danger" : "";
        return (
          <div key={i} className={`wallet-value ${color}`}>
            <small>{wa.wallet.name}</small>
            <span>Rp {FormatNumber(wa.amount)}</span>
          </div>
        );
      })}
    </>
  );
};
