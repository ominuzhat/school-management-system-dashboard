import { Menu, MenuProps } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Iconify from "../../../common/IconifyConfig/IconifyConfig";
import SidebarTop from "./SidebarTop";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ThemesTypes } from "../../../app/features/themeSlice";
import SidebarButtom from "./SidebarButtom";
import { PiStudent } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { IoBookOutline, IoPeopleOutline } from "react-icons/io5";
import { MdCoPresent } from "react-icons/md";
import { FaRegNoteSticky } from "react-icons/fa6";

const MenuData: React.FC = () => {
  const { themes } = useSelector<RootState, ThemesTypes>(
    (state) => state.themes
  );
  const { pathname } = useLocation();

  const iconStyle: React.CSSProperties | undefined = {
    marginRight: "8px",
    color: themes === "light" ? "#000000" : "#FFFFFF",
  };

  const subIconStyle: React.CSSProperties | undefined = {
    marginRight: "5px",
    color: themes === "light" ? "#000000" : "white",
  };

  const members = [
    {
      key: "/students",
      label: <Link to="/students">Students</Link>,
      icon: <PiStudent />,
      // icon: <Iconify name="mdi:person" style={iconStyle} />,
    },
    {
      key: "/employees",
      label: <Link to="/employees">Employees</Link>,
      icon: <IoPeopleOutline />,
    },
    // {
    //   key: "/configuration",
    //   label: "Configuration",
    //   icon: <Iconify name="hugeicons:configuration-01" style={iconStyle} />,
    //   children: [
    //     {
    //       label: <Link to="/category">Category</Link>,
    //       icon: <Iconify name="tdesign:course" style={subIconStyle} />,
    //       key: "/category",
    //     },
    //   ],
    // },
  ];
  const generalSettings = [
    {
      key: "/classes",
      label: <Link to="/classes">Classes</Link>,
      icon: <SiGoogleclassroom />,
    },
    {
      key: "/subjects",
      label: <Link to="/subjects">Subjects</Link>,
      icon: <IoBookOutline />,
    },
    {
      key: "/attendees",
      label: <Link to="/attendees">Attendance</Link>,
      icon: <MdCoPresent />,
    },
    {
      key: "/Class-tests",
      label: <Link to="/Class-tests">Class Test</Link>,
      icon: <FaRegNoteSticky />,
    },
    {
      key: "/configuration",
      label: "Configuration",
      icon: <Iconify name="hugeicons:configuration-01" style={iconStyle} />,
      children: [
        {
          label: <Link to="/category">Category</Link>,
          icon: <Iconify name="tdesign:course" style={subIconStyle} />,
          key: "/category",
        },
      ],
    },
  ];
  const items: MenuProps["items"] = [
    {
      key: "/",
      label: <Link to="/">Dashboard</Link>,
      icon: <Iconify name="mage:dashboard" style={iconStyle} />,
    },
    {
      key: "/order",
      label: <Link to="/order">Order</Link>,
      icon: <Iconify name="mdi:work" style={iconStyle} />,
    },
    {
      key: "/service",
      label: <Link to="/service">Service</Link>,
      icon: <Iconify name="mdi:work" style={iconStyle} />,
    },
    {
      key: "/cart",
      label: <Link to="/cart">Cart</Link>,
      icon: <Iconify name="mdi:cart" style={iconStyle} />,
    },
    {
      key: "/product",
      label: <Link to="/product">Product</Link>,
      icon: <Iconify name="mdi:person" style={iconStyle} />,
    },
    {
      key: "/configuration",
      label: "Configuration",
      icon: <Iconify name="hugeicons:configuration-01" style={iconStyle} />,
      children: [
        {
          label: <Link to="/category">Category</Link>,
          icon: <Iconify name="tdesign:course" style={subIconStyle} />,
          key: "/category",
        },
      ],
    },
  ];

  return (
    <div className="dashboard-sidebar-style">
      <div>
        <SidebarTop />
        <span className="featues-title">Main Menu</span>
        <div>
          <Menu
            style={{
              backgroundColor: "transparent",
            }}
            mode="inline"
            theme={themes}
            selectedKeys={[pathname]}
            items={items}
          />
        </div>
        <span className="featues-title">Members</span>
        <div>
          <Menu
            style={{
              backgroundColor: "transparent",
            }}
            mode="inline"
            theme={themes}
            selectedKeys={[pathname]}
            items={members}
          />
        </div>
        <span className="featues-title">General Settings</span>
        <div>
          <Menu
            style={{
              backgroundColor: "transparent",
            }}
            mode="inline"
            theme={themes}
            selectedKeys={[pathname]}
            items={generalSettings}
          />
        </div>
      </div>

      <br />
      <br />

      <SidebarButtom />
    </div>
  );
};

export default MenuData;
