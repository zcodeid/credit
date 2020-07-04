import React from "react";
import { Link } from "react-router-dom";
import { register } from "../../api/api";
import ButtonLoading from "../../component/ButtonLoading";

export default (props) => {
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await register({ name, username, password, email, phone });
      window.history.back();
    } catch (err) {}
    setLoading(false)
  };
  return (
    <div className="main-padding">
      <div className="mx-4 mt-1">
        <h4 className="text-center">Z-Code</h4>
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {
            loading ? (
              <ButtonLoading/>
            ) : (
              <button className="btn btn-block btn-primary" onClick={submit}>
                Register
              </button>
            )
          }
          <Link to="/login" className="btn btn-link d-block m-auto mt-2">
            Login Page
          </Link>
        </form>
        <small className="fixed-bottom text-center mb-4">
          Copyright Z-Code 2020
        </small>
      </div>
    </div>
  );
};
