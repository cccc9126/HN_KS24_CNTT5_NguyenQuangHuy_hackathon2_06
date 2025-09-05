import React, { useState } from "react";
import { Input, Select, Button,Modal } from "antd";

interface Bill {
  id: number;
  name: string;
  money: number;
  status: string;
}

interface AddBillProps {
  list: Bill[];
  addBill: (bill: Bill) => void;
}

function AddBill({ list, addBill }: AddBillProps) {
  const [name, setName] = useState("");
  const [money, setMoney] = useState<number | string>("");
  const [status, setStatus] = useState("");
  const [notice1, setNotice1] = useState(false);
  const [notice2, setNotice2] = useState(false);
  const [notice3, setNotice3] = useState(false);
  const [notice4, setNotice4] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setNotice1(true);
      return;
    }
    if (!money) {
      setNotice4(false)
      setNotice2(true);
      return;
    }
    if (Number(money) < 0) {
      setNotice2(false)
      setNotice4(true);
      return
    }
    if (!status) {
      setNotice3(true);

      return;
    }

    const newBill: Bill = {
      id: list.length + 1,
      name,
      money: Number(money),
      status,
    };
    addBill(newBill);

    setName("");
    setMoney("");
    setStatus("");
    setNotice1(false);
    setNotice2(false);
    setNotice3(false);
  
  };

  return (
    <div
      style={{
        width: "95%",
        height: "20%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: "10px",
        gap: "20px",
        fontSize: "20px",
        padding: "35px",
      }}
    >
      <h2>🧾 Thêm hóa đơn mới</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "row",
          width: "80%",
          gap: "30px",
        }}
        onSubmit={handleSubmit}
      >
        <div className="item w-90">
          {notice1 ? (
            <Input
              style={{ border: "1px solid red" }}
              placeholder="Tên chủ hộ"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <Input
              placeholder="Tên chủ hộ"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {notice1 && (
            <p className="text-[16px] text-red-500 pt-2">
              Vui lòng nhập tên chủ hộ!
            </p>
          )}
        </div>
        <div className="item w-90">
          {notice2 ? (
            <Input
              style={{ border: "1px solid red" }}
              type="number"
              placeholder="Số tiền"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
            />
          ) : (
            <Input
              type="number"
              placeholder="Số tiền"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
            />
          )}
          {notice2 && (
            <p className="text-[16px] text-red-500 pt-2">
              Vui lòng nhập số tiền
            </p>
          )}
          {notice4 && (
            <p className="text-[16px] text-red-500 pt-2">
              Số tiền không hợp lệ
            </p>
          )}
        </div>
        <div className="div">
          {notice3 ? (
            <Select
              style={{ border: "1px solid red", borderRadius: "7px" }}
              className="w-50"
              showSearch
              placeholder="Lựa chọn trạng thái"
              value={status || undefined}
              onChange={(value) => setStatus(value)}
              options={[
                { value: "Chưa thanh toán", label: "Chưa thanh toán" },
                { value: "Đã thanh toán", label: "Đã thanh toán" },
              ]}
            />
          ) : (
            <Select
              className="w-50"
              showSearch
              placeholder="Lựa chọn trạng thái"
              value={status || undefined}
              onChange={(value) => setStatus(value)}
              options={[
                { value: "Chưa thanh toán", label: "Chưa thanh toán" },
                { value: "Đã thanh toán", label: "Đã thanh toán" },
              ]}
            />
          )}
          {notice3 && (
            <p className="text-[16px] text-red-500 pt-2">
              Vui lòng chọn trạng thái
            </p>
          )}
        </div>

        <Button type="primary" htmlType="submit" className="w-30">
          Thêm
        </Button>
      </form>
    </div>
  );
}

export default AddBill;
