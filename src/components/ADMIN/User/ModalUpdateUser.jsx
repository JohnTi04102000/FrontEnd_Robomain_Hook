import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Row,
  Select,
  Space,
  DatePicker,
  Input,
} from "antd";
import { getUserByID } from "../../../services/UserService";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import dayjs from "dayjs";

const ModalUpdateUser = (props) => {
  const [form] = Form.useForm();
  const fileInputRef = useRef(null);
  const [user, setInfoUser] = useState([]);
  const [id, setIdUser] = useState("");
  const [name_User, setName] = useState("");
  const [birth, setBirthDay] = useState("");
  const [role_User, setRole] = useState("");
  const [sex, setGender] = useState("");
  const [image, setImage] = useState(null);
  let infoUser = props.currentUser;

  useEffect(() => {
    if (infoUser && infoUser.id) {
      getInfoUser(infoUser.id);
    }
  }, [props.currentUser]);

  const getInfoUser = async (id) => {
    try {
      let result = await getUserByID(id);
      if (result) {
        console.log(result);
        setInfoUser(result.data);
        onFill(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onFill = (info) => {
    form.setFieldsValue({
      id: info[0].id,
      name: info[0].name_User,
      birth: dayjs(info[0].birth, "YYYY/MM/DD"),
      role: info[0].role_User,
      gender: info[0].sex,
      image: info[0].image,
    });

    setIdUser(info[0].id);
    setName(info[0].name_User);
    setBirthDay(moment(info[0].birth).format("YYYY-MM-DD"));
    setRole(info[0].role_User);
    setGender(info[0].sex);
    setImage(info[0].image);
  };

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

  const UpdateUser = () => {
    try {
      const file = fileInputRef.current.files[0];
      console.log(fileInputRef.current.files[0]);
      props.uploadFile(file);
      let data = {
        name_User,
        birth,
        role_User,
        sex,
        image,
        id,
      };
      console.log(data);
      props.updateUser(data);
      form.resetFields();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Drawer
        title="Update user"
        width={720}
        onClose={props.isCloseUpdate}
        open={props.isOpenUpdate}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button
              onClick={() => {
                UpdateUser();
              }}
              type="primary"
            >
              Update
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="id"
                label="ID user"
                rules={[
                  {
                    required: true,
                    message: "Fill id user",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
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
                <Input
                  onChange={(event) => {
                    onChangeName(event);
                  }}
                />
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

export default ModalUpdateUser;
