import React from "react";
import NavTop from "../../component/navTop";
import Modal from "../../component/Modal";
import { walletUpdate, walletDelete } from "../../api/api";
import ButtonLoading from "../../component/ButtonLoading";
import { evict } from "../../helpers";

export default (props) => {
  const storage = JSON.parse(localStorage.getItem("wallet")) || {};
  const id = storage.id;
  const [name, setName] = React.useState(storage.name);
  const [description, setDescription] = React.useState(storage.description);
  const [modal, setModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await walletUpdate({ id, name, description });
      window.history.back();
      evict("wl");
    } catch (err) {}
    setLoading(false);
  };
  const remove = async () => {
    try {
      await walletDelete(storage.id);
      evict("wl");
      window.history.back();
    } catch (err) {}
  };

  return (
    <>
      <NavTop title="Edit Wallet" />
      <div className="main-padding">
        <form className="px-2" onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
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
              value={description}
              className="form-control"
              aria-describedby="descriptionHelp"
              onChange={(e) => setDescription(e.target.value)}
            />
            <small id="descriptionHelp" className="d-none form-text text-muted">
              We'll never share your email with anyone else.
            </small>
            {loading ? (
              <ButtonLoading />
            ) : (
              <button className="btn btn-block btn-primary mt-3">Simpan</button>
            )}
            <button
              type="button"
              className="btn btn-block btn-outline-danger mt-2"
              onClick={(e) => {
                e.preventDefault();
                setModal(true);
              }}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
      <Modal
        show={modal}
        title="Delete Wallet"
        onClose={() => setModal(false)}
        onPositive={remove}
        // onNegative={() => alert("neg")}
      >
        Apakah anda yakin akan hapus wallet?
      </Modal>
    </>
  );
};
