import React from 'react';
import NavTop from '../../component/navTop';
import CreatableSelect from "react-select/creatable";
import NumberFormat from "react-number-format";

function PenjualanEdit(props){
    const [tanggal_penjualan, setTanggalPenjualan] = React.useState('')
    const [harga_beli, setHargaBeli]               = React.useState('')
    const [dp, setDp] = React.useState('')
    const [tanggal_bayar, setTanggalBayar] = React.useState('')

    const submit = e => {
        e.preventDefault()
        const data = {
            tanggal_penjualan,
            harga_beli, 
            dp,
            tanggal_bayar
        }

        console.table(data)
    }

    return (
        <>
            <NavTop title="Edit Penjualan" />
            <div className="main-padding">
                <form className="px-2">
                    <div className="form-group">
                        <label htmlFor="tanggal_penjualan">Tanggal Penjualan</label>
                        <input 
                            type="date"
                            className="form-control"
                            id="tanggal_penjualan"
                            value={tanggal_penjualan}
                            onChange={e => setTanggalPenjualan(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="harga_beli">Harga Beli</label>
                        <NumberFormat
                            className="form-control"
                            thousandSeparator={true}
                            prefix={"Rp "}
                            onValueChange={(v) => setHargaBeli(v.floatValue)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dp">DP</label>
                        <NumberFormat
                            className="form-control"
                            thousandSeparator={true}
                            prefix={"Rp "}
                            onValueChange={(v) => setDp(v.floatValue)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tanggal_bayar">Tanggal Bayar</label>
                        <input 
                            type="number"
                            className="form-control"
                            id="tanggal_bayar" 
                            max="28"
                            value={tanggal_bayar}
                            onChange={e => setTanggalBayar(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="customer">Customer</label>
                        <CreatableSelect
                            // defaultValue={[{ value: "x", label: "red" }]}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Select Customer"
                        />
                    </div>
                    <button className="btn btn-block btn-primary mt-3" onClick={submit}>Simpan</button>
                </form>
            </div>
        </>
    )
}

export default PenjualanEdit;