import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { getSingleUser, updateUser } from "../api/api";
import EditSharpIcon from "@material-ui/icons/EditSharp";
const { Option } = Select;
const CollectionCreateForm = ({
  visible,
  onCreate,
  onCancel,
  User,
  userID,
}) => {
  const [form] = Form.useForm();
  const getUserRoleName = (role) => {
    switch (role) {
      case 1:
        return "Administrator";
      case 2:
        return "Project Manager";
      case 3:
        return "Emplooyer";
      default:
        return "Unknown Role";
    }
  };

  return (
    <Modal
      visible={visible}
      title="Edit user"
      okText="Edit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values, userID);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
          ...User,
        }}
      >
        <Form.Item name="name" label="Name">
          <Input defaultValue={User.name} />
        </Form.Item>
        <Form.Item fieldKey="email" name="email" label="Email">
          <Input defaultValue={User.email} />
        </Form.Item>
        <Form.Item name="roles" label="Role" valuePropName="option">
          <Select
            placeholder="Select user role"
            defaultValue={getUserRoleName(User.roles)}
          >
            <Option value="1" key="1">
              Admininsrator
            </Option>
            <Option value="2" key="2">
              Project Manager
            </Option>
            <Option value="3" key="3">
              Employer
            </Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EditModal = (props = { onRefresh: () => {} }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editableUser, setEditableUser] = useState([]);

  const onCreate = (values, userID) => {
    setLoading(true);
    updateUser(values, userID)
      .then((res) => res)
      .catch((err) => err)
      .finally(() => {
        setVisible(false);
        setLoading(false);
        props.onRefresh();
      });
  };
  useEffect(() => {
    getSingleUser(props.item)
      .then((res) => setEditableUser(res))
      .catch((err) => console.log(err));
    return () => {};
  }, []);

  return (
    <div>
      <EditSharpIcon
        titleAccess="Edit User"
        color="primary"
        style={{ cursor: "pointer" }}
        onClick={() => {
          setVisible(true);
        }}
      />
      <CollectionCreateForm
        User={editableUser}
        userID={props.item}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        loading={loading}
      />
    </div>
  );
};

export default EditModal;
