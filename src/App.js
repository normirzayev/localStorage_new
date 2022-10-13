import React from "react";
import { useState } from "react";
function App() {
  const [localData, setLocalData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );

  const [qiymat, setQiymat] = useState("");

  const fetchData = () => {
    setLocalData(JSON.parse(localStorage.getItem("data")) || []);
  };

  const [inputData, setInputData] = useState({
    nomi: "",
    malumot: "",
    rasm: "",
    count: 1,
  });
  // onchanche function
  let changeFunc = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  let rasmChangeFunc = (e) => {
    setInputData({
      ...inputData,
      rasm: URL.createObjectURL(e.target.files[0]),
    });
  };

  // malumot tahrirlash
  let tahrir = (elem, index) => {
    setQiymat(index);
    setInputData({
      nomi: elem.nomi,
      malumot: elem.malumot,
      rasm: elem.rasm,
      count: 1,
    });
  };

  // malumot ochirish
  let ochir = (item) => {
    localStorage.setItem(
      "data",
      JSON.stringify(localData.filter((val) => val.id !== item.id))
    );
    fetchData();
  };

  // plus tugma
  function plus(ind) {
    localStorage.setItem(
      "data",
      JSON.stringify(
        localData.map((item) => {
          return item.id == ind.id ? { ...item, count: item.count + 1 } : item;
        })
      )
    );
    fetchData();
  }

  // minus tugma
  function minus(ind) {
    localStorage.setItem(
      "data",
      JSON.stringify(
        localData.map((item) => {
          return item.id == ind.id
            ? { ...item, count: item.count > 1 ? item.count - 1 : item.count }
            : item;
        })
      )
    );
    fetchData();
  }

  // malumot send()
  let dataSend = (e) => {
    e.preventDefault();
    if (qiymat === "") {
      if (localStorage.getItem("data")) {
        localStorage.setItem(
          "data",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("data")),
            { ...inputData, id: new Date().getTime() },
          ])
        );
        fetchData();
      } else {
        localStorage.setItem(
          "data",
          JSON.stringify([{ ...inputData, id: new Date().getTime() }])
        );
        fetchData();
      }
      setInputData({
        nomi: "",
        malumot: "",
        rasm: "",
        count: 1,
      });
    } else {
      console.log("tahrirlandi");
      setQiymat("");
      localStorage.setItem(
        "data",
        JSON.stringify([
          ...localData.slice(0, qiymat),
          { ...inputData, id: new Date().getTime() },
          ...localData.slice(qiymat + 1, localData.length),
        ])
      );
      fetchData();
      setInputData({
        nomi: "",
        malumot: "",
        rasm: "",
        count: 1,
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
          name="nomi"
          value={inputData.nomi}
          onInput={changeFunc}
        />
        <input
          type="text"
          name="malumot"
          value={inputData.malumot}
          onInput={changeFunc}
        />
        <input type="file" onInput={rasmChangeFunc} />
        <button> jonat </button>
      </form>

      <table border={1} style={{ width: "500px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>№</th>
            <th>nomi</th>
            <th>malumot</th>
            <th>rasm</th>
            <th>soni</th>
            <th colSpan={2}>action</th>
          </tr>
        </thead>
        <tbody>
          {localData.length > 0 ? (
            localData.map((item, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{item.nomi}</td>
                <td>{item.malumot}</td>
                <td>
                  <img
                    style={{ width: "200px" }}
                    src={item.rasm}
                    alt={item.nomi}
                  />
                </td>
                <td>
                  <button onClick={() => plus(item)}>plus</button>
                  {item.count}
                  <button onClick={() => minus(item)}>plus</button>
                </td>
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
