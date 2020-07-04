import React from "react";
import { IoIosWarning, IoIosClose } from "react-icons/io";

/* 
onClose => handling click icon X
onPositive => handling Yes button
onNegative => handling No button
show => true: will show dialog
children => modal body
 */
const Modal = ({ onClose, title, show, children, onPositive, onNegative }) => {
  let classShow = show ? "modal-bg d-block" : "d-none";
  const negativeAction = onNegative ? onNegative : onClose;
  return (
    <div className={classShow}>
      <div className="modal-content">
        <div className="modal-content-header">
          <div>
            {/* <IoIosWarning size="1.5em" /> */}
            <span className="modal-content-title">{title}</span>
          </div>
          <IoIosClose
            className="modal-content-close"
            size="1.5em"
            onClick={onClose}
          />
        </div>
        <div className="modal-content-body">{children}</div>
        <div className="modal-content-footer">
          <button
            className="btn btn-sm btn-warning mr-1"
            onClick={() => negativeAction()}
          >
            Tidak
          </button>
          <button
            className="btn btn-sm btn-primary px-3"
            onClick={() => onPositive()}
          >
            Ya
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
