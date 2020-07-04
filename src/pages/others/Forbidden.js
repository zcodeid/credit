import React from "react";
import { GiPrayer } from "react-icons/gi";
import { Link } from "react-router-dom";

export default (props) => {
  return (
    <div className="center-entire">
      <GiPrayer size="20em" color="#bf3a3a" />
      <h3 style={{ color: "#bf3a3a", fontWeight: "bold" }}>FORBIDDEN</h3>
      <p style={{ lineHeight: "1.5em", fontSize: "70%" }}>
        Anda tidak memiliki hak akses,
        <br />
        silahkan login dengan Akun yang sesuai.
      </p>
      <Link to="/login" className="btn btn-block btn-outline-dark">
        Login
      </Link>
    </div>
  );
};
