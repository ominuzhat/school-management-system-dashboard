import { Menu, MenuProps } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Iconify from "../../../common/IconifyConfig/IconifyConfig";
import SidebarTop from "./SidebarTop";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ThemesTypes } from "../../../app/features/themeSlice";
import SidebarButtom from "./SidebarButtom";
import { PiContactlessPaymentBold, PiStudent } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import {
  IoAccessibilityOutline,
  IoBookOutline,
  IoCalendarOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import {
  MdAccountBalanceWallet,
  MdCoPresent,
  MdFilterTiltShift,
  MdOutlinePayments,
  MdPayment,
} from "react-icons/md";
import { FaCommentSms, FaPeopleGroup, FaRegAddressCard } from "react-icons/fa6";
import { TbCoinTaka, TbSection } from "react-icons/tb";
import { BiSolidInstitution, BiSolidUserAccount } from "react-icons/bi";
import {
  AiOutlineAccountBook,
  // AiOutlineSafetyCertificate,
} from "react-icons/ai";
import { HiOutlineCash } from "react-icons/hi";
// import { FcRules } from "react-icons/fc";
// import { CiBookmarkCheck, CiSettings } from "react-icons/ci";
// import { GrCertificate } from "react-icons/gr";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { IoMdPersonAdd } from "react-icons/io";
import { VscGoToEditingSession } from "react-icons/vsc";
import { RiLuggageDepositLine, RiSecurePaymentLine } from "react-icons/ri";
import { TfiAnnouncement } from "react-icons/tfi";
import { BsFillFileRuledFill } from "react-icons/bs";

const MenuData: React.FC = () => {
  const { themes } = useSelector<RootState, ThemesTypes>(
    (state) => state.themes
  );
  const { pathname } = useLocation();

  const iconStyle: React.CSSProperties | undefined = {
    marginRight: "8px",
    color: themes === "light" ? "#000000" : "#FFFFFF",
  };

  const settings = [
    {
      key: "/institute-profile",
      label: <Link to="/institute-profile">Institute Profile</Link>,
      icon: <BiSolidInstitution />,
    },

    {
      key: "/role-permission",
      label: <Link to="/role-permission">Role & Permissions</Link>,
      icon: <IoAccessibilityOutline />,
    },
    {
      key: "/notice",
      label: <Link to="/notice">Notice</Link>,
      icon: <TfiAnnouncement />,
    },
    {
      key: "/rules",
      label: <Link to="/rules">Rules & Regulation</Link>,
      icon: <BsFillFileRuledFill />,
    },
    {
      key: "/sms",
      label: <Link to="/sms">SMS Configuration</Link>,
      icon: <FaCommentSms />,
    },
  ];

  const members = [
    {
      key: "/students",
      label: <Link to="/students">Students</Link>,
      icon: <PiStudent />,
    },
    {
      key: "/teacher",
      label: <Link to="/teacher">Teachers</Link>,
      icon: <LiaChalkboardTeacherSolid />,
    },

    {
      key: "/employees-module",
      label: "Employees",
      icon: <IoPeopleOutline />,
      children: [
        {
          key: "/employees",
          label: <Link to="/employees">Employees</Link>,
          icon: <FaPeopleGroup />,
        },
        {
          key: "/department",
          label: <Link to="/department">Department</Link>,
          icon: <RiLuggageDepositLine />,
        },
      ],
    },
  ];

  const payroll = [
    {
      key: "/payroll-module",
      label: "Salary",
      icon: <MdPayment />,
      children: [
        {
          key: "/payroll",
          label: <Link to="/payroll">Payroll</Link>,
          icon: <MdOutlinePayments />,
        },
        {
          label: <Link to="/payment">Payment</Link>,
          icon: <PiContactlessPaymentBold />,
          key: "/payment",
        },
      ],
    },
    {
      key: "/fees-module",
      label: "Fees",
      icon: <TbCoinTaka />,
      children: [
        {
          label: <Link to="/fees">Config</Link>,
          icon: <BiSolidUserAccount />,
          key: "/fees",
        },
        {
          label: <Link to="/additional-fee">Additional Fee</Link>,
          icon: <HiOutlineCash />,
          key: "/additional-fee",
        },
        {
          label: <Link to="/collect-fee">Collect Fee</Link>,
          icon: <RiSecurePaymentLine />,
          key: "/collect-fee",
        },
      ],
    },

    {
      key: "/account",
      label: "Account",
      icon: <MdAccountBalanceWallet />,
      children: [
        {
          label: <Link to="/account">Chart of Account</Link>,
          icon: <BiSolidUserAccount />,
          key: "/account",
        },
        {
          label: <Link to="/account/transactions">Account Transaction</Link>,
          icon: <AiOutlineAccountBook />,
          key: "/account/transactions",
        },

        // {
        //   label: (
        //     <Link to="/attendance/mark-teacher-attendance">Add Income</Link>
        //   ),
        //   icon: <FaPiggyBank />,
        //   key: "/attendance/mark-teacher-attendance",
        // },
        // {
        //   label: (
        //     <Link to="/attendance/mark-teacher-attendance">Add Expense</Link>
        //   ),
        //   icon: <GiExpense />,
        //   key: "/attendance/mark-teacher-attendance",
        // },
      ],
    },
  ];

  const institution = [
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
      key: "/section",
      label: <Link to="/section">Section</Link>,
      icon: <TbSection />,
    },

    {
      key: "/shift",
      label: <Link to="/shift">Shift</Link>,
      icon: <MdFilterTiltShift />,
    },
    {
      key: "/routine",
      label: <Link to="/routine">Routine</Link>,
      icon: <IoCalendarOutline />,
    },

    {
      key: "/admission-module",
      label: "Admission",
      icon: <FaRegAddressCard />,
      children: [
        {
          key: "/admission",
          label: <Link to="/admission">Admission</Link>,
          icon: <IoMdPersonAdd />,
        },

        {
          key: "/admission-session",
          label: <Link to="/admission-session">Admission Session</Link>,
          icon: <VscGoToEditingSession />,
        },
      ],
    },

    {
      key: "/attendance",
      label: "Attendance",
      icon: <MdCoPresent />,
      children: [
        {
          label: (
            <Link to="/attendance/mark-student-attendance">
              Students Attendance
            </Link>
          ),
          icon: <PiStudent />,
          key: "/attendance/mark-student-attendance",
        },

        {
          label: (
            <Link to="/attendance/mark-employee-attendance">
              Employee Attendance
            </Link>
          ),
          icon: <IoPeopleOutline />,
          key: "/attendance/mark-employee-attendance",
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
  ];

  return (
    <div className="dashboard-sidebar-style">
      <div>
        <SidebarTop />
        <span className="features-title">Main Menu</span>
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
        <span className="features-title">Members</span>
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
        <span className="features-title">Institution</span>
        <div>
          <Menu
            style={{
              backgroundColor: "transparent",
            }}
            mode="inline"
            theme={themes}
            selectedKeys={[pathname]}
            items={institution}
          />
        </div>
        <span className="features-title">Finance Management</span>
        <div>
          <Menu
            style={{
              backgroundColor: "transparent",
            }}
            mode="inline"
            theme={themes}
            selectedKeys={[pathname]}
            items={payroll}
          />
        </div>
        <span className="features-title">Settings</span>
        <div>
          <Menu
            style={{
              backgroundColor: "transparent",
            }}
            mode="inline"
            theme={themes}
            selectedKeys={[pathname]}
            items={settings}
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
