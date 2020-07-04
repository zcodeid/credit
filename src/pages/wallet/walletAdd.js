import React from "react";
import NavTop from "../../component/navTop";
import { walletPost } from "../../api/api";
import ButtonLoading from "../../component/ButtonLoading";

export default (props) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await walletPost({ name, description });
      window.history.back();
    } catch (err) {}
    setLoading(false);
  };
  return (
    <>
      <NavTop title="Adding Wallet" />
      <div className="main-padding">
        <form className="px-2" onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="form-control"
              aria-describedby="amountName"
              onChange={(e) => setName(e.target.value)}
            />
            <small id="amountName" className="d-none form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Description</label>
            <textarea
              id="description"
              className="form-control"
              aria-describedby="descriptionHelp"
              onChange={(e) => setDescription(e.target.value)}
            />
            <small id="descriptionHelp" className="d-none form-text text-muted">
              We'll never share your email with anyone else.
            </small>
            {
              loading ? (
                <ButtonLoading/>
              ) : (
                <button className="btn btn-block btn-primary mt-3">Simpan</button>
              )
            }
          </div>
        </form>
      </div>
    </>
  );
};
