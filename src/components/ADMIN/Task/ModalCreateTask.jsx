import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAllWorkOrders } from "../../../services/WorkOrderService";
import { createTask } from "../../../services/TaskService";
import { Col, DatePicker, Form, Row, Select, Modal, Button, Input } from "antd";

const { TextArea } = Input;
const Task = (props) => {
  const [id_WO, setWO] = useState("");
  const [description_Task, setDescriptionWO] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setCompleteDate] = useState("");
  const [note, setNote] = useState("");
  const [status_Task, setStatus] = useState("");
  const [idList, setList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    (async function () {
      try {
        onFill();
        const response = await getAllWorkOrders();
        if (response) {
          setList(response.data);
          console.log("list id: " + response.data);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const onFill = () => {
    form.setFieldsValue({
        status_Task: "Process",
        note: "Không có"
    })
    setNote("Không có");
    setStatus("Process");
  }

  const handleSubmit = async () => {
    let data = {id_WO, description_Task, startDate, endDate, note, status_Task}
    let result = await createTask(data);
    if(result)
    {
      onReset();
      toast.success("Create new task successfully!");
      props.closeModal();
      props.reset();
      onFill();
    }
  }

  const handleChangeWO = (value) => {
    console.log(`selected ${value}`);
    setWO(value);
  };


  const onChangeDateStart = (date, dateString) => {
    console.log(date, dateString);
    setStartDate(dateString);
  };

  const onChangeDateFinish = (date, dateString) => {
    console.log(date, dateString);
    setCompleteDate(dateString);
  };

  const onChangeDescription = (event) => {
    console.log(event.target.value);
    setDescriptionWO(event.target.value);
  };

  const onReset = () => {
    form.resetFields();
  };


  return (
    <>
      <Modal
        title="Add new task"
        open={props.openModal}
        onOk={props.closeModal}
        onCancel={props.closeModal}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Id work order"
            name="id_WO"
            rules={[
              {
                required: true,
                message: "Please provide id work order!",
              },
            ]}
          >
            <Select
              defaultValue="Select work order"
              style={{
                width: 150,
              }}
              onChange={handleChangeWO}
              options={idList.map((item) => {
                return {
                  value: item.id,
                  label: item.id,
                };
              })}
            />
          </Form.Item>

          <Form.Item
            label="Start date"
            name="startDate"
            rules={[
              {
                required: true,
                message: "Please provide start day!",
              },
            ]}
          >
            <DatePicker onChange={onChangeDateStart} />
          </Form.Item>
          <Form.Item
            label="End date"
            name="endDate"
            rules={[
              {
                required: true,
                message: "Please provide end day!",
              },
            ]}
          >
            <DatePicker onChange={onChangeDateFinish} />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description_Task"
            rules={[
              {
                required: true,
                message: "Please provide description!",
              },
            ]}
          >
            <TextArea onChange={(event) =>{onChangeDescription(event)}}/>
          </Form.Item>
          <Form.Item label="Note" name="note">
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status_Task"
            rules={[
              {
                required: true,
                message: "Please provide status",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Task;
