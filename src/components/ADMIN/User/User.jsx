import React, { useState, useEffect } from "react";
import {
  getAllUsers,
  createNewUserService,
  deleteUser,
} from "../../../services/UserService";
import { uploadFile } from "../../../services/UserService";
import { toast } from "react-toastify";
import { Space, Table, Popconfirm } from "antd";
import ModalAddUser from "./ModalAddUser";
import ModalViewUser from "./ModalViewUser";
const User = () => {
  const [listUser, setListUser] = useState([]);
  const [infoUser, setInfoUser] = useState(null);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const handleOpenModalInfo = (user) => {
    console.log('s:', user);
    setInfoUser(user);
    setIsOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setIsOpenInfo(false);
  };

  const getUsers = async () => {
    let response = await getAllUsers();
    let data = response.data;
    if (response && data) {
      data.map((item) => {
        item.birth = formatDateToInputValue(item.birth);
        return item;
      });
      if (response) {
        setListUser(data);
      }
    }
  };

  const formatDateToInputValue = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day} -${month} - ${year}`;
  };

  const handleCreateUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response) {
        getUsers();
        toast.success("Create new user successfully!");
        handleCloseDrawer(false);
      }
    } catch (e) {
      toast.error(e.response.data.errCode);
      handleCloseDrawer(false);
    }
  };

  const handleUploadFile = async (data) => {
    const file = data;
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("profile_pic", file);
    await uploadFile(formData);
  };

  const handleDeleteUser = async (id) => {
    try {
      if (!id) {
        toast.error("Id asset not found!");
      } else {
        let result = await deleteUser(id);
        if (result) {
          getUsers();
          toast.success("User deleted successfully!");
        }
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
      title: "Name",
      dataIndex: "name_User",
      key: "name_User",
    },
    {
      title: "Birth",
      dataIndex: "birth",
      key: "birth",
    },
    {
      title: "Role",
      dataIndex: "role_User",
      key: "role_User",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="btn-infoo"
            onClick={() => {
              handleOpenModalInfo(record);
            }}
          >
            <i class="fa-solid fa-info"></i>
          </button>
          <button
            className="btn-edit"
            // onClick={() => {
            //   getCurrentWO(record);
            // }}
          >
            <i class="fa-solid fa-pencil"></i>
          </button>
          <Popconfirm
            title="Delete the this user"
            description="Are you sure to delete this user?"
            deleteAsset
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleDeleteUser(record.id);
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
      <h3>Manage Users</h3>
      <div className="button-header">
        <button
          className="btn btn-primary "
          onClick={() => {
            handleOpenDrawer();
          }}
        >
          <i class="fa-solid fa-plus"></i> Add new user
        </button>
      </div>
      <div className="table-WO">
        <Table columns={columns} dataSource={listUser} />
      </div>
      <ModalAddUser
        isOpenDrawer={isOpenDrawer}
        isCloseDrawer={handleCloseDrawer}
        createNewUser={handleCreateUser}
        uploadFile={handleUploadFile}
      />
      <ModalViewUser
        openInfo={isOpenInfo}
        closeInfo={handleCloseInfo}
        currentUser={infoUser}
      />
    </>
  );
};

export default User;
