import React from 'react';
import NavTop from '../../component/navTop';

function CicilanAdd(props){
    const [tanggal_cicil, setTanggalCicil] = React.useState('')
    const [nominal, setNominal] = React.useState('')
    const [kode_penjualan, setKodePenjualan] = React.useState('')

    const submit = e => {
        e.preventDefault();
        console.table({ tanggal_cicil, nominal, kode_penjualan });
    }
    return(
        <>
            <NavTop title="Add Cicilan" />
            <div className="main-padding">
                <form className="px-2">
                    <div className="form-group">
                        <label htmlFor="tanggal_cicil">Tanggal Cicil</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            id="tanggal_cicil" 
                            value={tanggal_cicil}
                            onChange={e => setTanggalCicil(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nominal">Nominal</label>
                        <input 
                            type="number"
                            className="form-control"
                            id="nominal" 
                            value={nominal}
                            onChange={e => setNominal(e.target.value)}    
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="kode_penjualan">Kode Penjualan</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            id="kode_penjualan" 
                            value={kode_penjualan}
                            onChange={e => setKodePenjualan(e.target.value)}    
                        />
                    </div>
                    <button className="btn btn-block btn-primary mt-3" onClick={submit}>Simpan</button>
                </form>
            </div>
        </>
    );
}

export default CicilanAdd;