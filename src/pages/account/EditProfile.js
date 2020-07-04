import React from "react";
import NavTop from "../../component/navTop";
import { updateProfile } from "../../api/api";
import ButtonLoading from "../../component/ButtonLoading";

export default (props) => {
  const storage = JSON.parse(localStorage.getItem("user")) || {};
  const [name, setName] = React.useState(storage.name);
  const [email, setEmail] = React.useState(storage.email);
  const [phone, setPhone] = React.useState(storage.phone);
  const [loading, setLoading] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile({ name, email, phone });
      window.history.back();
    } catch (error) {}
    setLoading(false);
  };
  return (
    <>
      <NavTop title="Edit Profile" />
      <div className="main-padding">
        <form className="px-2" onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
