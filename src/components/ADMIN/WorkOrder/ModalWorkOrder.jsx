import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  DatePicker,
} from "antd";
import { getAllUsers } from "../../../services/UserService";
import { getAllAssets } from "../../../services/WorkOrderService";
import { toast } from "react-toastify";

const ModalWorkOrder = (props) => {
  const [id_Asset, setIdAsset] = useState("");
  const [priority, setPriority] = useState("");
  const [type_WO, setTypeWO] = useState("");
  const [status_WO, setStatusWO] = useState("");
  const [startDate, setStartDate] = useState("");
  const [completeDate, setCompleteDate] = useState("");
  const [description_WO, setDescriptionWO] = useState("");
  const [note, setNote] = useState("");
  const [assign, setAssign] = useState("");
  const [user_Option, setUserOption] = useState([]);
  const [asset_Option, setAssetOption] = useState([]);
  const { TextArea } = Input;
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      const getUserOption = await getAllUsers();
      setUserOption(getUserOption.data);

      const getAssetOption = await getAllAssets();
      setAssetOption(getAssetOption.data);
    };

    fetchData();
  }, []);

  const createNewWorkOrder = () => {
    try {
      let data = {
        id_Asset,
        priority,
        type_WO,
        status_WO,
        startDate,
        completeDate,
        description_WO,
        note,
        assign,
      };
      console.log(data);
      props.handleCreateWO(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeAsset = (value) => {
    console.log(`selected ${value}`);
    setIdAsset(value);
  };

  const handleChangeUser = (value) => {
    console.log(`selected ${value}`);
    setAssign(value);
  };

  const handleChangeType = (value) => {
    console.log(`selected ${value}`);
    setTypeWO(value);
  };

  const handleChangePriority = (value) => {
    console.log(`selected ${value}`);
    setPriority(value);
  };

  const handleChangeStatus = (value) => {
    console.log(`selected ${value}`);
    setStatusWO(value);
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

  const onChangeNote = (event) => {
    console.log(event.target.value);
    setNote(event.target.value);
  };

  return (
    <>
      <Drawer
        title="Create a new work order"
        width={720}
        onClose={props.isCloseDrawer}
        open={props.isOpenDrawer}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button
              onClick={() => {
                createNewWorkOrder();
              }}
              type="primary"
            >
              Create
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={16}>
            <Col span={24}>
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
                <Select
                  defaultValue="Select asset"
                  style={{
                    width: 300,
                  }}
                  allowClear
                  onChange={handleChangeAsset}
                  options={asset_Option.map((item) => ({
                    value: item.id,
                    label: item.type_asset,
                  }))}
                />
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
                <Select
                  defaultValue="Select type"
                  style={{
                    width: 300,
                  }}
                  onChange={handleChangeType}
                  options={[
                    {
                      value: "Preventive",
                      label: "Preventive",
                    },
                    {
                      value: "Damage",
                      label: "Damage",
                    },
                    {
                      value: "Corrective",
                      label: "Corrective",
                    },
                    {
                      value: "Safely",
                      label: "Safely",
                    },
                    {
                      value: "Upgrade",
                      label: "Upgrade",
                    },
                    {
                      value: "Electrical",
                      label: "Electrical",
                    },
                    {
                      value: "Project",
                      label: "Project",
                    },
                    {
                      value: "Inspection",
                      label: "Inspection",
                    },
                    {
                      value: "Meter reading",
                      label: "Meter reading",
                    },
                    {
                      value: "Other",
                      label: "Other",
                    },
                  ]}
                />
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
                <Select
                  defaultValue="Select priority"
                  style={{
                    width: 300,
                  }}
                  onChange={handleChangePriority}
                  options={[
                    {
                      value: "Hightest",
                      label: "Hightest",
                    },
                    {
                      value: "High",
                      label: "High",
                    },
                    {
                      value: "Medium",
                      label: "Medium",
                    },
                    {
                      value: "Low",
                      label: "Low",
                    },
                    {
                      value: "Lowest",
                      label: "Lowest",
                    },
                  ]}
                />
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
                <Select
                  defaultValue="Select user"
                  style={{
                    width: 300,
                  }}
                  allowClear
                  onChange={handleChangeUser}
                  options={user_Option.map((item) => ({
                    value: item.id,
                    label: item.name_User,
                  }))}
                />
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
                <Select
                  defaultValue="Select status"
                  style={{
                    width: 300,
                  }}
                  onChange={handleChangeStatus}
                  options={[
                    {
                      value: "Requested",
                      label: "Requested",
                    },
                    {
                      value: "On hold",
                      label: "On hold",
                    },
                    {
                      value: "Draft",
                      label: "Draft",
                    },
                    {
                      value: "Assigned",
                      label: "Assigned",
                    },
                    {
                      value: "Open",
                      label: "Open",
                    },
                    {
                      value: "Work in process",
                      label: "Work in process",
                    },
                    {
                      value: "Close, completed",
                      label: "Close, completed",
                    },
                    {
                      value: "Close, incomplete",
                      label: "Close, incomplete",
                    },
                  ]}
                />
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
                <DatePicker onChange={onChangeDateStart} />
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
                <DatePicker onChange={onChangeDateFinish} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                onChange={(event) => {
                  onChangeDescription(event);
                }}
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
                onChange={(event) => {
                  onChangeNote(event);
                }}
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
      </Drawer>
    </>
  );
};

export default ModalWorkOrder;
