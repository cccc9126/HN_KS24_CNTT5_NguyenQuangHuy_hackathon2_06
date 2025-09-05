import React, { useState } from "react";
import { Pagination, Button ,Modal} from "antd";

interface Bill {
  id: number;
  name: string;
  money: number;
  status: string;
}

interface ListBillsProps {
  list: Bill[];
  deleteBill: (id: number) => void;
}

function ListBills({ list, deleteBill }: ListBillsProps) {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = list.slice(startIndex, startIndex + pageSize);
 
  const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState("");

    const showModal = () => {
      setOpen(true);
    };

  

    const handleCancel = () => {
      console.log("Clicked cancel button");
      setOpen(false);
    };

  return (
    <div
      style={{
        width: "95%",
        height: "60%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: "10px",
        gap: "20px",
        fontSize: "20px",
        padding: "35px",
      }}
    >
      <table
        style={{
          border: "1px solid black",
         
          width: "100%",
          borderRadius: "10px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "10px" }}>
              Tên chủ hộ
            </th>
            <th style={{ border: "1px solid black", padding: "10px" }}>
              Số tiền - VNĐ
            </th>
            <th style={{ border: "1px solid black", padding: "10px" }}>
              Trạng thái
            </th>
            <th style={{ border: "1px solid black", padding: "10px" }}>
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((bill) => (
              <tr key={bill.id}>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {bill.name}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {bill.money.toLocaleString()} VNĐ
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {bill.status}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  <Button
                    style={{ marginLeft: "30px" }}
                    danger
                    
                    onClick={showModal}
                  >
                    Xóa
                  </Button>
                  <Modal
                    title="Bạn có muốn xóa hóa đơn này không?"
                    open={open}
                    onOk={() => {
                      setModalText("Đang xoá...");
                      setConfirmLoading(true);
                      setTimeout(() => {
                        setOpen(false);
                        setConfirmLoading(false);
                        deleteBill(bill.id);
                      }, 2000);
                    }}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                  >
                    <p>{modalText}</p>
                  </Modal>
                  <Button
                    style={{
                      border: "1px solid blue",
                      marginLeft: "30px",
                      color: "blue",
                    }}
                  >
                    Sửa
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                style={{ textAlign: "center", padding: "20px", color: "gray" }}
              >
                Chưa có hóa đơn nào
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={list.length}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default ListBills;