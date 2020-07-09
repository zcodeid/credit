import React from "react";
import { IoMdAdd } from "react-icons/io";
import Fab from "../../component/fab";
import Nav from "../../component/nav";
import Simulation from "../simulation";
export default (props) => {
  return (
    <>
      <Nav />
      <p>&nbsp;</p>
      <Simulation />
      <Fab
        icon={IoMdAdd}
        onClick={() => {
          props.history.push("/transaction/add");
        }}
      />
    </>
  );
};
