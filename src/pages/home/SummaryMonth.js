import React from "react";
import { IoIosMoon, IoIosArrowForward } from "react-icons/io";
import { AiOutlineLineChart, AiOutlineTable } from "react-icons/ai";
import { FormatNumber } from "../../helpers";

export default (props) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Ags",
    "Sept",
    "Okt",
    "Nov",
    "Des",
  ];
  const wallet = props.wallet;
  let data = props.data.map((d) => {
    const m = (d.year + d.month.toString().padStart(2, "0")) * 1;
    return { m, ...d };
  });
  data = data.sort((a, b) => (a.m > b.m ? -1 : b.m > a.m ? 1 : 0));
  return (
    <div className="z-card">
      <div>
        <IoIosMoon className="mr-1" />
        <span className="font-weight-bold">Transaction by Wallet</span>
      </div>
      <hr className="mt-1" />
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <AiOutlineTable size="1.5em" className="mr-2 text-primary" />
          <AiOutlineLineChart size="1em" />
        </div>
        <button className="btn btn-sm" onClick={props.onSelectWallet}>
          {wallet.name} <IoIosArrowForward />
        </button>
      </div>
      <table className="table table-sm z-table text-right">
        <thead>
          <tr>
            <th>Bulan</th>
            <th>In</th>
            <th>Out</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr
              key={i}
              className={d.positive + d.negative < 0 ? "text-danger" : ""}
            >
              <td>{`${d.year}-${months[d.month - 1]}`}</td>
              <td>{FormatNumber(d.positive)}</td>
              <td>{FormatNumber(d.negative)}</td>
              <td>{FormatNumber(d.positive + d.negative)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
