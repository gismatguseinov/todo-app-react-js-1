import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Popconfirm } from "antd";
import { getProjects, removeProject } from "../api/api";
import { QuestionCircleOutlined } from "@ant-design/icons";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import AddProject from "./AddProject";
import { useHistory } from "react-router";
import EmptyComp from "../Empty/Empty";

const Projects = (props) => {
  const [projects, setProjects] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const history = useHistory();

  const refreshHandler = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    getProjects()
      .then((result) => {
        setProjects(result);
      })
      .catch((err) => {
        console.error(err);
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
          marginTop: "4%",
        }}
      >
        <span style={{ marginLeft: 90 }}>Projects </span>
        {props.userDetail.roles !== 3 && (
          <AddProject onRefresh={refreshHandler} />
        )}
      </h1>

      <Row gutter={20} style={{ width: "80%", marginLeft: "5%" }}>
        {projects.length &&
          projects.map((item) => (
            <Col span={8}>
              <Card
                title={item.name}
                bordered={true}
                hoverable={true}
                style={{ marginTop: "15px" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  {props.userDetail.roles !== 3 && (
                    <Popconfirm
                      title="Are you sure to delete this project?"
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                      onConfirm={() => {
                        removeProject(item.id)
                          .then((result) => {
                            console.log(result);
                          })
                          .catch((err) => {
                            console.log(err);
                          })
                          .finally(() => {
                            setRefresh(!refresh);
                          });
                      }}
                      onCancel={() => {}}
                      okText="Yes"
                      cancelText="No"
                      okButtonProps={{ type: "danger" }}
                    >
                      <DeleteSharpIcon
                        titleAccess="Remove Project"
                        style={{ cursor: "pointer" }}
                        color="error"
                        fontSize="medium"
                      />
                    </Popconfirm>
                  )}

                  <Button
                    type="primary"
                    onClick={(event) => {
                      history.push({
                        pathname: "/tasks",
                        state: {
                          id: item.id,
                        },
                      });
                    }}
                  >
                    More Details
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        {!projects.length && <EmptyComp />}
      </Row>
    </>
  );
};

export default Projects;
