import React from "react";

export default (props) => {
  const btnClass = props.className || "btn btn-outline-primary btn-block my-4";
  return (
    <button className={btnClass} disabled>
      <span className="spinner-border spinner-border-sm"></span>&nbsp; Loading..
    </button>
  );
};
