import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  InputNumber,
  Row,
  Select,
  Space,
  DatePicker,
  Input,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getAllFacilities } from "../../../services/FacilityService";
import dayjs from "dayjs";
import moment from "moment";

const ModalUpdateAsset = (props) => {
  const [form] = Form.useForm();
  const [id, setIdAsset] = useState("");
  const [id_facitites, setIdFacility] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type_asset, setTypeAsset] = useState("");
  const [manufacturerDate, setDateImport] = useState("");
  const [image, setImage] = useState(null);
  const [facility_Option, setFacilityOption] = useState([]);
  const fileInputRef = useRef(null);
  let infoAsset = props.currentAsset;

  useEffect(() => {
    const fetchData = async () => {
      const getAssetOption = await getAllFacilities();
      setFacilityOption(getAssetOption.data);
    };

    fetchData();
    if (infoAsset) {
      onFill();
      console.log("pro: " + JSON.stringify(infoAsset));
    }
  }, [props.currentAsset]);

  const onFill = () => {
    form.setFieldsValue({
      id: infoAsset.id,
      facility: infoAsset.id_facitites,
      price: infoAsset.price,
      quantity: infoAsset.quantity,
      type: infoAsset.type_asset,
      importDate: dayjs(infoAsset.manufacturerDate, "YYYY-MM-DD"),
      image_asset: infoAsset.image,
    });

    setIdAsset(infoAsset.id);
    setIdFacility(infoAsset.id_facitites);
    setPrice(infoAsset.price);
    setQuantity(infoAsset.quantity);
    setTypeAsset(infoAsset.type_asset);
    setDateImport(moment(infoAsset.manufacturerDate).format("YYYY-MM-DD"));
    setImage(infoAsset.image);
  };

  const handleChangeFacility = (value) => {
    console.log(`selected ${value}`);
    setIdFacility(value);
  };

  const onChangePrice = (value) => {
    console.log("price", value);
    setPrice(value);
  };

  const onChangeQuantity = (value) => {
    console.log("quantity", value);
    setQuantity(value);
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

  const onChangeDateImport = (date, dateString) => {
    console.log(date, dateString);
    setDateImport(dateString);
  };

  const updateWorkOrder = () => {
    try {
      const file = fileInputRef.current.files[0];
      console.log(fileInputRef.current.files[0]);
      props.uploadFile(file);
      let data = {
        id,
        id_facitites,
        price,
        quantity,
        type_asset,
        manufacturerDate,
        image,
      };
      console.log(data);
      props.handleUpdateAsset(data);
      form.resetFields();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Drawer
        title="Update this asset"
        width={720}
        open={props.isOpenUpdate}
        onClose={props.isCloseUpdate}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button
              onClick={() => {
                updateWorkOrder();
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
                label="ID asset"
                rules={[
                  {
                    required: true,
                    message: "Select id",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
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

export default ModalUpdateAsset;
