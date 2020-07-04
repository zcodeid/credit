import React from "react";
import NavTop from "../../component/navTop";
import NumberFormat from "react-number-format";
import { IoIosArrowForward } from "react-icons/io";
import { FormatDate, evict } from "../../helpers";
import { cashflowUpdate, getTags } from "../../api/api";
import ButtonLoading from "../../component/ButtonLoading";
import CreatableSelect from "react-select/creatable";

export default (props) => {
  const data = JSON.parse(localStorage.getItem("cashflow")) || {};
  const walletSearch =
    JSON.parse(localStorage.getItem("walletSearch")) || data.wallet;
  const currentTags = data.tags.map((t) => ({ label: t.name, value: t.name }));
  const [amount, setAmount] = React.useState(data.amount);
  const [date, setDate] = React.useState(FormatDate(data.date, "YYYY-MM-DD"));
  const [description, setDescription] = React.useState(data.description);
  const [selectedTags] = React.useState(currentTags);
  const [tags, setTags] = React.useState([]);
  const [tagNames, setTagNames] = React.useState(
    currentTags.map((t) => t.value)
  );
  const selectWallet = (e) => {
    props.history.push(
      "/wallet/search/" + data.wallet.id + "/walletSearch/notall"
    );
  };
  const [loading, setLoading] = React.useState(false);
  const handleSelectChange = (newValue, actionMeta) => {
    const names = newValue ? newValue.map((v) => v.value) : [];
    setTagNames(names);
  };
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const now = new Date();
    let a = new Date(date);
    a.setHours(now.getHours());
    a.setMinutes(now.getMinutes());
    a.setSeconds(now.getSeconds());
    const id = data.id;
    const wallet = { ...walletSearch };
    try {
      await cashflowUpdate({
        id,
        amount,
        tagNames,
        description,
        date: a,
        walletId: wallet.id,
      });
      evict("trx");
      window.history.back();
    } catch (err) {}
    setLoading(false);
  };
  const initTags = () => {
    getTags().then((r) => {
      const t = r.data.map((d) => ({ value: d.name, label: d.name }));
      setTags(t);
    });
  };
  React.useEffect(() => {
    initTags();
  }, []);
  return (
    <>
      <NavTop title="Edit Transaction" />
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
              prefix={"Rp "}
              value={amount}
              className="form-control"
              thousandSeparator={true}
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
              id="description"
              value={description}
              className="form-control"
              aria-describedby="descriptionHelp"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Tag</label>
            <CreatableSelect
              isMulti
              options={tags}
              defaultValue={selectedTags}
              onChange={handleSelectChange}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select Tag"
            />
          </div>
          <small id="descriptionHelp" className="d-none form-text text-muted">
            We'll never share your email with anyone else.
          </small>
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
