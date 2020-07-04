import React from "react";
import { IoIosMagnet, IoIosArrowForward, IoIosMoon } from "react-icons/io";
import { AiOutlineLineChart, AiOutlineTable } from "react-icons/ai";

const X = () => {
  const dummies = [...Array(10).keys()];
  return (
    <div className="main-padding mb-5">
      <div className="z-card d-flex justify-content-center mb-2">
        <div className="text-right">
          <small>Transaction</small>
          <span
            className="d-block z-loading"
            style={{ minWidth: "100px" }}
          ></span>
        </div>
        <div className="v1" />
        <div className="text-left">
          <small>Cash</small>
          <span
            className="d-block z-loading"
            style={{ minWidth: "100px" }}
          ></span>
        </div>
      </div>
      <div className="z-card mb-2">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <IoIosMagnet className="mr-1" />
            <span className="font-weight-bold">Transaction by Wallet</span>
          </div>
          <IoIosArrowForward />
        </div>
        <hr className="mt-1" />
        <div className="column-2">
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
        </div>
      </div>
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
          <button className="btn btn-sm"></button>
        </div>
        <div className="z-loading"></div>
        <div className="z-loading"></div>
        <div className="z-loading"></div>
        <div className="z-loading"></div>
        <div className="z-loading"></div>
      </div>
    </div>
  );
};

export default X;
