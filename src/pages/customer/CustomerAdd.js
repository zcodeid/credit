import React from "react";
import NavTop from "../../component/navTop";
import NumberFormat from "react-number-format";
import { addCustomer } from "../../api/api";
import ButtonLoading from "../../component/ButtonLoading";

function CustomerAdd(props) {
  const [nik, setNik] = React.useState("");
  const [name, setName] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [phone , setPhone] = React.useState("");
  // const [provinsi, setProvinsi] = React.useState("");
  // const [kabupaten, setKabupaten] = React.useState("");
  // const [kecamatan, setKecamatan] = React.useState("");
  // const [desa, setDesa] = React.useState("");
  const [income, setIncome] = React.useState("");
  const [spending, setSpending] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addCustomer({nik, name, phone, birthDate, address, income, spending});
      window.history.back();
    } catch (err){ console.log(err) }
    setLoading(false);
  };
  return (
    <>
      <NavTop title="Add Customer" />
      <div className="main-padding">
        <form className="px-2">
          <div className="form-group">
            <label htmlFor="nik">NIK</label>
            <input
              type="number"
              className="form-control"
              id="nik"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Nama</label>
            <input
              type="text"
              className="form-control"
              id="nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="no_hp">No HP</label>
            <input
              type="text"
              className="form-control"
              id="no_hp"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthDate">Tanggal Lahir</label>
            <input
              type="date"
              className="form-control"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="provinsi">Provinsi</label>
            <select
              name="provinsi"
              id="provinsi"
              className="form-control"
              value={provinsi}
              onChange={(e) => setProvinsi(e.target.value)}
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
              onChange={(e) => setKabupaten(e.target.value)}
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
              onChange={(e) => setKecamatan(e.target.value)}
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
              onChange={(e) => setDesa(e.target.value)}
            >
              <option value="">Pilih Desa</option>
              <option value="Tinggarjaya">Tinggarjaya</option>
            </select>
          </div> */}
          <div className="form-group">
            <label htmlFor="penghasilan">Penghasilan</label>
            <NumberFormat
              className="form-control"
              thousandSeparator={true}
              prefix={"Rp "}
              onValueChange={(v) => setIncome(v.floatValue)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pengeluaran">Pengeluaran</label>
            <NumberFormat
              className="form-control"
              thousandSeparator={true}
              prefix={"Rp "}
              onValueChange={(v) => setSpending(v.floatValue)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="alamat_lengkap">Alamat Lengkap</label>
            <textarea
              name="alamat_lengkap"
              id="alamat_lengkap"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>
          {
            loading ? (
              <ButtonLoading />
            ) : (
              <button
                className="btn btn-block btn-primary mt-3"
                onClick={submitForm}
              >
                Simpan
              </button>
            )
          }
        </form>
      </div>
    </>
  );
}

export default CustomerAdd;
