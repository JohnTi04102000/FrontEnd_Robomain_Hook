import React, { useState, useEffect } from "react";
import {
  Space,
  Table,
  Tag,
  Drawer,
  Row,
  Col,
  Form,
  Button,
  Popconfirm,
} from "antd";
import { getTaskById, deleteTask } from "../../../services/TaskService";
import ModalCreateTask from "./ModalCreateTask";
import { toast } from "react-toastify";

const ModalTask = (props) => {
  const [openModal, setIsOpenModal] = useState(false);
  const [infoTask, setInfoTask] = useState([]);
  let data = props.currentWO;

  useEffect(() => {
    setInfoTask([]);
    if (data) {
      getAllTaskByID(data.id);
    }
  }, [props.currentWO]);

  const open = () => {
    setIsOpenModal(true);
  };

  const close = () => {
    setIsOpenModal(false);
  };

  const resetTask = () => {
    getAllTaskByID(data.id);
  };

  const formatDateToInputValue = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day} -${month} - ${year}`;
  };

  const handleDeleteTask = async (id) => {
    try {
      if (!id) {
        toast.error("Id Task not found!");
      } else {
        await deleteTask(id);
        resetTask();
        toast.success("Delete task successfully");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getAllTaskByID = async (id_WO) => {
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Delete task"
            description="Are you sure to delete this task?"
            onConfirm={() => {
              handleDeleteTask(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className="btn-deleteTask">
            <i class="fa-solid fa-delete-left"></i>
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Drawer
        title="Information task"
        width={1024}
        onClose={props.closeModalTask}
        open={props.isOpenModalCreateTask}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button type="primary" onClick={() => open()}>
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
                <Button type="dashed">{props.currentWO.id}</Button>
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
      <ModalCreateTask
        openModal={openModal}
        closeModal={close}
        reset={resetTask}
      />
    </>
  );
};

export default ModalTask;
