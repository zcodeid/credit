import React from "react";
import { FormatNumber } from "../../helpers";

export default (props) => {
  const { installment, tenor, piutang } = props;
  if (!piutang) {
    return (
      <div className="z-card bg-primary text-white mx-1 text-center">
        <h4 className="font-weight-bold">Simulasi Kredit</h4>
      </div>
    );
  }
  return (
    <div className="z-card bg-primary crsi-highlight">
      <div>
        <small className="crsi-highlight-label">Harga Barang - DP</small>
        <span className="crsi-highlight-value">Rp {FormatNumber(piutang)}</span>
      </div>
      <div className="text-right">
        <small className="crsi-highlight-label">Cicilan</small>
        <span className="crsi-highlight-value">
          Rp {FormatNumber(installment)}
          <small>x{tenor}</small>
        </span>
      </div>
    </div>
  );
};
