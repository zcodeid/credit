import React from "react";
import { FormatNumber } from "../../helpers";

export default (props) => {
  const { tenors } = props;
  if (!tenors[0].installment) return null;
  return (
    <table className="table table-sm z-table px-5 table-hover">
      <thead>
        <tr>
          <th>Tenor</th>
          <th className="text-right">Cicilan</th>
          <th className="text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        {tenors.map((t, i) => (
          <tr
            key={i}
            className="cursor-pointer"
            onClick={(e) => props.onClick(t)}
          >
            <td>{t.tenor} kali</td>
            <td className="text-right">{FormatNumber(t.installment)}</td>
            <td className="text-right">
              {FormatNumber(t.installment * t.tenor)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
