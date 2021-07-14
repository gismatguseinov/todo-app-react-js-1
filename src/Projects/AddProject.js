import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { addProject } from "../api/api";
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp";
const ModalForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new Project"
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
              message: "Please input the name of Project",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddProject = (props = { onRefresh: () => {} }) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    addProject(values)
      .then((res) => res.data)
      .catch((err) => err)
      .finally(() => {
        setVisible(false);
        props.onRefresh();
      });
  };

  return (
    <div>
      <Button
        style={{ marginRight: 250 }}
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        <AddCircleSharpIcon titleAccess="New Project" />
      </Button>
      <ModalForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default AddProject;
