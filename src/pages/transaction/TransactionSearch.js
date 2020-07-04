import React from "react";
import Fab from "../../component/fab";
import Modal from "../../component/Modal";
import { IoMdAdd } from "react-icons/io";
import { cashflowGet, cashflowDelete, getTags } from "../../api/api";
import Empty from "../../component/Empty";
import ButtonLoading from "../../component/ButtonLoading";
import TransactionLoader from "../../loader/TransactionLoader";
import Card from "./TransactionCard";
import NavTop from "../../component/navTop";
import Select from "react-select";
import { FormatNumber } from "../../helpers";

export default (props) => {
  const PAGE_SIZE = 10;
  const walletTrx = JSON.parse(localStorage.getItem("walletTrx"));
  const tag = JSON.parse(localStorage.getItem("tag"));
  let walletId =
    walletTrx === null || walletTrx.id === "0" ? undefined : walletTrx.id;
  const challengeText = "bismillah";
  const [tags, setTags] = React.useState([]);
  const [tagNames, setTagNames] = React.useState([tag.name]);
  const [data, setData] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [loadMore, setLoadMore] = React.useState(false);
  const [lastPage, setLastPage] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [deletedTrx, setDeletedTrx] = React.useState(null);
  const [selectedTags, setSelectedTags] = React.useState([
    { value: tag.name, label: tag.name },
  ]);
  const [inputChallange, setInputChallange] = React.useState("");
  const [errorChallange, setErrorChallange] = React.useState("");
  const handleSelectChange = (newValue, actionMeta) => {
    const names = newValue ? newValue.map((v) => v.value) : [];
    setSelectedTags(newValue);
    setTagNames(names);
    loadData(0, names);
  };
  const loadData = (page, names) => {
    if (names.length === 0) {
      setData([]);
      return;
    }
    setLoading(true);
    cashflowGet(page, PAGE_SIZE, null, names).then((response) => {
      setData(response.data.content);
      setLastPage(response.data.last);
      setLoading(false);
    });
  };
  const initTags = () => {
    getTags().then((r) => {
      const t = r.data.map((d) => ({ value: d.name, label: d.name }));
      setTags(t);
    });
  };
  React.useEffect(() => {
    loadData(0, [tag.name]);
    initTags();
  }, []);

  const remove = () => {
    if (inputChallange !== challengeText) {
      setErrorChallange("Challange Text tidak sesuai");
      return;
    }
    cashflowDelete(deletedTrx.id);
    setModal(false);
    setData(data.filter((d) => d.id !== deletedTrx.id));
  };
  const closeModal = () => {
    setErrorChallange("");
    setInputChallange("");
    setModal(false);
  };
  const fetchMore = async (e) => {
    setLoadMore(true);
    cashflowGet(currentPage + 1, PAGE_SIZE, null, tagNames).then((response) => {
      setData([...data, ...response.data.content]);
      setLastPage(response.data.last);
      setCurrentPage(response.data.number);
      setLoadMore(false);
    });
  };
  if (loading)
    return (
      <>
        <NavTop title="Transaction by Tags" />
        <div className="main-padding">
          <Select
            isMulti
            defaultValue={selectedTags}
            options={tags}
            onChange={handleSelectChange}
            className="basic-multi-select mb-2"
            classNamePrefix="select"
            placeholder="Pilih Tag"
          />
          <TransactionLoader />
        </div>
      </>
    );

  if (data.length === 0) {
    return (
      <>
        <NavTop title="Transaction by Tags" />
        <div className="main-padding">
          <Select
            isMulti
            defaultValue={selectedTags}
            options={tags}
            onChange={handleSelectChange}
            className="basic-multi-select mb-2"
            classNamePrefix="select"
            placeholder="Pilih Tag"
          />
          <Empty />
        </div>
        <Fab
          icon={IoMdAdd}
          onClick={() => {
            localStorage.removeItem("walletSearch");
            props.history.push("/transaction/add");
          }}
        />
      </>
    );
  }

  return (
    <>
      <NavTop title="Transaction by Tags" />
      <div className="main-padding">
        <Select
          isMulti
          defaultValue={selectedTags}
          options={tags}
          onChange={handleSelectChange}
          className="basic-multi-select mb-2"
          classNamePrefix="select"
          placeholder="Pilih Tag"
        />
        <h3>
          <span className="badge badge-warning ml-1">
            Rp{" "}
            {FormatNumber(data.map((d) => d.amount).reduce((a, b) => a + b, 0))}
          </span>
        </h3>
        {data.map((d, i) => (
          <Card
            data={d}
            key={i}
            {...props}
            onDelete={(trx) => {
              setModal(true);
              setDeletedTrx(trx);
            }}
          />
        ))}
        {loadMore ? (
          <ButtonLoading />
        ) : (
          !lastPage && (
            <button
              className="btn btn-outline-primary btn-block my-4"
              onClick={fetchMore}
            >
              Load More
            </button>
          )
        )}
        <Fab
          icon={IoMdAdd}
          onClick={() => {
            localStorage.removeItem("walletSearch");
            props.history.push("/transaction/add");
          }}
        />
        <Modal
          show={modal}
          title="Delete Transaction"
          onClose={() => setModal(false)}
          onPositive={remove}
          onNegative={closeModal}
        >
          Proses ini tidak dapat di-undo. Jika Anda yakin, silakan tulis&nbsp;
          <strong className="text-danger">{challengeText}</strong> di bawah ini.
          <input
            type="text"
            className="form-control mt-1"
            value={inputChallange}
            onChange={(e) => setInputChallange(e.target.value)}
          />
          {errorChallange.length > 0 && (
            <small className="text-danger">{errorChallange}</small>
          )}
        </Modal>
      </div>
    </>
  );
};
