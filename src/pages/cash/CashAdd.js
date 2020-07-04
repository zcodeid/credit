import React from "react";
import NavTop from "../../component/navTop";
import { realCashPost } from "../../api/api";
import NumberFormat from "react-number-format";
import ButtonLoading from "../../component/ButtonLoading";
import { evict } from "../../helpers";

export default (props) => {
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await realCashPost({ name, amount });
      evict("cs");
      window.history.back();
    } catch (error) {}
    setLoading(false);
  };
  return (
    <>
      <NavTop title="Adding Cash" />
      <div className="main-padding">
        <form className="px-2" onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={(e) => setName(e.target.value)}
              aria-describedby="amountName"
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
        </form>
      </div>
    </>
  );
};
