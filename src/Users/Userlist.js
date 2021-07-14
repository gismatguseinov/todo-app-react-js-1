import React, { useEffect, useState } from "react";
import { Table, Space, Popconfirm,  Alert} from "antd";
import { QuestionCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import { removeUser, getUsers, passwordReset } from "../api/api";
import CollectionsPage from "./AddUser";
import EditModal from "./EditModal";

const UserList = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const refreshHandler = () => {
    setRefresh(!refresh);
  };

  const getUserRoleName = (role) => {
    switch (role) {
      case 1:
        return "Administrator";
      case 2:
        return "Project Manager";
      case 3:
        return "Employer";
      default:
        return "Unknown role";
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      key: "roles",
      render: (item) => <b>{getUserRoleName(item.roles)}</b>,
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this user?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => {
              setLoading(true);
              removeUser(item.id)
                .then((result) => {})
                .catch((err) => {
                  console.log(err);
                })
                .finally(() => {
                  setLoading(false);
                  setRefresh(!refresh);
                });
            }}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ type: "danger" }}
          >
            <DeleteSharpIcon
              titleAccess="Remove User"
              style={{ cursor: "pointer" }}
              color="error"
              fontSize="medium"
            />
          </Popconfirm>
          <EditModal item={item.id} onRefresh={refreshHandler} />
          <a
            style={{ cursor: "pointer" }}
            onClick={() => {
              setLoading(true);
              passwordReset(item.id)
                .then((res) => <Alert message={res.msg} type="success"  showIcon={true} closable={true} />)
                .catch((err) => <Alert message={err.msg} type="error"  showIcon={true} closable={true} />)
                .finally(() => {
                  setLoading(false);
                });
            }}
          >
            <ReloadOutlined titleAccess="Reset Password" style={{ cursor: "pointer" }} />
          </a>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((res) => {
        setDataSource(res);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
    return () => {};
  }, [refresh]);

  return (
    <>
      <h1
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <span>Users</span> <CollectionsPage onRefresh={refreshHandler} />
      </h1>
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        size="large"
        bordered={true}
      />
    </>
  );
};

export default UserList;
