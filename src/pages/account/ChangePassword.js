import React from "react";
import NavTop from "../../component/navTop";
import { changePassword } from "../../api/api";
import NumberFormat from "react-number-format";
import ButtonLoading from "../../component/ButtonLoading";

export default (props) => {
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState(0);
  const [newPasswordRe, setNewPasswordRe] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await changePassword({ oldPassword, newPassword });
      window.history.back();
    } catch (error) {}
    setLoading(false);
  };
  return (
    <>
      <NavTop title="Change Password" />
      <div className="main-padding">
        <form className="px-2" onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="name">Old Password</label>
            <input
              type="text"
              id="oldPassword"
              className="form-control"
              onChange={(e) => setOldPassword(e.target.value)}
              aria-describedby="amountName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">New Password</label>
            <input
              type="text"
              id="newPassword"
              className="form-control"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">New Password (ulangi)</label>
            <input
              type="text"
              id="newPasswordRe"
              className="form-control"
              onChange={(e) => setNewPasswordRe(e.target.value)}
            />
          </div>
          {
            loading ? (
              <ButtonLoading/>
            ) : (
              <button className="btn btn-block btn-primary">Simpan</button>
            )
          }
        </form>
      </div>
    </>
  );
};
