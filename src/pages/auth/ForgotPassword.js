import React from "react";
import { Link } from "react-router-dom";

export default (props) => {
  const submit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="main-padding">
      <div className="mx-4 mt-5">
        <h4 className="text-center">Z-Code</h4>
        <small className="d-block text-center mt-n2">Forgot Password</small>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" />
          </div>
          <button className="btn btn-block btn-primary">Submit</button>
        </form>
        <small className="fixed-bottom text-center mb-4">
          Copyright Z-Code 2020
        </small>
      </div>
    </div>
  );
};
