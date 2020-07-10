import React from "react";
import { IoIosArrowForward, IoMdAdd } from "react-icons/io";
import Fab from "../../component/fab";
import { getCustomer } from "../../api/api";

function CustomerList(props) {
  const [data, setData] = React.useState([]);

  const loadData = async () => {
    try {
      const response = await getCustomer();
      setData(response.data.content);
    } catch (err){
      console.log(err)
    }
  }

  const edit = (customer) => {
    localStorage.setItem("customer", JSON.stringify(customer));
    props.history.push("/customer/edit");
  }

  React.useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="main-padding">
      <input type="search" className="form-control" placeholder="search . . " />
      {
        data.map((d, i) => (
          <div
            className="mt-3 cursor-pointer"
            onClick={() => edit(d)}
            key={i}
          >
            <div className="z-card mb-1 d-flex justify-content-between align-items-center cursor-pointer">
              <div>
                <span className="d-block mb-1">{d.name}</span>
                <small className="text-secondary">{d.address}</small>
              </div>
              <IoIosArrowForward />
            </div>
          </div>
        ))
      }
      <Fab
        icon={IoMdAdd}
        onClick={(e) => props.history.push("/customer/add")}
      />
    </div>
  );
}

export default CustomerList;
