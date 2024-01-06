import React, { useState } from "react";
import "./Dashboard.scss";
import logo from "../../assets/image/logo.png";
import {
  SettingOutlined,
  UserOutlined,
  DashboardOutlined,
  ToolOutlined,
  DatabaseOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import WorkOrder from "./WorkOrder/WorkOrder";
import Home_Manage from "../../components/Techician/HomePage/Home_Manager";
import Users from "../ADMIN/User/User";
import Assets from "../ADMIN/Asset/Asset";
import { NavLink } from "react-router-dom";
import PrivatePage from "../../HOC/PrivatePage";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const Dashboard = () => {
  const [displayedComponent, setDisplayedComponent] = useState("1");

  const items = [
    getItem("Dashboard", "sub1", <DashboardOutlined />, [
      getItem(<div>Dashboard</div>, "1"),
      getItem(<div>Calendar</div>, "2"),
      getItem(<div>Assigned Asssets</div>, "3"),
      getItem(<div>Assigned Work Order</div>, "4"),
      getItem(<div>Assigned Work Request</div>, "5"),
    ]),
    getItem("Maintenance", "sub2", <ToolOutlined />, [
      getItem(<div>WorkOrder</div>, "6"),
      getItem(<div>Schedule Maintenance</div>, "7"),
      getItem(<div>Task Group</div>, "8"),
      getItem(<div>Project</div>, "9"),
    ]),
    {
      type: "divider",
    },
    getItem("Assets", "sub4", <DatabaseOutlined />, [
      getItem(<div>All Assets</div>, "10"),
      getItem(<div>Facility</div>, "11"),
      getItem(<div>Equipment</div>, "12"),
      getItem(<div>Tool</div>, "13"),
      getItem(<div>Assets risk predictor</div>, "14"),
    ]),
    {
      type: "divider",
    },
    getItem("Users", "sub5", <UserOutlined />, [
      getItem(<div>All Users</div>, "15"),
    ]),
    getItem("AR module", "sub6", <FileSearchOutlined />, [
      getItem(
        <NavLink to="/room" className="dropdown-item">
          Video call
        </NavLink>,
        "16"
      ),
      getItem(
        <NavLink to="/schedule" className="dropdown-item">
          Session support
        </NavLink>,
        "17"
      ),
    ]),
    getItem(
      "Exit",
      "grp",
      <SettingOutlined />,
      [
        getItem(
          <NavLink to="/logout" className="dropdown-item">
            Logout
          </NavLink>,
          "13"
        ),
      ],
      "group"
    ),
  ];

  const changeDashboard = (component) => {
    setDisplayedComponent(component);
  };

  let contentToDisplay;

  switch (displayedComponent) {
    case "1":
      contentToDisplay = <Home_Manage />;
      break;
    case "6":
      contentToDisplay = <WorkOrder />;
      break;
    case "7":
      contentToDisplay = <WorkOrder />;
      break;
    case "8":
      contentToDisplay = <WorkOrder />;
      break;
    case "9":
      contentToDisplay = <WorkOrder />;
      break;
    case "15":
      contentToDisplay = <Users />;
      break;
    case "10":
      contentToDisplay = <Assets />;
      break;

    default:
      contentToDisplay = <Home_Manage />;
  }

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <div className="db-logo">
            <img src={logo} alt="Logo" className="logo-image" />
          </div>
          <div>
            <Menu
              onClick={(e) => changeDashboard(e.key)}
              style={{
                width: 256,
              }}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              items={items}
            />
          </div>
        </div>
        <div className="dashboard-content">{contentToDisplay}</div>
      </div>
    </>
  );
};

export default PrivatePage(Dashboard);
