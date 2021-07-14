import "./Dashboard.css";
import "./Card.css";
import React, { useEffect, useState } from "react";
import { dashboard } from "../api/api";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import FolderSharpIcon from "@material-ui/icons/FolderSharp";
import PlaylistAddCheckSharpIcon from "@material-ui/icons/PlaylistAddCheckSharp";
const Dashboard = (props) => {
  const [dashboardData, setDashboardData] = useState([]);

  console.log(dashboardData);

  useEffect(() => {
    dashboard()
      .then((res) => setDashboardData(res))
      .catch((err) => console.log(err));
    return () => {};
  }, []);
  return (
    <>
      {props.userDetail.roles !== 3 && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginRight: "5%",
          }}
        >
          <div className="component">
            <div className="title">Users</div>
            <div className="count">
              <GroupRoundedIcon style={{ color: "white" }} fontSize="medium" />
              <span
                style={{
                  color: "white",
                  marginLeft: "57px",
                  display: "block",
                  marginTop: "-28px",
                }}
              >
                {dashboardData.user}
              </span>
            </div>
          </div>
          <div className="component">
            <div className="title">Projects</div>
            <div className="count">
              <FolderSharpIcon style={{ color: "white" }} fontSize="medium" />
              <span
                style={{
                  color: "white",
                  marginLeft: "57px",
                  display: "block",
                  marginTop: "-28px",
                }}
              >
                {dashboardData.projects}
              </span>
            </div>
          </div>
          <div className="component">
            <div className="title">Done </div>
            <div className="count">
              <PlaylistAddCheckSharpIcon
                style={{ color: "white" }}
                fontSize="medium"
              />
              <span
                style={{
                  color: "white",
                  marginLeft: "57px",
                  display: "block",
                  marginTop: "-28px",
                }}
              >
                {dashboardData.doneTask}
              </span>
            </div>
          </div>
          <div className="component">
            <div className="title">In Progress</div>
            <div className="count">
              <GroupRoundedIcon style={{ color: "white" }} fontSize="medium" />
              <span
                style={{
                  color: "white",
                  marginLeft: "57px",
                  display: "block",
                  marginTop: "-28px",
                }}
              >
                {dashboardData.doingTask}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
