import React from "react";
import { Link } from "react-router-dom";
import { login } from "../../api/api";
import ButtonLoading from "../../component/ButtonLoading";

export default (props) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await login({ username, password });
      localStorage.setItem("token", data.token);
      const { token, ...user } = data;
      localStorage.setItem("user", JSON.stringify(user));
      props.history.push("/");
    } catch (error) {}
    setLoading(false)
  };
  return (
    <div className="main-padding">
      <div className="mx-4 mt-5">
        <h4 className="text-center">Z-Code</h4>
        <form onSubmit={submit}>
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
          {
            loading ? (
              <ButtonLoading />
            ) : (
              <button type="submit" className="btn btn-block btn-primary">
                Login
              </button>
            )
          }
          <div className="d-flex justify-content-between mt-2">
            <Link to="/register">Create Account</Link>
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </form>
        <small className="fixed-bottom text-center mb-4">
          Copyright Z-Code 2020
        </small>
      </div>
    </div>
  );
};
