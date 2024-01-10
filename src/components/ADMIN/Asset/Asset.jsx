import React, { useState, useEffect } from "react";
import { getAllAssets, createNewAssets, deleteAsset, updateAssets } from "../../../services/AssetService";
import { uploadFile } from "../../../services/FileService";
import { Space, Table, Popconfirm } from "antd";
import { toast } from "react-toastify";
import ModalAddAsset from "./ModalAddAsset";
import ModalViewAsset from './ModalViewAsset'
import ModalUpdateAsset from "./ModalUpdateAsset";

const Asset = () => {
  const [listAsset, setListAsset] = useState([]);
  const [infoAsset, setInfoAsset] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [updateAsset, setUpdateAsset] = useState(null);

  useEffect(() => {
    getAssets();
  }, []);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenInfo = (info) => {
    console.log('info', info);
    setInfoAsset(info);
    setIsOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setIsOpenInfo(false);
  };

  const handleOpenUpdate = (info) => {
    console.log('info', info);
    setUpdateAsset(info);
    setIsOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setIsOpenUpdate(false);
  };

  const getAssets = async () => {
    let response = await getAllAssets();
    if (response) {
      setListAsset(response.data);
    }
  };

  const handleCreateAsset = async (data) => {
    try {
      let response = await createNewAssets(data);
      if (response) {
        getAssets();
        toast.success("Create new asset successfully!");
        setIsOpenModal(false);
      }
    } catch (e) {
      toast.error(e.response.data.errCode);
      setIsOpenModal(false);
    }
  };

  const handleUploadFile = async (data) => {
    const file = data;
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("image_asset", file);
    await uploadFile(formData);
  };

  const handleDeleteAsset = async (id) =>
  {
    try {
      if (!id) {
        toast.error("Id asset not found!");
      } else {
        let result = await deleteAsset(id);
        if(result) {
          getAssets();
          toast.success("Asset deleted successfully!");
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleUpdateAsset = async (data) => {
    try {
      if (!data) {
        console.log("Data is empty!");
      } else {
        await updateAssets(data);
        await getAssets();
        handleCloseUpdate();
        toast.success("Update asset successfully!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Type",
      dataIndex: "type_asset",
      key: "type_asset",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="btn-infoo"
            onClick={() => {
              handleOpenInfo(record);
            }}
          >
            <i class="fa-solid fa-info"></i>
          </button>
          <button
            className="btn-edit"
            onClick={() => {
              handleOpenUpdate(record);
            }}
          >
            <i class="fa-solid fa-pencil"></i>
          </button>
          <Popconfirm
            title="Delete the this asset"
            description="Are you sure to delete this asset?"
            deleteAsset
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleDeleteAsset(record.id);
            }}
          >
            <button className="btn-delete">
              <i class="fa-solid fa-trash"></i>
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <h3>Manage Assets</h3>
      <div className="button-header">
        <button
          className="btn btn-primary "
          onClick={() => {
            handleOpenModal();
          }}
        >
          <i class="fa-solid fa-plus"></i> Add new asset
        </button>
      </div>
      <div className="table-WO">
        <Table columns={columns} dataSource={listAsset} />
      </div>
      <ModalAddAsset
        isOpenDrawer={isOpenModal}
        isCloseDrawer={handleCloseModal}
        handleCreateAsset={handleCreateAsset}
        uploadFile={handleUploadFile}
      />
      <ModalViewAsset
      openInfo={isOpenInfo}
      closeInfo={handleCloseInfo}
      currentAsset={infoAsset}
      />
      <ModalUpdateAsset
      isOpenUpdate={isOpenUpdate}
      isCloseUpdate={handleCloseUpdate}
      currentAsset={updateAsset}
      handleUpdateAsset={handleUpdateAsset}
      uploadFile={handleUploadFile}
      />
    </>
  );
};

export default Asset;
