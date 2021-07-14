import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleAltSharpIcon from "@material-ui/icons/PeopleAltSharp";
import { FolderAddFilled } from "@ant-design/icons";
import UserList from "../Users/Userlist";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Projects from "../Projects/Projects";
import Tasks from "../Tasks/Tasks";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";
import { getSessionUser } from "../api/api";
const { Header, Content, Footer, Sider } = Layout;

const SiderBar = (props) => {
  const [state, setState] = useState(false);
  const [user, setUser] = useState([]);

  const onCollapse = (collapsed) => {
    setState({ collapsed });
  };

  useEffect(() => {
    getSessionUser()
      .then((res) => {
        setUser(res);
      })
      .catch((err) => console.log(err));
    return () => {};
  }, []);

  const { collapsed } = state;
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div style={{ marginTop: "60px" }}></div>
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<DashboardIcon />}>
              <Link to="dashboard">Dashboard</Link>
            </Menu.Item>
            {user.roles !== 3 && (
              <Menu.Item key="2" icon={<PeopleAltSharpIcon />}>
                <Link to="users">Users</Link>
              </Menu.Item>
            )}
            <Menu.Item key="3" icon={<FolderAddFilled />}>
              <Link to="projects">
                {user.roles !== 3 ? "Projects" : "My Projects"}
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Profile onUser={user} />
          </Header>

          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {/* <Router> */}
              <Switch>
                <Route path="/dashboard">
                  <Dashboard userDetail={user} />
                </Route>
              </Switch>
              {user.roles !== 3 && (
                <Switch>
                  <Route path="/users">
                    <UserList />
                  </Route>
                </Switch>
              )}
              <Switch>
                <Route path="/projects">
                  <Projects userDetail={user} />
                </Route>
              </Switch>
              <Switch>
                <Route path="/tasks">
                  <Tasks userDetail={user} />
                </Route>
              </Switch>
              {/* </Router> */}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Created By Qismat Husein
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default SiderBar;
