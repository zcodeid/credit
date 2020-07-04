import React from "react";
import Fab from "../../component/fab";
import Nav from "../../component/nav";
import Modal from "../../component/Modal";
import {
  IoIosTrash,
  IoMdAdd,
  IoIosWallet,
  IoIosArrowForward,
} from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";
import {
  FormatDate,
  FormatNumber,
  useLocalStorage,
  expiredStorage,
} from "../../helpers";
import { cashflowGet, cashflowDelete } from "../../api/api";
import Empty from "../../component/Empty";
import ButtonLoading from "../../component/ButtonLoading";
import TransactionLoader from "../../loader/TransactionLoader";

export default (props) => {
  const PAGE_SIZE = 10;
  const walletTrx = JSON.parse(localStorage.getItem("walletTrx"));
  let walletId = walletTrx === null ? "0" : walletTrx.id;
  const challengeText = "bismillah";
  const [data, setData] = useLocalStorage("trx_data", []);
  const [lastPage, setLastPage] = useLocalStorage("trx_lastPage", false);
  const [currentPage, setCurrentPage] = useLocalStorage("trx_currentPage", 0);
  const [currentWalletId, setCurrentWalletId] = useLocalStorage(
    "trx_walletId",
    "0"
  );

  const [modal, setModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadMore, setLoadMore] = React.useState(false);
  const [deletedTrx, setDeletedTrx] = React.useState(null);
  const [inputChallange, setInputChallange] = React.useState("");
  const [errorChallange, setErrorChallange] = React.useState("");
  const initData = async () => {
    try {
      setLoading(true);
      const response = await cashflowGet(0, PAGE_SIZE, walletId);
      setData(response.data.content);
      setLastPage(response.data.last);
      setCurrentPage(0);
      setCurrentWalletId(walletId || "0");
    } catch (err) {}
    setLoading(false);
  };
  React.useEffect(() => {
    const isExpired = expiredStorage("trx");
    const isWalletChange = currentWalletId !== walletId;
    if (isExpired || isWalletChange || data.length === 0) initData();
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
    e.preventDefault();
    try {
      setLoadMore(true);
      const response = await cashflowGet(currentPage + 1, PAGE_SIZE, walletId);
      setData([...data, ...response.data.content]);
      setLastPage(response.data.last);
      setCurrentPage(response.data.number);
      setLoadMore(false);
    } catch (err) {}
  };
  if (loading)
    return (
      <>
        <Nav title="Transaction" />
        <div className="main-padding">
          <TransactionLoader />
        </div>
      </>
    );

  if (data.length === 0) {
    return (
      <>
        <Nav title="Transaction" />
        <Empty />
        <Fab
          icon={IoMdAdd}
          onClick={(e) => {
            localStorage.removeItem("walletSearch");
            props.history.push("/transaction/add");
          }}
        />
      </>
    );
  }

  const selectWallet = () => {
    walletId = walletId || "0";
    props.history.push(`/wallet/search/${walletId}/walletTrx/all`);
  };

  return (
    <>
      <Nav title="Transaction" />
      <div className="main-padding">
        <button
          className="btn btn-secondary btn-block mb-2"
          onClick={selectWallet}
        >
          {walletTrx === null ? "All Wallet" : walletTrx.name}&nbsp;
          <IoIosArrowForward />
        </button>
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
          onClick={(e) => {
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

const Card = (props) => {
  const { data } = props;
  const edit = () => {
    localStorage.setItem("cashflow", JSON.stringify(data));
    props.history.push("/transaction/edit/" + data.id);
  };
  const color = data.amount < 0 ? "text-danger" : "";
  const searchByTag = (tag) => {
    localStorage.setItem("tag", JSON.stringify(tag));
    props.history.push("/transaction-search");
  };
  return (
    <div className="z-card mx-1 mb-2">
      <div className="d-flex justify-content-between">
        <strong>
          <IoIosWallet /> {data.wallet.name}
        </strong>
        <span className="text-secondary">{FormatDate(data.date)}</span>
      </div>
      <hr />
      <div className={`my-2 text-center ${color}`}>
        <span className="d-block">
          <small>Rp</small>
          <span className={`font-weight-bold`} style={{ fontSize: "2rem" }}>
            {FormatNumber(data.amount)}
          </span>
        </span>
        <footer className="blockquote-footer mb-1">{data.description}</footer>
        <div>
          {data.tags.map((t, i) => (
            <small
              key={i}
              onClick={() => searchByTag(t)}
              className="badge badge-secondary cursor-pointer mr-1"
            >
              {t.name}
            </small>
          ))}
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-end">
        <div className="mr-3 z-link" onClick={edit}>
          <FiEdit2 className="mr-1" />
          Edit
        </div>
        <div className="z-link" onClick={() => props.onDelete(data)}>
          <IoIosTrash className="mr-1" />
          Delete
        </div>
      </div>
    </div>
  );
};
