import React from "react";
import { Link } from "react-router-dom";
import Nav from "../../component/nav";
import { IoIosContact } from "react-icons/io";
import { GrEdit } from "react-icons/gr";
export default (props) => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    props.history.push("/login");
  };
  return (
    <>
      <Nav title="Account" icon={IoIosContact} />
      <div className="main-padding">
        <div className="d-flex align-items-center justify-content-between z-card">
          <div>
            <span className="d-block font-weight-bold">{user.name}</span>
            <span className="d-block">@{user.username}</span>
            <span className="d-block">{user.email}</span>
            <span className="d-block">{user.phone}</span>
          </div>
          <GrEdit
            size="1.3em"
            className="mr-3"
            onClick={(e) => props.history.push("/account/edit-profile")}
          />
        </div>
        <Link to="/account/change-password" className="btn btn-link">
          Change Password
        </Link>
        <button
          className="btn btn-block btn-outline-danger mt-3"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </>
  );
};
