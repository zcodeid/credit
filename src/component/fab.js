/* floating action button */
import React from "react";

export default (props) => {
  return (
    <div className="fab" onClick={props.onClick}>
      <span>
        <props.icon />
      </span>
    </div>
  );
};
