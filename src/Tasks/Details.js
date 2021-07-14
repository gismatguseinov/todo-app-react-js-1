import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, DatePicker } from "antd";
import UserAddOutlined from "@ant-design/icons";
import moment from "moment/moment.js";
import {
  taskEdit,
  getSingleTask,
  getTaskUsers,
  allUsersProject,
} from "../api/api";
const { TextArea } = Input;
const { Option, OptGroup } = Select;
const getUserRoleName = (role) => {
  switch (role) {
    case 1:
      return "Todo";
    case 2:
      return "In Progress";
    case 3:
      return "Test";
    case 4:
      return "Done";
    default:
      return "Unknown Status";
  }
};

const ModalForm = ({
  visible,
  onCreate,
  onCancel,
  taskInfo,
  userDetail,
  taskUsers,
  allUsers,
}) => {
  const [form] = Form.useForm();
  console.log(getUserRoleName(taskInfo.status));

  const [close, setClose] = useState();

  const deadlineHandler = (e) => {
    setClose(moment(e.toDate().toISOString()).format("DD-MM-YYYY"));
  };
  console.log(allUsers);

  return (
    <Modal
      visible={visible}
      title=""
      okText="Update"
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
          ...taskInfo,
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
          <Input defaultValue={taskInfo.title} />
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
          <TextArea defaultValue={taskInfo.descr} />
        </Form.Item>

        <div>
          <label>Deadline </label>
          <DatePicker
            name="close"
            defaultValue={moment(taskInfo.close, "YYYY-MM-DD")}
            style={{
              marginBottom: 20,
              width: "100%",
            }}
            onChange={deadlineHandler}
          ></DatePicker>
        </div>

        <Form.Item
          valuePropName="option"
          name="status"
          label="Status"
          rules={[
            {
              required: true,
              message: "Please input the status of Task",
            },
          ]}
        >
          <Select
            placeholder="select task Status"
            defaultValue={getUserRoleName(taskInfo.status)}
          >
            <Option value="1" key="1">
              Todo
            </Option>
            <Option value="2" key="2">
              In Progress
            </Option>
            <Option value="3" key="3">
              Test
            </Option>
            {userDetail.roles !== 3 && <Option value="4">Done</Option>}
          </Select>
        </Form.Item>
        <Form.Item name="user_id" label="Add User">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            // onChange={handleChange}
          >
            <OptGroup label="Current Users">
              {taskUsers.length &&
                taskUsers.map((user) => (
                  <Option value={user[0].id}>{user[0].name}</Option>
                ))}
            </OptGroup>
            <OptGroup label="Emplooyer">
              {allUsers.length &&
                allUsers[0].map((user) => (
                  <Option value={user.id}>{user.name}</Option>
                ))}
            </OptGroup>
            <OptGroup label="PM">
              {allUsers.length &&
                allUsers[1].map((user) => (
                  <Option value={user.id}>{user.name}</Option>
                ))}
            </OptGroup>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Details = (props) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState([]);
  const [users, setUsers] = useState([]);
  const [taskUsers, setTaskUsers] = useState([]);

  const project_id = props.projectId;
  const id = props.taskId;
  const onCreate = (values) => {
    let data = {
      ...values,
      project_id,
    };
    setLoading(true);
    taskEdit(data, id)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(!loading);
        setVisible(false);
        props.onRefresh();
      });
  };

  useEffect(() => {
    getSingleTask(props.taskId)
      .then((res) => setTask(res))
      .catch((err) => console.log(err));

    getTaskUsers(props.taskId)
      .then((res) => setTaskUsers(res))
      .catch((err) => console.log(err));

    allUsersProject(project_id)
      .then((res) => setUsers(res))
      .catch((err) => console.error(err));
    return () => {};
  }, [loading]);

  return (
    <div>
      <Button
        style={{
          marginBottom: "20px",
          marginTop: "5px",
        }}
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        <UserAddOutlined />
        More Details
      </Button>
      <ModalForm
        allUsers={users}
        taskUsers={taskUsers}
        userDetail={props.userDetail}
        taskInfo={task}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default Details;
