import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import TaskStatus from "../Tasks/TaskStatus";
import { getProjectTasks } from "../api/api";
import AddTask from "../Tasks/AddTask";
import AddUserToProject from "./AddUserToProject";
import { useLocation } from "react-router-dom";
import Details from "./Details";
import EmptyComp from "../Empty/Empty";

const Tasks = (props) => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  const refreshHandler = () => {
    setRefresh(!refresh);
  };
  useEffect(() => {
    setLoading(true);
    getProjectTasks(location.state.id)
      .then((res) => setTasks(res))
      .catch((err) => err)
      .finally(() => {
        setTimeout(() => setLoading(false), 1000);
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
        <span>Tasks</span>
        {props.userDetail.roles !== 3 && (
          <AddUserToProject
            projectId={location.state.id}
            onRefresh={refreshHandler}
          />
        )}
        {props.userDetail.roles !== 3 && (
          <AddTask projectId={location.state.id} onRefresh={refreshHandler} />
        )}
      </h1>
      {!visible && (
        <Row
          gutter={20}
          loading={loading}
          style={{ width: "100%", marginTop: "15px" }}
        >
          {tasks.length &&
            tasks.map((item) => (
              <Col span={8}>
                <Card
                  title={item[0].title}
                  bordered={true}
                  hoverable={true}
                  style={{ marginTop: "15px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "space-around",
                    }}
                  >
                    <p style={{ marginTop: "-10px" }}>
                      Deadline : {item[0].close}
                    </p>
                    <Details
                      userDetail = {props.userDetail}
                      taskId={item[0].id}
                      projectId={location.state.id}
                      onRefresh={refreshHandler}
                    />
                    <TaskStatus status={item[0].status} />
                  </div>
                </Card>
              </Col>
            ))}
          {!tasks.length && <EmptyComp />}
        </Row>
      )}
    </>
  );
};
export default Tasks;
