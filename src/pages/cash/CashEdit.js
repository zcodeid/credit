import React from "react";
import NavTop from "../../component/navTop";
import Modal from "../../component/Modal";
import NumberFormat from "react-number-format";
import { realCashUpdate, realCashDelete } from "../../api/api";
import ButtonLoading from "../../component/ButtonLoading";
import { evict } from "../../helpers";

export default (props) => {
  // alert(props.match.params.id);
  const param = props.match.params;
  const id = param.id;
  const [name, setName] = React.useState(param.name);
  const [amount, setAmount] = React.useState(param.amount);
  const [modal, setModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await realCashUpdate({ id, name, amount });
      window.history.back();
    } catch (error) {}
    setLoading(false);
    evict("cs");
  };
  const remove = async () => {
    try {
      await realCashDelete(id);
      window.history.back();
      evict("cs");
    } catch (er) {}
  };
  return (
    <>
      <NavTop title="Edit Cash" />
      <div className="main-padding">
        <form className="px-2" onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="amountName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <small id="amountName" className="d-none form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <NumberFormat
              className="form-control"
              thousandSeparator={true}
              prefix={"Rp "}
              value={amount}
              onValueChange={(v) => setAmount(v.floatValue)}
            />
            <small id="amountName" className="d-none form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          {loading ? (
            <ButtonLoading />
          ) : (
            <button className="btn btn-block btn-primary">Simpan</button>
          )}
          <button
            className="btn btn-block btn-outline-danger"
            type="button"
            onClick={(e) => setModal(true)}
          >
            Delete
          </button>
        </form>
      </div>
      <Modal
        show={modal}
        title="Delete Cash"
        onClose={() => setModal(false)}
        onPositive={remove}
      >
        Apakah anda yakin akan menghapus Cash?
      </Modal>
    </>
  );
};
