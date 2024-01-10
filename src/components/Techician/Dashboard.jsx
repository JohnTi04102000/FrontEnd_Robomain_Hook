import React, { useEffect, useState } from "react";
import Home_Header from "./HomePage/Home_Header";
import "./Dashboard.scss";
import { Button } from "antd";
import { getWorkOrderById } from "../../services/WorkOrderService";
import ModalViewWorkOrder from './WorkOrder/ModalViewWorkOrder'

const Dashboard = () => {
  const [listWO, setListWO] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentWO, setCurrentWO] = useState([]);

  useEffect(() => {
    getAllWorkOrders();
  }, []);

  const handleOpenModal = (wo) => {
    setCurrentWO(wo);
    setIsOpenModal(true);
  };


  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const getAllWorkOrders = async () => {
    try {
      let id_User = localStorage.getItem("id");
      let response = await getWorkOrderById(id_User);
      let data = response.data;
      if (response && data) {
        data.map((item) => {
          item.completeDate = formatDateToInputValue(item.completeDate);
          item.startDate = formatDateToInputValue(item.startDate);
          return item;
        });
      }
      setListWO(data);
    } catch (e) {
      console.log(e);
    }
  };

  const formatDateToInputValue = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Home_Header />
      <div className="tech-container">
        <div className="tech-header">
          <i class="fa-solid fa-clipboard-list"></i>
          <h4>List work order</h4>
        </div>
        <div className="tech-content">
          {listWO && listWO.length > 0
            ? listWO.map((item) => (
                <>
                  <div className="content-card">
                    <div className="card-top">
                      <p>
                        Id work order:{" "}
                        <span className="card-detail">{item.id}</span>
                      </p>
                      <p>
                        Id asset:{" "}
                        <span className="card-detail">{item.id_Asset}</span>
                      </p>
                      <p>
                        Priority:{" "}
                        <span className="card-detail">{item.priority}</span>
                      </p>
                      <p>
                        Status:{" "}
                        <span className="card-detail">{item.status_WO}</span>
                      </p>
                    </div>
                    <div className="card-bottom">
                      <p>
                        Start day:{" "}
                        <span className="card-detail">{item.startDate}</span>
                      </p>
                      <p>
                        Complete day:{" "}
                        <span className="card-detail">{item.completeDate}</span>
                      </p>
                      <p>
                        Note:{" "}
                        <span className="card-detail">
                          {item.note}
                        </span>
                      </p>
                      <Button danger onClick={() =>handleOpenModal(item)}>Detail</Button>
                    </div>
                  </div>
                </>
              ))
            : null}
        </div>
      </div>
      <ModalViewWorkOrder
      openModal={isOpenModal}
      closeModal={handleCloseModal}
      currentWO={currentWO}
      />
    </>
  );
};

export default Dashboard;
