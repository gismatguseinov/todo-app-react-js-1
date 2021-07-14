import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import moment from "moment/moment.js";
import { addUserstoProject, getAllUsers } from "../api/api";
const { Option, OptGroup } = Select;

const ModalForm = ({ visible, onCreate, onCancel, projectId }) => {
  const [form] = Form.useForm();
  const [close, setClose] = useState();
  const [users, setUsers] = useState([]);
  const deadlineHandler = (e) => {
    setClose(moment(e.toDate().toISOString()).format("DD-MM-YYYY"));
  };

  useEffect(() => {
    getAllUsers(projectId)
      .then((res) => setUsers(res))
      .catch((err) => console.error(err));
    return () => {};
  }, []);
  return (
    <Modal
      visible={visible}
      title="Add User"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
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
        }}
      >
        <Form.Item
          name="user_id"
          label="Add User"
          rules={[
            {
              required: true,
              message: "Please input the Title of Task",
            },
          ]}
        >
          <Select
            mode="multiple"
            style={{ width: 200 }}
            // onChange={handleChange}
          >
            <OptGroup label="Project Manager">
              {users.length &&
                users[0].map((user) => (
                  <Option value={user.id}>{user.name}</Option>
                ))}
            </OptGroup>
            <OptGroup label="Emplooyer">
              {users.length &&
                users[1].map((user) => (
                  <Option value={user.id}>{user.name}</Option>
                ))}
            </OptGroup>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddUserToProject = (props = { onRefresh: () => {} }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const project_id = props.projectId;
  const onCreate = (values) => {
    let data = { ...values, project_id };
    setLoading(true);
    addUserstoProject(data)
      .then((res) => res)
      .catch((err) => err)
      .finally(() => {
        setLoading(false);
        setVisible(false);
        props.onRefresh();
      });
  };

  return (
    <div style={{
      marginLeft:"80%"
    }}>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add User
      </Button>
      <ModalForm
        projectId={project_id}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default AddUserToProject;
