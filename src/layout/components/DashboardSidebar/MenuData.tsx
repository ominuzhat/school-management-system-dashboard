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
import {
  IoAccessibilityOutline,
  IoBookOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import {
  MdAccountBalanceWallet,
  MdCoPresent,
  MdOutlinePayments,
} from "react-icons/md";
import { FaPiggyBank, FaRegNoteSticky } from "react-icons/fa6";
import { TbCoinTaka, TbFileInvoice } from "react-icons/tb";
import { GiExpense } from "react-icons/gi";
import { BiSolidInstitution, BiSolidUserAccount } from "react-icons/bi";
import {
  AiOutlineAccountBook,
  AiOutlineSafetyCertificate,
} from "react-icons/ai";
import { HiOutlineCash } from "react-icons/hi";
import { FcRules } from "react-icons/fc";
import { CiBookmarkCheck, CiSettings } from "react-icons/ci";
import { GrCertificate } from "react-icons/gr";
import {
  LiaCertificateSolid,
  LiaChalkboardTeacherSolid,
} from "react-icons/lia";
import { IoMdPersonAdd } from "react-icons/io";
import { VscGoToEditingSession } from "react-icons/vsc";

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
      key: "",
      label: <Link to="">Accounts For Fee Invoice</Link>,
      icon: <TbFileInvoice />,
    },
    {
      key: "",
      label: <Link to="">Rules & Regulations</Link>,
      icon: <FcRules />,
    },
    {
      key: "",
      label: <Link to="">Marks Grading</Link>,
      icon: <CiBookmarkCheck />,
    },
    {
      key: "",
      label: <Link to="">Account Settings</Link>,
      icon: <CiSettings />,
    },
    {
      key: "/role-permission",
      label: <Link to="/role-permission">Role & Permissions</Link>,
      icon: <IoAccessibilityOutline />,
    },

    {
      key: "/attendance",
      label: "Certificates",
      icon: <GrCertificate />,
      children: [
        {
          label: <Link to="/mark-student-attendance">Leave Certificate</Link>,
          icon: <AiOutlineSafetyCertificate />,
          key: "/mark-student-attendance",
        },

        {
          label: (
            <Link to="/mark-teacher-attendance">Character Certificate</Link>
          ),
          icon: <LiaCertificateSolid />,
          key: "/mark-teacher-attendance",
        },
      ],
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
      label: <Link to="/teacher">Teacher</Link>,
      icon: <LiaChalkboardTeacherSolid />,
    },
    {
      key: "/employees",
      label: <Link to="/employees">Employees</Link>,
      icon: <IoPeopleOutline />,
    },
  ];

  const payroll = [
    {
      key: "/salary",
      label: <Link to="/salary">Salary</Link>,
      icon: <MdOutlinePayments />,
    },
    // {
    //   key: "/fees",
    //   label: <Link to="/fees">Fees</Link>,
    //   icon: <TbCoinTaka />,
    // },

    {
      key: "/fees",
      label: "Fees",
      icon: <TbCoinTaka />,
      children: [
        {
          label: <Link to="/fees">Fees</Link>,
          icon: <BiSolidUserAccount />,
          key: "/fees",
        },
        {
          label: <Link to="/fees/fees-particular">Fees Particulars</Link>,
          icon: <HiOutlineCash />,
          key: "/fees/fees-particular",
        },
      ],
    },

    {
      key: "/account",
      label: "Account",
      icon: <MdAccountBalanceWallet />,
      children: [
        {
          label: (
            <Link to="/attendance/mark-student-attendance">
              Chart of Account
            </Link>
          ),
          icon: <BiSolidUserAccount />,
          key: "/attendance/mark-student-attendance",
        },
        {
          label: (
            <Link to="/attendance/mark-student-attendance">
              Account Statement
            </Link>
          ),
          icon: <AiOutlineAccountBook />,
          key: "/attendance/mark-student-attendance",
        },

        {
          label: (
            <Link to="/attendance/mark-teacher-attendance">Add Income</Link>
          ),
          icon: <FaPiggyBank />,
          key: "/attendance/mark-teacher-attendance",
        },
        {
          label: (
            <Link to="/attendance/mark-teacher-attendance">Add Expense</Link>
          ),
          icon: <GiExpense />,
          key: "/attendance/mark-teacher-attendance",
        },
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
      key: "/department",
      label: <Link to="/department">Department</Link>,
      icon: <IoBookOutline />,
    },
    {
      key: "/admission-session",
      label: <Link to="/admission-session">Admission Session</Link>,
      icon: <VscGoToEditingSession />,
    },
    {
      key: "/admission",
      label: <Link to="/admission">Admission</Link>,
      icon: <IoMdPersonAdd />,
    },

    {
      key: "/Class-tests",
      label: <Link to="/Class-tests">Class Test</Link>,
      icon: <FaRegNoteSticky />,
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
            <Link to="/attendance/mark-teacher-attendance">
              Teacher Attendance
            </Link>
          ),
          icon: <IoPeopleOutline />,
          key: "/attendance/mark-teacher-attendance",
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
