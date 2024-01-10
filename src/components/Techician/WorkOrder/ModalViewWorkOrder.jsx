import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import "./ModalViewWorkOrder.scss";
import {
  Col,
  Form,
  Input,
  Row,
  DatePicker,
  Space,
  Popconfirm,
  Tag,
  Button,
  Table,
} from "antd";
import dayjs from "dayjs";
import { getTaskById, updateTask, addNoteTask } from "../../../services/TaskService";
import { toast } from "react-toastify";

const ModalViewWorkOrder = (props) => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [infoTask, setInfoTask] = useState([]);
  const [noteTask, setNoteTask] = useState("");
  const [idTask, setIDTask] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let data = props.currentWO;

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  useEffect(() => {
    if (data) {
      onFill();
      getAllTaskByID(data.id);
      console.log("pro: " + JSON.stringify(data));
    }
  }, [props.currentWO]);

  const showModal = (id) => {
    setIsModalOpen(true);
    setIDTask(id);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const changeNote = (event) => {
    setNoteTask(event.target.value);
    console.log(event.target.value);
  }

  const handleUpdateTask = async (id) => {
    try {
      console.log('id', id);
      let result = await updateTask(id);
      if (result) {
        toast.success("Update status task successful!");
        getAllTaskByID(data.id);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddNoteTask = async () => {
    try {
      let id = idTask;
      let note = noteTask;
      let info_Note = {id, note}
      let result = await addNoteTask(info_Note);
      if (result) {
        toast.success("Add note for this task successful!");
        getAllTaskByID(data.id);
        handleCancel();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onFill = () => {
    form.setFieldsValue({
      id: data.id,
      asset: data.id_Asset,
      priority: data.priority,
      status: data.status_WO,
      type: data.type_WO,
      startDate: dayjs(data.startDate, "DD-MM-YYYY"),
      endDate: dayjs(data.completeDate, "DD-MM-YYYY"),
      description: data.description_WO,
      note: data.note,
      assign: data.assign,
    });
  };

  const formatDateToInputValue = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
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
            title="Update status task"
            description="Are you sure to confirm this task completed?"
            onConfirm={() => {
              handleUpdateTask(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className="btn-deleteTask">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
          </Popconfirm>
          <Popconfirm
            title="Add note for this task"
            description="Do you want add not fot this task"
            onConfirm={() => {
              showModal(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className="btn-deleteTask">
              <i class="fa-solid fa-pencil"></i>
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Modal
        title="Detail work order"
        width={1440}
        open={props.openModal}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={props.closeModal}
      >
        <div className="modal-container">
          <div className="wo-container">
            <div className="content-card">
              <Form layout="vertical" hideRequiredMark form={form}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="id"
                      label="ID"
                      rules={[
                        {
                          required: true,
                          message: "Select ID",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="asset"
                      label="Asset"
                      rules={[
                        {
                          required: true,
                          message: "Select asset",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="type"
                      label="Type"
                      rules={[
                        {
                          required: true,
                          message: "Select type",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="priority"
                      label="Priority"
                      rules={[
                        {
                          required: true,
                          message: "Select priority",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="assign"
                      label="Assign for user"
                      rules={[
                        {
                          required: true,
                          message: "Select user",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="status"
                      label="Status"
                      rules={[
                        {
                          required: true,
                          message: "Select status",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="startDate"
                      label="Start date"
                      rules={[
                        {
                          required: true,
                          message: "Select start date",
                        },
                      ]}
                    >
                      <DatePicker onChange={onChange} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="endDate"
                      label="Complete date"
                      rules={[
                        {
                          required: true,
                          message: "Select end date",
                        },
                      ]}
                    >
                      <DatePicker onChange={onChange} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="description"
                      label="Description"
                      rules={[
                        {
                          required: true,
                          message: "Fill description",
                        },
                      ]}
                    >
                      <TextArea rows={4} placeholder="Fill description" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="note"
                      label="Note"
                      // onChange={(event) => {
                      //   onChangeNote(event);
                      // }}
                      rules={[
                        {
                          required: true,
                          message: "Fill note",
                        },
                      ]}
                    >
                      <TextArea rows={4} placeholder="Fill note" />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
          <div className="task-container">
            <div className="task-header">
              <i class="fa-solid fa-list-check"></i>
              <h4>LIST TASK IN PROCESS</h4>
            </div>
            <div className="task-content">
              <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="title"
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
              <Modal
                title="Add note for this task"
                open={isModalOpen}
                onOk={handleAddNoteTask}
                onCancel={handleCancel}
              >
                <p>Write your note</p>
                <Input placeholder="Write your note here!" onChange={(event) => changeNote(event)}/>
              </Modal>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalViewWorkOrder;
