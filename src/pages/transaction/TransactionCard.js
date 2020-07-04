import React from "react";
import { IoIosTrash, IoIosWallet } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";
import { FormatDate, FormatNumber } from "../../helpers";

export default (props) => {
  const { data } = props;
  const edit = () => {
    localStorage.setItem("cashflow", JSON.stringify(data));
    props.history.push("/transaction/edit/" + data.id);
  };
  const color = data.amount < 0 ? "text-danger" : "";
  return (
    <div className="z-card mx-1 mb-2">
      <div className="d-flex justify-content-between">
        <strong>
          <IoIosWallet /> {data.wallet.name}
        </strong>
        <span className="text-secondary">{FormatDate(data.date)}</span>
      </div>
      <hr />
      <div className={`my-2 text-center ${color}`}>
        <span className="d-block">
          <small>Rp</small>
          <span className={`font-weight-bold`} style={{ fontSize: "2rem" }}>
            {FormatNumber(data.amount)}
          </span>
        </span>
        <footer className="blockquote-footer mb-1">{data.description}</footer>
        <div>
          {data.tags.map((t, i) => (
            <small key={i} className="badge badge-secondary mr-1">
              {t.name}
            </small>
          ))}
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-end">
        <div className="mr-3 z-link" onClick={edit}>
          <FiEdit2 className="mr-1" />
          Edit
        </div>
        <div className="z-link" onClick={() => props.onDelete(data)}>
          <IoIosTrash className="mr-1" />
          Delete
        </div>
      </div>
    </div>
  );
};
