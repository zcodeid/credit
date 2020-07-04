import React from "react";

export default (props) => {
  const dummies = [...Array(10).keys()];
  return (
    <div className="main-padding">
      {dummies.map((d, i) => (
        <div key={i} className="z-card mb-1 ">
          <span
            className="d-block z-loading mb-1"
            style={{ maxWidth: "100px" }}
          >
            &nbsp;
          </span>
          <small
            className="d-block z-loading"
            style={{ maxWidth: "130px", maxHeight: "0.5rem" }}
          ></small>
        </div>
      ))}
    </div>
  );
};
