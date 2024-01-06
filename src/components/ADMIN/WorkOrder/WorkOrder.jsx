import React, { useState, useEffect } from "react";
import ModalWorkOrder from "./ModalWorkOrder";
import ModalTask from "../Task/ModalTask";
import ModalViewWorkOrder from "./Modal_ViewWorkOrder";
import ModalUpdateWorkOrder from "./ModalUpdateWorkOrder";
import {
  getAllWorkOrders,
  createNewWOService,
  updateWorkOrder,
  deleteWorkOrder,
} from "../../../services/WorkOrderService";
import { getTaskById } from "../../../services/TaskService";
import { createTask, deleteTask } from "../../../services/TaskService";
import PrivatePage from "../../../HOC/PrivatePage";
import { toast } from "react-toastify";
import "./WorkOrder.scss";
import { Popconfirm } from "antd";
import { Space, Table, Tag, Drawer, Row, Col, Form, Button } from "antd";

const WorkOrder = () => {
  const [infoWorkOrder, setInfoWorkOrder] = useState([]);
  const [infoTask, setInfoTask] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenTask, setIsOpenTask] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [currentWO, setCurrentWO] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [listSearch, setListSearch] = useState([]);
  const [open, setOpen] = useState(false);
  const [idTask, setIdTask] = useState("");

  useEffect(() => {
    getWorkOrders();
  }, []);

  const infoWO = (WO) => {
    setIsOpenTask(true);
    setCurrentWO(WO);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleOpenTask = () => {
    setIsOpenTask(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenModalUpdate = () => {
    setIsOpenModalUpdate(true);
  };

  const handleCloseModalUpdate = () => {
    setIsOpenModalUpdate(false);
  };

  const handleCloseTask = () => {
    setIsOpenTask(false);
  };

  const getWorkOrders = async () => {
    let response = await getAllWorkOrders();
    if (response) {
      setInfoWorkOrder(response.data);
    }
  };

  const getCurrentWO = (WO) => {
    setCurrentWO(WO);
    handleOpenModalUpdate();
  }

  const getAllTaskByID = async (id_WO) => {
    setIdTask(id_WO);
    try {
      let response = await getTaskById(id_WO);
      let data = response.data;
      if (response && data) {
        data.map((item) => {
          item.startDate = formatDateToInputValue(item.startDate);
          item.endDate = formatDateToInputValue(item.endDate);
          return item;
        });
        if (response) {
          setInfoTask(data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateWO = async (data) => {
    try {
      let response = await createNewWOService(data);
      if (response && response.message !== "Success") {
        alert("Insert data failed!");
      } else {
        await getAllWorkOrders();
        toast.success("Create work order successfully!");
        setIsOpenModal(false);
      }
    } catch (e) {
      toast.error(e.response.data.errCode);
      setIsOpenModal(false);
    }
  };

  const handleCreateTask = async (data) => {
    try {
      let response = await createTask(data);
      if (response && response.message !== "Create task successfully") {
        toast.error("Insert data failed!");
      } else {
        toast.success("Create task successfully!");
        setIsOpenModalCreate(false);
        let id_task = idTask;
        getAllTaskByID(id_task);
      }
    } catch (e) {
      toast.error(e.response.data.errCode);
    }
  };

  const handleEditWO = async (data) => {
    try {
      if (!data) {
        console.log("Data is empty!");
      } else {
        await updateWorkOrder(data);
        await getAllWorkOrders();
        handleCloseModalUpdate();
        toast.success("Update work order successfully!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteWO = async (id) => {
    try {
      if (!id) {
        toast.error("Id WorkOrder not found!");
      } else {
        let result = await deleteWorkOrder(id);
        if(result) {
          getWorkOrders();
          toast.success("WorkOrder deleted successfully!");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };


  const formatDateToInputValue = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day} -${month} - ${year}`;
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Asset",
      dataIndex: "id_Asset",
      key: "asset",
    },
    {
      title: "Status",
      dataIndex: "status_WO",
      key: "status",
    },
    {
      title: "Type",
      dataIndex: "type_WO",
      key: "type",
    },
    {
      title: "Assign",
      dataIndex: "assign",
      key: "assign",
      filters: [
        {
          text: "Nguyễn Hữu Trí",
          value: "user1",
        },
        {
          text: "Phạm Thị Ngọc Ánh",
          value: "user2",
        },
        {
          text: "Vũ Minh Nghĩa",
          value: "user3",
        },
        {
          text: "Trịnh Lê Khánh Tâm",
          value: "user4",
        },
        {
          text: "Minh Tân",
          value: "user5",
        },
      ],
      onFilter: (value, record) => record.assign.indexOf(value) === 0,
    },
    {
      render: (_, { tags }) => (
        <>
          {tags &&
            tags.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="btn-infoo"
            onClick={() => {
              infoWO(record);
            }}
          >
            <i class="fa-solid fa-info"></i>
          </button>
          <button
            className="btn-edit"
            onClick={() => {
              getCurrentWO(record);
            }}
          >
            <i class="fa-solid fa-pencil"></i>
          </button>
          <Popconfirm
            title="Delete the work order"
            description="Are you sure to delete this work order?"
            onConfirm={() => {
              handleDeleteWO(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className="btn-delete">
              <i class="fa-solid fa-trash"></i>
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const columnTasks = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Description",
      dataIndex: "description_Task",
      key: "description",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Status task",
      dataIndex: "status_Task",
      key: "status_Task",
    },
    {
      render: (_, { tags }) => (
        <>
          {tags &&
            tags.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Delete task"
            description="Are you sure to delete this task?"
            onConfirm={() => {
              this.handleDeleteTask(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className="btn-deleteTask">
              <i class="fa-solid fa-trash-can-slash"></i>
            </button>
          </Popconfirm>
          {/* <button className="btn-infoo" onClick={() => {
                this.infoWO(record);
              }}>
            <i
              class="fa-solid fa-info"              
            ></i>
          </button>
          <button className="btn-edit" onClick={() => {
                this.currentWO(record);
              }}>
            <i
              class="fa-solid fa-pencil"             
            ></i>
          </button>
          <Popconfirm
            title="Delete the work order"
            description="Are you sure to delete this work order?"
            onConfirm={() => {
              this.handleDeleteWO(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className="btn-delete">
              <i class="fa-solid fa-trash"></i>
            </button>
          </Popconfirm> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <h3>Manage Work Order</h3>
      <ModalWorkOrder
        isOpenDrawer={isOpenModal}
        isCloseDrawer={handleCloseModal}
        handleCreateWO={handleCreateWO}
      />
      <ModalTask
        isOpenModalCreateTask={isOpenTask}
        closeModalTask={handleCloseTask}
        handleCreateTask={handleCreateTask}
        currentWO={currentWO}
      />

      <ModalUpdateWorkOrder
      isOpenUpdate={isOpenModalUpdate}
      isCloseUpdate={handleCloseModalUpdate}
      currentWO={currentWO}
      updateWO={handleEditWO}
      />
      <ModalViewWorkOrder
        isOpenModalEdit={isOpenModalEdit}
        handleModalEdit={() => setIsOpenModalEdit(!isOpenModalEdit)}
        //handleEditWO={handleEditWO}
        //currentWO={currentWO}
      />
      <div className="button-header">
        <button
          className="btn btn-primary "
          onClick={() => {
            handleOpenModal();
          }}
        >
          <i class="fa-solid fa-plus"></i> Add new work orders
        </button>
      </div>
      <div className="table-WO">
        <Table columns={columns} dataSource={infoWorkOrder} />
      </div>
      <Drawer
        title="Information work order"
        width={720}
        onClose={() => setOpen(false)}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setIsOpenModalCreate(true)}>
              Create new task
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Work Order id"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Button type="dashed">{currentWO.id}</Button>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Table columns={columnTasks} dataSource={infoTask} />
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default PrivatePage(WorkOrder);
