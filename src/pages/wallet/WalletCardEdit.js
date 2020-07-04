import React from "react";
import { IoIosArrowForward } from "react-icons/io";
export default (props) => {
  const { data, onClick } = props;
  return (
    <div
      className="z-card mb-1 d-flex justify-content-between align-items-center cursor-pointer"
      onClick={onClick}
    >
      <div>
        <span className="d-block mb-n1">{data.name}</span>
        <small className="text-secondary">{data.description}</small>
      </div>
      <IoIosArrowForward />
    </div>
  );
};
