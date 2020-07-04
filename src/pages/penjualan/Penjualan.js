import React from "react";
import Nav from "../../component/nav";
import { IoIosCart, IoIosPerson, IoIosTrash,IoMdAdd  } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";
import { FormatNumber } from "../../helpers";
import Fab from "../../component/fab";

function Penjualan(props){
    return (
        <>
            <Nav title="Penjualan" icon={IoIosCart} />
            <div class="main-padding">
                <Card {...props} />
                <Fab icon={IoMdAdd} onClick={(e) => props.history.push("/penjualan/add")} />
            </div>
        </>
    )
}

const Card = props => {
    const edit = () => {
        props.history.push("/penjualan/edit/");
    }
    return (
        <div class="z-card mx-1 mb-2">
            <div class="d-flex justify-content-between">
                <strong>
                    <IoIosPerson /> Nama Customer
                </strong>
                <span class="text-secondary">
                    Tanggal Penjualan
                </span>
            </div>
            <hr/>
            <div class="my-2 text-center">
                <span class="d-block">
                    <small>Rp</small>
                    <span className='font-weight-bold' style={{ fontSize: "2rem" }}>
                        {FormatNumber(10000)}
                    </span>
                    <footer class="blockquote-footer mb-2">
                        Deskripsi
                    </footer>
                </span>
            </div>
            <hr/>
            <div className="d-flex justify-content-end">
                <div className="mr-3 z-link" onClick={edit}>
                    <FiEdit2 className="mr-1" /> Edit
                </div>
                <div className="z-link" onClick={() => alert('anda menekan tombol delete')}>
                    <IoIosTrash className="mr-1" />Delete
                </div>
            </div>
        </div>
    )
}

export default Penjualan;