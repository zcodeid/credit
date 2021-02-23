import React from 'react';
import NavTop from '../../component/navTop';
import NumberFormat from 'react-number-format';

function ProductCategoryAdd(props){
    const [tanggal_cicil, setTanggalCicil] = React.useState('')
    const [nominal, setNominal] = React.useState('')
    const [kode_penjualan, setKodePenjualan] = React.useState('')

    const submit = e => {
        e.preventDefault();
        console.table({ tanggal_cicil, nominal, kode_penjualan });
    }
    return(
        <>
            <NavTop title="Add Product Category" />
            <div className="main-padding">
                <form className="px-2">
                    <div className="form-group">
                        <label htmlFor="kode_penjualan">Nama</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="nama" 
                        />
                    </div>
                    <button className="btn btn-block btn-primary mt-3" onClick={submit}>Simpan</button>
                </form>
            </div>
        </>
    );
}

export default ProductCategoryAdd;