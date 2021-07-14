import { Form, Input, Button, Checkbox } from "antd";
import Card from "../Card/Card";
import { login } from "../api/api";
import React, { useEffect } from "react";
import logo from "../images/logo.png";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.replace("/dashboard");
    }

    return () => {};
  }, []);

  const onFinish = (values) => {
    console.log(values);
    login(values)
      .then((res) => {
        localStorage.setItem("token", res.token);
        window.location.replace("/dashboard")
      })
      .catch((err) => console.error(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <img
          src={logo}
          style={{
            width: "80px",
            height: "80px",
            marginTop: "-13%",
            marginLeft: "27%",
          }}
          alt="Logo"
        />

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
