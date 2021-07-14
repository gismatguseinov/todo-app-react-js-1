import { Menu, Dropdown } from "antd";
// import { DownOutlined } from "@ant-design/icons";
import Avatar from "../images/avatar.jpg";
import { logout } from "../api/api";
import "./Profile.css";
const menu = (
  <Menu>
    <Menu.Item>
      <a>Settings</a>
    </Menu.Item>
    <Menu.Item>
      <a
        onClick={() => {
          logout()
            .then((result) => {
              console.log("log out");
            })
            .catch((err) => {
              console.log(err);
            });
          localStorage.clear();
          window.location.replace("/login");
        }}
      >
        Log out
      </a>
    </Menu.Item>
  </Menu>
);

const Profile = (props) => {
  console.log(props.onUser);
  return (
    <div className="profile">
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <img
            src={Avatar}
            style={{
              width: "30px",
              borderRadius: "11px",
              marginBottom: "26px",
            }}
          />
        </a>
      </Dropdown>
    </div>
  );
};

export default Profile;
