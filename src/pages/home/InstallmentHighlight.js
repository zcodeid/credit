import React from "react";
import { FormatNumber } from "../../helpers";

export default (props) => {
  const { installment, tenor } = props;
  return (
    <div className="z-card bg-primary text-white mx-1 d-flex justify-content-between align-items-center">
      <div>
        <small className="d-block">Cicilan</small>
        <h4 className="font-weight-bold">Rp {FormatNumber(installment)}</h4>
      </div>
      <div className="text-right">
        <small className="d-block">Waktu Cicilan</small>
        <h4 className="font-weight-bold">{tenor} kali</h4>
      </div>
    </div>
  );
};
