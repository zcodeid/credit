import React from "react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
export default (props) => {
  const { selected, data, onClick } = props;
  return (
    <div
      onClick={onClick}
      className="z-card mb-1 d-flex justify-content-start align-items-center"
    >
      {selected ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
      <div className="ml-3">
        <span className="d-block mb-n1">{data.name}</span>
        <small className="text-secondary">{data.description}</small>
      </div>
    </div>
  );
};
