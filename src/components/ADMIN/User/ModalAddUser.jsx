import React, { useState, useEffect, useRef } from "react";
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
  InputNumber,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";

const ModalAddUser = (props) => {
  const [form] = Form.useForm();
  const fileInputRef = useRef(null);
  const [name_User, setName] = useState("");
  const [birth, setBirthDay] = useState("");
  const [role_User, setRole] = useState("");
  const [sex, setGender] = useState("");
  const [image, setImage] = useState(null);

  const onChangeDateImport = (date, dateString) => {
    console.log(date, dateString);
    setBirthDay(dateString);
  };

  const onChangRole = (value) => {
    console.log(`selected ${value}`);
    setRole(value);
  };

  const onChangGender = (value) => {
    console.log(`selected ${value}`);
    setGender(value);
  };

  const selectImage = () => {
    setImage(fileInputRef.current.files[0].name);
    console.log(fileInputRef.current.files[0].name);
    console.log(fileInputRef.current.files[0]);
  };

  const onChangeName = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const createNewUser = () => {
    try {
      const file = fileInputRef.current.files[0];
      console.log(fileInputRef.current.files[0]);
      props.uploadFile(file);
      let data = {
        name_User,
        birth,
        role_User,
        image,
        sex,
      };
      console.log("data: ", data);
      console.log("file: ", file);
      props.createNewUser(data);
      form.resetFields();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Drawer
        title="Create a new user"
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
                    createNewUser();
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
                name="name"
                label="Name user"
                rules={[
                  {
                    required: true,
                    message: "Fill name user",
                  },
                ]}
              >
                <Input onChange={(event) =>{onChangeName(event)}}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="birth"
                label="Birth"
                rules={[
                  {
                    required: true,
                    message: "Select birthday",
                  },
                ]}
              >
                <DatePicker onChange={onChangeDateImport} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[
                  {
                    required: true,
                    message: "Select role user",
                  },
                ]}
              >
                <Select
                  defaultValue="Select type asset"
                  style={{
                    width: 120,
                  }}
                  onChange={onChangRole}
                  options={[
                    {
                      value: "Maintenance manager",
                      label: "Maintenance manager",
                    },
                    {
                      value: "Expert ",
                      label: "Expert ",
                    },
                    {
                      value: "Technician ",
                      label: "Technician ",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: "Select gender",
                  },
                ]}
              >
                <Select
                  defaultValue="Select type asset"
                  style={{
                    width: 120,
                  }}
                  onChange={onChangGender}
                  options={[
                    {
                      value: "Male",
                      label: "Male",
                    },
                    {
                      value: "Female ",
                      label: "Female ",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="image"
                label="Image asset"
                rules={[
                  {
                    required: true,
                    message: "Select image",
                  },
                ]}
              >
                <div className="form-upload">
                  <form enctype="multipart/form-data">
                    <UploadOutlined />
                    <input
                      type="file"
                      name="profile_pic"
                      ref={fileInputRef}
                      onChange={(event) => selectImage(event)}
                    />
                  </form>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default ModalAddUser;
