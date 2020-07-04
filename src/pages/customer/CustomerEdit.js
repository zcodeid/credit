import React from 'react';
import NavTop from '../../component/navTop';

function CustomerEdit(props){
    const [nik, setNik] = React.useState('');
    const [nama, setNama] = React.useState('');
    const [tanggal_lahir, setTanggalLahir] = React.useState('');
    const [provinsi, setProvinsi] = React.useState('');
    const [kabupaten, setKabupaten] = React.useState('');
    const [kecamatan, setKecamatan] = React.useState('');
    const [desa, setDesa] = React.useState('');
    const [penghasilan, setPenghasilan] = React.useState('');
    const [pengeluaran, setPengeluaran] = React.useState('');
    const [alamat_lengkap, setAlamatLengkap] = React.useState('');


    const submitForm = (e) => {
        e.preventDefault();

        const data = {
            nik, 
            nama, 
            tanggal_lahir, 
            provinsi, 
            kabupaten, 
            kecamatan,
            desa,
            penghasilan,
            pengeluaran,
            alamat_lengkap
        }

        console.table(data)
    }
    return(
        <>
            <NavTop title="Edit Customer" />
            <div className="main-padding">
                <form className="px-2">
                    <div className="form-group">
                        <label htmlFor="nik">NIK</label>
                        <input 
                            type="number" 
                            className="form-control"
                            id="nik" 
                            value={nik}
                            onChange={e => setNik(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nama">Nama</label>
                        <input 
                            type="text" 
                            className="form-control"
                            id="nama" 
                            value={nama}
                            onChange={e => setNama(e.target.value)}    
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tanggal_lahir">Tanggal Lahir</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            id="tanggal_lahir"
                            value={tanggal_lahir}
                            onChange={e => setTanggalLahir(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="provinsi">Provinsi</label>
                        <select 
                            name="provinsi"
                            id="provinsi"
                            className="form-control"
                            value={provinsi}
                            onChange={e => setProvinsi(e.target.value)}
                        >
                            <option value="a">Pilih Provinsi</option>
                            <option value="Jawa Tengah">Jawa Tengah</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="kabupaten">Kabupaten</label>
                        <select 
                            name="kabupaten"
                            id="kabupaten"
                            className="form-control"
                            value={kabupaten}
                            onChange={e => setKabupaten(e.target.value)}
                        >
                            <option value="">Pilih Kabupaten</option>
                            <option value="Cilacap">Cilacap</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="kecamatan">Kecamatan</label>
                        <select 
                            name="kecamatan" 
                            id="kecamatan" 
                            className="form-control"
                            value={kecamatan}
                            onChange={e => setKecamatan(e.target.value)}
                        >
                            <option value="">Pilih Kecamatan</option>
                            <option value="Sidareja">Sidareja</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="desa">Desa</label>
                        <select 
                            name="desa" 
                            id="desa" 
                            className="form-control"
                            value={desa}
                            onChange={e => setDesa(e.target.value)}
                        >
                            <option value="">Pilih Desa</option>
                            <option value="Tinggarjaya">Tinggarjaya</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="penghasilan">Penghasilan</label>
                        <input 
                            type="number"
                            className="form-control" 
                            id="penghasilan" 
                            value={penghasilan}
                            onChange={e => setPenghasilan(e.target.value)}    
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pengeluaran">Pengeluaran</label>
                        <input 
                            type="number"
                            className="form-control"
                            id="pengeluaran"
                            value={pengeluaran}
                            onChange={e => setPengeluaran(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="alamat_lengkap">Alamat Lengkap</label>
                        <textarea 
                            name="alamat_lengkap" 
                            id="alamat_lengkap" 
                            className="form-control"
                            value={alamat_lengkap}
                            onChange={e => setAlamatLengkap(e.target.value)}
                        >
                        </textarea>
                    </div>
                    <button className="btn btn-block btn-primary mt-3" onClick={submitForm}>Simpan</button>
                </form>
            </div>
        </>
    );
}

export default CustomerEdit;