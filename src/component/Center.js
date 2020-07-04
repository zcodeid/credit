import React from "react";

export default (props) => {
  return (
    <>
      <div className="center-entire">
        <props.icon size="10em" color="#8a8a8a" />
        <p className="text-secondary">{props.text}</p>
      </div>
    </>
  );
};
