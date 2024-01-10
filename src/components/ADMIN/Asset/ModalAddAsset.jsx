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
import './ModalAddAsset.scss'
import { getAllFacilities } from "../../../services/FacilityService";

const ModalAddAsset = (props) => {
  const [id_Facility, setIdFacility] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type_asset, setTypeAsset] = useState("");
  const [importDate, setDateImport] = useState("");
  const [image, setImage] = useState(null);
  const [facility_Option, setFacilityOption] = useState([]);
  const [form] = Form.useForm();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const getAssetOption = await getAllFacilities();
      setFacilityOption(getAssetOption.data);
    };

    fetchData();
  }, []);

  const handleChangeFacility = (value) => {
    console.log(`selected ${value}`);
    setIdFacility(value);
  };

  const onChangeDateImport = (date, dateString) => {
    console.log(date, dateString);
    setDateImport(dateString);
  };

  const selectImage = (event) => {
    setImage(fileInputRef.current.files[0].name);
    console.log(fileInputRef.current.files[0].name);
    console.log(fileInputRef.current.files[0]);
  };

  const onChangType = (value) => {
    console.log(`selected ${value}`);
    setTypeAsset(value);
  };

  const onChangePrice = (value) => {
    console.log("price", value);
    setPrice(value);
  };

  const onChangeQuantity = (value) => {
    console.log("quantity", value);
    setQuantity(value);
  };
  const createNewAsset = () => {
    try {
      const file = fileInputRef.current.files[0];
      console.log(fileInputRef.current.files[0]);
      props.uploadFile(file);
      let data = {
        id_Facility,
        price,
        quantity,
        type_asset,
        importDate,
        image,
      };
      console.log("data: ", data);
      console.log("file: ", file);
      props.handleCreateAsset(data);
      form.resetFields();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Drawer
        title="Create a new asset"
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
                createNewAsset();
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
                name="facility"
                label="Facility"
                rules={[
                  {
                    required: true,
                    message: "Select facility",
                  },
                ]}
              >
                <Select
                  defaultValue="Select facility"
                  style={{
                    width: 300,
                  }}
                  allowClear
                  onChange={handleChangeFacility}
                  options={facility_Option.map((item) => ({
                    value: item.id,
                    label: item.name_facility,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[
                  {
                    required: true,
                    message: "Select quantity",
                  },
                ]}
              >
                <InputNumber
                  defaultValue={1}
                  formatter={(value) =>
                    ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={onChangeQuantity}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  {
                    required: true,
                    message: "Select price",
                  },
                ]}
              >
                <InputNumber
                  defaultValue={1000}
                  formatter={(value) =>
                    ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={onChangePrice}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type asset"
                rules={[
                  {
                    required: true,
                    message: "Select type",
                  },
                ]}
              >
                <Select
                  defaultValue="Select type asset"
                  style={{
                    width: 120,
                  }}
                  onChange={onChangType}
                  options={[
                    {
                      value: "Equipment",
                      label: "Equipment",
                    },
                    {
                      value: "Fleet ",
                      label: "Fleet ",
                    },
                    {
                      value: "Infrastructure ",
                      label: "Infrastructure ",
                    },
                    {
                      value: "IT Asset",
                      label: "IT Asset",
                    },
                    {
                      value: "Tools ",
                      label: "Tools ",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="importDate"
                label="Import date"
                rules={[
                  {
                    required: true,
                    message: "Select import date",
                  },
                ]}
              >
                <DatePicker onChange={onChangeDateImport} />
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
                      name="image_asset"
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

export default ModalAddAsset;
