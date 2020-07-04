import React from "react";
import { IoIosArrowBack } from "react-icons/io";

export default (props) => {
  return (
    <div className="top-menu-back">
      <IoIosArrowBack
        className="top-menu-back-action"
        onClick={() => window.history.back()}
      />
      <span className="top-menu-back-title">{props.title || "Z-Code"}</span>
    </div>
  );
};
