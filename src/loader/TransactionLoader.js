import React from "react";

export default (props) => {
  const dummies = [...Array(5).keys()];
  return dummies.map((d, i) => <Card key={i} />);
};

const Card = () => {
  return (
    <div className="z-card mx-1 mb-2">
      <div className="d-flex justify-content-between">
        <span className="z-loading" style={{ maxWidth: "100px" }}></span>
        <span className="z-loading" style={{ maxWidth: "90px" }} />
      </div>
      <hr />
      <div className={`my-2 text-center`}>
        <span className="d-block">
          <span
            className={`font-weight-bold z-loading`}
            style={{ fontSize: "2rem", maxWidth: "200px" }}
          ></span>
        </span>
        <footer
          className="blockquote-footer z-loading"
          style={{ maxWidth: "100px" }}
        ></footer>
      </div>
      <hr />
      <div className="d-flex justify-content-end">
        <span className="z-loading mr-2" style={{ maxWidth: "50px" }}></span>
        <span className="z-loading" style={{ maxWidth: "50px" }}></span>
      </div>
    </div>
  );
};
