import React from "react";
import { IoIosArrowForward, IoMdAdd } from "react-icons/io";
import Fab from "../../component/fab";

function CustomerList(props) {
  return (
    <div className="main-padding">
      <input type="search" className="form-control" placeholder="search . . " />
      <div
        className="mt-3 cursor-pointer"
        onClick={(e) => props.history.push("/customer/edit")}
      >
        <div className="z-card mb-1 d-flex justify-content-between align-items-center cursor-pointer">
          <div>
            <span className="d-block mb-1">Nama Customer</span>
            <small className="text-secondary">Alamat Customer</small>
          </div>
          <IoIosArrowForward />
        </div>
      </div>
      <Fab
        icon={IoMdAdd}
        onClick={(e) => props.history.push("/customer/add")}
      />
    </div>
  );
}

export default CustomerList;
