import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../../services/UserService";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { toast } from "react-toastify";

const ModalUpdateAccount = (props) => {
  const [id_User, setIdUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id_User_Option, setIDUserOption] = useState([]);
  const [form] = Form.useForm();
  let data = props.currentAccount;

  useEffect(() => {
    const fetchData = async () => {
      const getUserOption = await getAllUsers();
      setIDUserOption(getUserOption.data);
    };

    fetchData();
    if (data) {
      onFill();
      console.log("pro: " + JSON.stringify(data));
    }
  }, [props.currentAccount]);

  const handleChangeUser = (value) => {
    console.log(`selected ${value}`);
    setIdUser(value);
  };

  const onChangeEmail = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };

  const updateAccount = () => {
    try {
      if (isValidEmail(email)) {
        let data = {
          email,
          password,
          id_User,
        };
        console.log("data: ", data);
        props.handleUpdateAccount(data);
        form.resetFields();
      } else {
        toast.warning("Format email isn't available!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const isValidEmail = (email) => {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Kiểm tra xem email có khớp với định dạng không và trả về kết quả
    return emailRegex.test(email);
  };

  const onFill = () => {
    form.setFieldsValue({
      id_User: data.id_user,
      email: data.email,
      password: data.pass,
    });

    setIdUser(data.id_user);
    setEmail(data.email);
    setPassword(data.pass);
  };

  return (
    <>
      <Drawer
        title="Update information account"
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
                updateAccount();
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
            <Col span={24}>
              <Form.Item
                name="id_User"
                label="ID User"
                rules={[
                  {
                    required: true,
                    message: "Select id user",
                  },
                ]}
              >
                <Select
                  defaultValue="Select id user"
                  style={{
                    width: 300,
                  }}
                  allowClear
                  onChange={handleChangeUser}
                  options={id_User_Option.map((item) => ({
                    value: item.id,
                    label: item.name_User,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Fill email",
                  },
                ]}
              >
                <Input
                  onChange={(event) => {
                    onChangeEmail(event);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Fill password",
                  },
                ]}
              >
                <Input
                  onChange={(event) => {
                    onChangePassword(event);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default ModalUpdateAccount;
