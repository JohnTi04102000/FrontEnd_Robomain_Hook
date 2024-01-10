import React, { useState, useEffect } from "react";
import { getAllAccounts, createNewAccounts, deleteAccount } from "../../../services/AccountService";
import { Space, Table, Popconfirm } from "antd";
import ModalAddAccount from "./ModalAddAccount";
import { toast } from "react-toastify";

const Account = () => {
  const [listAccount, setListAccount] = useState([]);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    let response = await getAllAccounts();
    setListAccount(response.data);
  };

  const handleCreateAccount = async (data) => {
    try {
      let response = await createNewAccounts(data);
      if (response) {
        getAccounts();
        toast.success("Create new account successfully!");
        handleCloseDrawer(false);
      }
    } catch (e) {
      toast.error(e.response.data.errCode);
      handleCloseDrawer(false);
    }
  };

  const handleDeleteAccount = async (id) => {
    try {
      if (!id) {
        toast.error("Id asset not found!");
      } else {
        let result = await deleteAccount(id);
        if (result) {
            getAccounts();
          toast.success("Account deleted successfully!");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password",
      dataIndex: "pass",
      key: "pass",
    },
    {
      title: "User",
      dataIndex: "id_user",
      key: "id_user",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="btn-edit"
            // onClick={() => {
            //   getCurrentWO(record);
            // }}
          >
            <i class="fa-solid fa-pencil"></i>
          </button>
          <Popconfirm
            title="Delete the this account"
            description="Are you sure to delete this account?"
            deleteAsset
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
                handleDeleteAccount(record.id);
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
      <h3>Manage Accounts</h3>
      <div className="button-header">
        <button
          className="btn btn-primary "
            onClick={() => {
              handleOpenDrawer();
            }}
        >
          <i class="fa-solid fa-plus"></i> Add new account
        </button>
      </div>
      <div className="table-WO">
        <Table columns={columns} dataSource={listAccount} />
      </div>
      <ModalAddAccount
      isOpenDrawer={isOpenDrawer}
      isCloseDrawer={handleCloseDrawer}
      createNewAccount={handleCreateAccount}
      />
    </>
  );
};

export default Account;
