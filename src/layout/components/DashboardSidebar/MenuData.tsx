import { Menu, MenuProps } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Iconify from "../../../common/IconifyConfig/IconifyConfig";
import SidebarTop from "./SidebarTop";

const MenuData: React.FC = () => {
  const { pathname } = useLocation();

  const iconStyle: React.CSSProperties | undefined = {
    marginRight: "8px",
    color: "white",
  };

  const subIconStyle: React.CSSProperties | undefined = {
    marginRight: "5px",
    color: "white",
  };

  const items: MenuProps["items"] = [
    {
      key: "/",
      label: <Link to="/">Dashboard</Link>,
      icon: <Iconify name="mage:dashboard" style={iconStyle} />,
    },

    {
      key: "/invoice",
      label: "invoice",
      icon: (
        <Iconify name="ic:outline-account-balance-wallet" style={iconStyle} />
      ),
      children: [
        {
          label: <Link to="/invoice/commission-air-ticket">Add a invoice</Link>,
          icon: (
            <Iconify name="ant-design:plus-outlined" style={subIconStyle} />
          ),
          key: "/invoice/commission-air-ticket",
        },
        {
          label: <Link to="/passport/passport-list">Passport List</Link>,
          icon: (
            <Iconify
              name="akar-icons:three-line-horizontal"
              style={subIconStyle}
            />
          ),
          key: "/passport/passport-list",
        },
      ],
    },
    {
      key: "/passport",
      label: "passport",
      icon: (
        <Iconify name="ic:outline-account-balance-wallet" style={iconStyle} />
      ),
      children: [
        {
          label: <Link to="/passport/create-passport">Add a Passport</Link>,
          icon: (
            <Iconify name="ant-design:plus-outlined" style={subIconStyle} />
          ),
          key: "/passport/create-passport",
        },
        {
          label: <Link to="/passport/passport-list">Passport List</Link>,
          icon: (
            <Iconify
              name="akar-icons:three-line-horizontal"
              style={subIconStyle}
            />
          ),
          key: "/passport/passport-list",
        },
      ],
    },

    {
      key: "/client",
      label: <Link to="/client">Client</Link>,
      icon: <Iconify name="mdi:person" style={iconStyle} />,
    },

    // {
    //   key: "/accounts",
    //   label: "Accounts",
    //   icon: (
    //     <Iconify name="ic:outline-account-balance-wallet" style={iconStyle} />
    //   ),
    //   children: [
    //     {
    //       label: <Link to="/accounts/account-list">Add an Account</Link>,
    //       icon: (
    //         <Iconify name="ant-design:plus-outlined" style={subIconStyle} />
    //       ),
    //       key: "/accounts/account-list",
    //     },
    //     {
    //       label: (
    //         <Link to="/accounts/transactions-history">
    //           Transactions History
    //         </Link>
    //       ),
    //       icon: (
    //         <Iconify
    //           name="akar-icons:three-line-horizontal"
    //           style={subIconStyle}
    //         />
    //       ),
    //       key: "/accounts/transactions-history",
    //     },
    //     {
    //       label: (
    //         <Link to="/accounts/balance-adjustment">Balance Adjustment</Link>
    //       ),
    //       icon: (
    //         <Iconify
    //           name="akar-icons:three-line-horizontal"
    //           style={subIconStyle}
    //         />
    //       ),
    //       key: "/accounts/balance-adjustment",
    //     },
    //     {
    //       label: <Link to="/accounts/balance-status">Balance Status</Link>,
    //       icon: (
    //         <Iconify
    //           name="akar-icons:three-line-horizontal"
    //           style={subIconStyle}
    //         />
    //       ),
    //       key: "/accounts/balance-status",
    //     },
    //     {
    //       label: <Link to="/accounts/balance-transfer">Balance Transfer</Link>,
    //       icon: (
    //         <Iconify
    //           name="akar-icons:three-line-horizontal"
    //           style={subIconStyle}
    //         />
    //       ),
    //       key: "/accounts/balance-transfer",
    //     },
    //     {
    //       label: <Link to="/accounts/client-account">Client Account</Link>,
    //       icon: <Iconify name="codicon:account" style={subIconStyle} />,
    //       key: "/accounts/client-account",
    //     },
    //   ],
    // },

    // {
    //   key: "/client",
    //   label: "Client",
    //   icon: <Iconify name="uil:user" style={iconStyle} />,
    //   children: [
    //     {
    //       label: <Link to="client-list">Client List</Link>,
    //       icon: (
    //         <Iconify
    //           name="akar-icons:three-line-horizontal"
    //           style={subIconStyle}
    //         />
    //       ),
    //       key: "client-list",
    //     },
    //   ],
    // },

    // {
    //   key: "/expense",
    //   label: "Expense",
    //   icon: <Iconify name="icon-park-outline:expenses" style={iconStyle} />,
    //   children: [
    //     {
    //       label: <Link to="expense-list">Expense List</Link>,
    //       icon: (
    //         <Iconify
    //           name="akar-icons:three-line-horizontal"
    //           style={subIconStyle}
    //         />
    //       ),
    //       key: "expense-list",
    //     },
    //     {
    //       label: <Link to="expense-head">Expense Head</Link>,
    //       icon: (
    //         <Iconify
    //           name="akar-icons:three-line-horizontal"
    //           style={subIconStyle}
    //         />
    //       ),
    //       key: "expense-head",
    //     },
    //     {
    //       label: <Link to="expense-sub-head">Expense Sub Head</Link>,
    //       icon: (
    //         <Iconify
    //           name="akar-icons:three-line-horizontal"
    //           style={subIconStyle}
    //         />
    //       ),
    //       key: "expense-sub-head",
    //     },
    //   ],
    // },

    // {
    //   key: "/payroll",
    //   label: "Payroll",
    //   icon: <Iconify name="mage:money-exchange" style={iconStyle} />,
    //   children: [
    //     {
    //       label: <Link to="payroll-list">Payroll List</Link>,
    //       icon: (
    //         <Iconify
    //           name="akar-icons:three-line-horizontal"
    //           style={subIconStyle}
    //         />
    //       ),
    //       key: "payroll-list",
    //     },
    //   ],
    // },

    // {
    //   key: "/configuration",
    //   label: "Configuration",
    //   icon: <Iconify name="hugeicons:configuration-01" style={iconStyle} />,
    //   children: [
    //     {
    //       label: <Link to="employee">Employee</Link>,
    //       icon: <Iconify name="raphael:employee" style={subIconStyle} />,
    //       key: "employee",
    //     },
    //     {
    //       label: <Link to="department">Department</Link>,
    //       icon: <Iconify name="ph:building-fill" style={subIconStyle} />,
    //       key: "department",
    //     },
    //     {
    //       label: <Link to="course">Course</Link>,
    //       icon: <Iconify name="tdesign:course" style={subIconStyle} />,
    //       key: "course",
    //     },
    //     {
    //       label: <Link to="source">Source</Link>,
    //       icon: <Iconify name="ic:outline-source" style={subIconStyle} />,
    //       key: "source",
    //     },
    //   ],
    // },

    // {
    //   key: "/administration",
    //   label: "Administration",
    //   icon: <Iconify name="medical-icon:administration" style={iconStyle} />,
    //   children: [
    //     {
    //       label: <Link to="admin">Admin</Link>,
    //       icon: <Iconify name="eos-icons:admin" style={subIconStyle} />,
    //       key: "admin",
    //     },
    //     {
    //       label: <Link to="role-list">Role List</Link>,
    //       icon: <Iconify name="carbon:user-role" style={subIconStyle} />,
    //       key: "role-list",
    //     },
    //     {
    //       label: <Link to="audit-trail">Audit Trail</Link>,
    //       icon: <Iconify name="icon-park-outline:audit" style={subIconStyle} />,
    //       key: "audit-trail",
    //     },
    //   ],
    // },
  ];

  return (
    <div className="dashboard-sidebar-style">
      <div>
        <SidebarTop />
        <span className="featues-title">Main Menu</span>
        <div>
          <Menu
            style={{ backgroundColor: "transparent" }}
            mode="inline"
            theme="dark"
            selectedKeys={[pathname]}
            items={items}
          />
        </div>
      </div>

      <br />
      <br />

      {/* <SidebarButtom /> */}
    </div>
  );
};

export default MenuData;
