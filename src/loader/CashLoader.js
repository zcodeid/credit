import React from "react";

export default (props) => {
  const dummies = [...Array(10).keys()];
  return (
    <div className="main-padding">
      <small
        className="d-block mx-auto z-loading mb-1"
        style={{ maxWidth: "100px" }}
      ></small>
      <span
        className="d-block m-auto z-loading"
        style={{ fontSize: "1.5rem", maxWidth: "200px" }}
      >
        &nbsp;
      </span>
      <hr />
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
