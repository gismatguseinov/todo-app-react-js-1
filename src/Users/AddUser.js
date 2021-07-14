import React, { useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import UserAddOutlined from "@ant-design/icons";
import { createNewUser } from "../api/api";
const { Option } = Select;
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new user"
      okText="Create"
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
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the name of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input the e-mail of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input the password of collection!",
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          name="roles"
          label="Role"
          rules={[{ required: true, message: "Please select role!" }]}
        >
          <Select placeholder="select your role">
            <Option value="1">PM</Option>
            <Option value="2">Employer</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CollectionsPage = (props = { onRefresh: () => {} }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCreate = (values) => {
    console.log(values);
    setLoading(true);
    createNewUser(values)
      .then((res) => res.data)
      .catch((err) => err)
      .finally(() => {
        setLoading(false);
        setVisible(false);
        props.onRefresh();
      });
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        <UserAddOutlined />
        New User
      </Button>
      <CollectionCreateForm
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

export default CollectionsPage;
