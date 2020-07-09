import React from "react";
import Nav from "../../component/nav";
import { IoIosPeople } from "react-icons/io";
import CustomerList from "./CustomerList";

function Customer(props) {
  return (
    <>
      <Nav title="Customer" icon={IoIosPeople} />
      <CustomerList {...props} />
    </>
  );
}

export default Customer;
