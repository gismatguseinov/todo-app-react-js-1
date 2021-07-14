import React, { useState } from "react";
import { Button, Modal, Form, Input, DatePicker } from "antd";
import UserAddOutlined from "@ant-design/icons";
import moment from "moment/moment.js";
import { addTask } from "../api/api";

const { TextArea } = Input;
const ModalForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [close, setClose] = useState();
  const deadlineHandler = (e) => {
    setClose(moment(e.toDate().toISOString()).format("DD-MM-YYYY"));
  };
  return (
    <Modal
      visible={visible}
      title="Create a new Task"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            const value = {
              ...values,
              close,
            };
            onCreate(value);
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
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the Title of Task",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="descr"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input the Description of Task",
            },
          ]}
        >
          <TextArea />
        </Form.Item>

        <div>
          <label>Deadline </label>
          <DatePicker
            name="close"
            style={{
              marginBottom: 20,
              width: "100%",
            }}
            onChange={deadlineHandler}
          />
        </div>
      </Form>
    </Modal>
  );
};

const AddTask = (props = { onRefresh: () => {} }) => {
  const [visible, setVisible] = useState(false);
  const project_id = props.projectId;
  const onCreate = (values) => {
    let data = { ...values, project_id };
    addTask(data)
      .then((res) => console.log(res))
      .catch((err) => err)
      .finally(()=>{
        setVisible(false);
        props.onRefresh();
      });
  };

  return (
    <div>
      <Button
        style={{
          marginRight: 20,
        }}
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        <UserAddOutlined />
        New Task
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

export default AddTask;
