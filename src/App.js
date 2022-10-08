import React from "react";
import "./style.css";
import { useState } from "react";
function App() {
  const [localData, setLocalData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  let [page, setPage] = useState(true);
  let [del, setDel] = useState(true);

  let [delValue, setDelValue] = useState(false);

  let handleFunc = () => {
    setPage(!page);
    setInputData({
      ism: "",
      fam: "",
      tel: "",
    });
  };
  const [qiymat, setQiymat] = useState("");

  const [inputData, setInputData] = useState({
    ism: "",
    fam: "",
    tel: "",
  });
  // onchanche function
  let changeFunc = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  // malumot tahrirlash
  let tahrir = (elem, index) => {
    setQiymat(index);
    setInputData({
      ism: elem.ism,
      fam: elem.fam,
      tel: elem.tel,
    });
    setPage(!page);
  };

  // malumot ochirish
  let ochir = (item) => {
    localStorage.setItem(
      "data",
      JSON.stringify(localData.filter((val) => val.id !== item.id))
    );
    setLocalData(JSON.parse(localStorage.getItem("data")));
  };

  // malumot send()
  let dataSend = (e) => {
    e.preventDefault();
    if (qiymat === "") {
      if (localStorage.getItem("data")) {
        localStorage.setItem(
          "data",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("data")),
            { ...inputData, id: new Date().getTime().toString() },
          ])
        );
        setLocalData(JSON.parse(localStorage.getItem("data")));
      } else {
        localStorage.setItem(
          "data",
          JSON.stringify([
            { ...inputData, id: new Date().getTime().toString() },
          ])
        );
        setLocalData(JSON.parse(localStorage.getItem("data")));
      }
      setInputData({
        ism: "",
        fam: "",
        tel: "",
      });
      handleFunc();
    } else {
      setQiymat("");
      localStorage.setItem(
        "data",
        JSON.stringify([
          ...localData.slice(0, qiymat),
          { ...inputData, id: new Date().getTime().toString() },
          ...localData.slice(qiymat + 1, localData.length),
        ])
      );
      setLocalData(JSON.parse(localStorage.getItem("data")));
      setInputData({
        ism: "",
        fam: "",
        tel: "",
      });
      handleFunc();
    }
  };

  return (
    <div className="App">
      <div
        className={page ? "modal_body" : "modal_body active "}
        onClick={() => setPage(!page)}
      >
        <form
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
          onSubmit={dataSend}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            name="ism"
            value={inputData.ism}
            onInput={changeFunc}
            placeholder="ism kiriting"
          />
          <input
            type="text"
            name="fam"
            placeholder="familya kiriting"
            value={inputData.fam}
            onInput={changeFunc}
          />
          <input
            type="text"
            name="tel"
            value={inputData.tel}
            onInput={changeFunc}
            placeholder="tel"
          />
          <div className="btn-group">
            <button className="send"> jonat </button>
            <button
              type="button"
              className="cancel"
              onClick={() => setPage(!page)}
            >
              cancel
            </button>
          </div>
        </form>
      </div>

      {/* modal_delete */}
      {/* <div className={del ? "alert_body" : "alert_body active "}>
        <div className="btn-group moda_btn ">
          <button className="send">Yes</button>
          <button type="button" className="cancel">
            No
          </button>
        </div>
      </div> */}

      <div className="table_page">
        <div style={{ textAlign: "right" }}>
          <button className="add" onClick={handleFunc}>
            malumot qo'shish
          </button>
        </div>
        <table
          border={1}
          style={{
            width: "500px",
            borderCollapse: "collapse",
            margin: "10px 0",
          }}
        >
          <thead>
            <tr>
              <th>№</th>
              <th>ism</th>
              <th>fam</th>
              <th>tel</th>
              <th colSpan={2}>action</th>
            </tr>
          </thead>
          <tbody>
            {localData.length > 0 ? (
              localData.map((item, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{item.ism}</td>
                  <td>{item.fam}</td>
                  <td>{item.tel}</td>
                  <td>
                    <button
                      style={{
                        background: "green",
                      }}
                      onClick={() => tahrir(item, i)}
                    >
                      edit
                    </button>
                  </td>
                  <td>
                    <button
                      style={{ background: "red" }}
                      onClick={() => ochir(item)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <th colSpan={10}>malumot yo'q...</th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
