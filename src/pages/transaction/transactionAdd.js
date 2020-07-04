import React from "react";
import NavTop from "../../component/navTop";
import ButtonLoading from "../../component/ButtonLoading";
import { cashflowPost, getTags } from "../../api/api";
import NumberFormat from "react-number-format";
import { IoIosArrowForward } from "react-icons/io";
import { FormatDate, evict } from "../../helpers";
import CreatableSelect from "react-select/creatable";

export default (props) => {
  const KEY = "walletSearch";
  const walletSearch = JSON.parse(localStorage.getItem(KEY)) || {};
  const [date, setDate] = React.useState(FormatDate(new Date(), "YYYY-MM-DD"));
  const [tags, setTags] = React.useState([]);
  const [tagNames, setTagNames] = React.useState([]);
  const [amount, setAmount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const initTags = () => {
    getTags().then((r) => {
      const t = r.data.map((d) => ({ value: d.name, label: d.name }));
      console.log(t);
      setTags(t);
    });
  };
  React.useEffect(() => {
    initTags();
  }, []);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const now = new Date();
    let a = new Date(date);
    a.setHours(now.getHours());
    a.setMinutes(now.getMinutes());
    a.setSeconds(now.getSeconds());
    try {
      const wallet = { ...walletSearch };
      await cashflowPost({
        amount,
        walletId: wallet.id,
        date: a,
        description,
        tagNames,
      });
      localStorage.removeItem(KEY);
      props.history.push("/transaction");
      evict("trx");
    } catch (err) {}
    setLoading(false);
  };
  const selectWallet = (e) => {
    const url = `/wallet/search/${walletSearch.id}/walletSearch/notall`;
    props.history.push(url);
  };
  const handleSelectChange = (newValue, actionMeta) => {
    const names = newValue.map((v) => v.value);
    setTagNames(names);
  };
  return (
    <>
      <NavTop title="Adding Transaction" />
      <div className="main-padding">
        <form className="px-2" onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="businessUnit">Wallet</label>
            <div
              className="form-control d-flex align-items-center justify-content-between"
              onClick={selectWallet}
            >
              <span>{walletSearch.name}</span>
              <IoIosArrowForward />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <NumberFormat
              id="amount"
              className="form-control"
              thousandSeparator={true}
              prefix={"Rp "}
              onValueChange={(v) => setAmount(v.floatValue)}
            />
            <small id="amountHelp" className="d-none form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={date}
              className="form-control"
              aria-describedby="dateHelp"
              onChange={(e) => setDate(e.target.value)}
            />
            <small id="dateHelp" className="d-none form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Description</label>
            <textarea
              className="form-control"
              id="description"
              aria-describedby="descriptionHelp"
              onChange={(e) => setDescription(e.target.value)}
            />
            <small id="descriptionHelp" className="d-none form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label>Tag</label>
            <CreatableSelect
              isMulti
              // defaultValue={[{ value: "x", label: "red" }]}
              options={tags}
              onChange={handleSelectChange}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select Tag"
            />
          </div>
          {loading ? (
            <ButtonLoading />
          ) : (
            <button className="btn btn-block btn-primary mt-3">Simpan</button>
          )}
        </form>
      </div>
    </>
  );
};
