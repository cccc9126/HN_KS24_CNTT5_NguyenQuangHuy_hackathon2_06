import "antd/dist/reset.css";
import React from "react";

import Header from "./component/Header";
import AddBill from "./component/AddBill";
import ListBills from "./component/ListBills";
import { List } from "antd";
interface List {
  id: number;
  name: string;
  money: number;
  status: string;
}
function App() {
  // Khởi tạo state từ localStorage
  const [bills, setBills] = React.useState<List[]>(() => {
    const stored = localStorage.getItem("bills");
    return stored ? JSON.parse(stored) : [];
  });
  function addBill(bill: List) {
    const newBills = [...bills, bill];
    setBills(newBills);
    localStorage.setItem("bills", JSON.stringify(newBills));
  }
  function deleteBill(id: number) {
    const updatedBills = bills.filter((bill) => bill.id !== id);
    setBills(updatedBills);
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#ebebeb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <Header></Header>
      <AddBill list={bills} addBill={addBill} />
      <ListBills list={bills} deleteBill={deleteBill}></ListBills>
    </div>
  );
}

export default App;
