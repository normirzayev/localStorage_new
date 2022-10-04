import React from "react";
import { useState } from "react";
function App() {
  const [localData, setLocalData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );

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
  };

  // malumot ochirish
  let ochir = (item) => {
    localStorage.setItem(
      "data",
      JSON.stringify(localData.filter((val) => val !== item))
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
            inputData,
          ])
        );
        setLocalData(JSON.parse(localStorage.getItem("data")));
      } else {
        localStorage.setItem("data", JSON.stringify([inputData]));
        setLocalData(JSON.parse(localStorage.getItem("data")));
      }
      setInputData({
        ism: "",
        fam: "",
        tel: "",
      });
    } else {
      console.log("tahrirlandi");
      setQiymat("");
      localStorage.setItem(
        "data",
        JSON.stringify([
          ...localData.slice(0, qiymat),
          inputData,
          ...localData.slice(qiymat + 1, localData.length),
        ])
      );
      setLocalData(JSON.parse(localStorage.getItem("data")));
      setInputData({
        ism: "",
        fam: "",
        tel: "",
      });
    }
  };

  return (
    <div className="App">
      <form
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
        onSubmit={dataSend}
      >
        <input
          type="text"
          name="ism"
          value={inputData.ism}
          onInput={changeFunc}
        />
        <input
          type="text"
          name="fam"
          value={inputData.fam}
          onInput={changeFunc}
        />
        <input
          type="text"
          name="tel"
          value={inputData.tel}
          onInput={changeFunc}
        />
        <button> jonat </button>
      </form>

      <table border={1} style={{ width: "500px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>№</th>
            <th>ism</th>
            <th>fam</th>
            <th>tel</th>
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
                      width: "80%",
                      background: "green",
                      border: "none",
                    }}
                    onClick={() => tahrir(item, i)}
                  >
                    edit
                  </button>
                </td>
                <td>
                  <button
                    style={{ width: "80%", background: "red", border: "none" }}
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
  );
}

export default App;
