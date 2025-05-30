import { Menu, MenuProps } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Iconify from "../../../common/IconifyConfig/IconifyConfig";
import SidebarTop from "./SidebarTop";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ThemesTypes } from "../../../app/features/themeSlice";
import SidebarButtom from "./SidebarButtom";
import {
  PiContactlessPaymentBold,
  PiExamLight,
  PiStudent,
} from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import {
  IoAccessibilityOutline,
  IoBookOutline,
  IoCalendarOutline,
  IoCompassOutline,
  IoPeopleOutline,
  IoReceiptOutline,
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
import { AiOutlineAccountBook } from "react-icons/ai";
import { HiOutlineCash } from "react-icons/hi";

import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { IoMdPersonAdd } from "react-icons/io";
import { VscGoToEditingSession } from "react-icons/vsc";
import { RiLuggageDepositLine, RiSecurePaymentLine } from "react-icons/ri";
import { TfiAnnouncement } from "react-icons/tfi";
import {
  BsBookmarks,
  BsFileEarmarkDiff,
  BsFillFileRuledFill,
} from "react-icons/bs";
import { FiPenTool } from "react-icons/fi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { LuCopyleft } from "react-icons/lu";
import { useGetDashboardDataQuery } from "../../../modules/Dashboard/api/dashoboardEndPoints";
import { hasPermissionForModule } from "../../../utilities/permission";
import { ItemType, MenuItemType } from "antd/es/menu/interface";

const MenuData: React.FC = () => {
  const { themes } = useSelector<RootState, ThemesTypes>(
    (state) => state.themes
  );
  const { pathname } = useLocation();
  const { data: dashboardData } = useGetDashboardDataQuery({});

  const permissions = dashboardData?.data?.permissions || [];

  const iconStyle: React.CSSProperties | undefined = {
    marginRight: "8px",
    color: themes === "light" ? "#000000" : "#FFFFFF",
  };

  const settings = [
    hasPermissionForModule(permissions, "institution") && {
      key: "/institute-profile",
      label: <Link to="/institute-profile">Institute Profile</Link>,
      icon: <BiSolidInstitution />,
    },

    hasPermissionForModule(permissions, "role") && {
      key: "/role-permission",
      label: <Link to="/role-permission">Role & Permissions</Link>,
      icon: <IoAccessibilityOutline />,
    },
    hasPermissionForModule(permissions, "noticeboard") && {
      key: "/notice",
      label: <Link to="/notice">Notice</Link>,
      icon: <TfiAnnouncement />,
    },
    hasPermissionForModule(permissions, "rulesandregulations") && {
      key: "/rules",
      label: <Link to="/rules">Rules & Regulation</Link>,
      icon: <BsFillFileRuledFill />,
    },
    hasPermissionForModule(permissions, "smsconfig") && {
      key: "/sms",
      label: <Link to="/sms">SMS Configuration</Link>,
      icon: <FaCommentSms />,
    },
  ].filter(Boolean);

  const members = [
    hasPermissionForModule(permissions, "student") && {
      key: "/students",
      label: <Link to="/students">Students</Link>,
      icon: <PiStudent />,
    },
    hasPermissionForModule(permissions, "teacher") && {
      key: "/teacher",
      label: <Link to="/teacher">Teachers</Link>,
      icon: <LiaChalkboardTeacherSolid />,
    },

    hasPermissionForModule(permissions, "employee") &&
      hasPermissionForModule(permissions, "department") && {
        key: "/employees-module",
        label: "Employees",
        icon: <IoPeopleOutline />,
        children: [
          hasPermissionForModule(permissions, "employee") && {
            key: "/employees",
            label: <Link to="/employees">Employees</Link>,
            icon: <FaPeopleGroup />,
          },
          hasPermissionForModule(permissions, "department") && {
            key: "/department",
            label: <Link to="/department">Department</Link>,
            icon: <RiLuggageDepositLine />,
          },
        ],
      },
  ].filter(Boolean);

  const payroll = [
    hasPermissionForModule(permissions, "payroll") &&
      hasPermissionForModule(permissions, "payment") && {
        key: "/payroll-module",
        label: "Salary",
        icon: <MdPayment />,
        children: [
          hasPermissionForModule(permissions, "payroll") && {
            key: "/payroll",
            label: <Link to="/payroll">Payroll</Link>,
            icon: <MdOutlinePayments />,
          },
          hasPermissionForModule(permissions, "payment") && {
            label: <Link to="/payment">Payment</Link>,
            icon: <PiContactlessPaymentBold />,
            key: "/payment",
          },
        ],
      },
    hasPermissionForModule(permissions, "feestructure") &&
      hasPermissionForModule(permissions, "admissionfeestructure") &&
      hasPermissionForModule(permissions, "fees") && {
        key: "/fees-module",
        label: "Fees",
        icon: <TbCoinTaka />,
        children: [
          hasPermissionForModule(permissions, "fees") && {
            label: <Link to="/new-fee">New Fee</Link>,
            icon: <RiSecurePaymentLine />,
            key: "/new-fee",
          },
          hasPermissionForModule(permissions, "fees") && {
            label: <Link to="/collect-fee">Collect Fee</Link>,
            icon: <RiSecurePaymentLine />,
            key: "/collect-fee",
          },
          hasPermissionForModule(permissions, "admissionfeestructure") && {
            label: <Link to="/additional-fee">Additional Fee</Link>,
            icon: <HiOutlineCash />,
            key: "/additional-fee",
          },
          hasPermissionForModule(permissions, "feestructure") && {
            label: <Link to="/fees">Configuration</Link>,
            icon: <BiSolidUserAccount />,
            key: "/fees",
          },
        ],
      },

    hasPermissionForModule(permissions, "account") &&
      hasPermissionForModule(permissions, "transaction") && {
        key: "/account",
        label: "Account",
        icon: <MdAccountBalanceWallet />,
        children: [
          hasPermissionForModule(permissions, "account") && {
            label: <Link to="/account">Chart of Account</Link>,
            icon: <BiSolidUserAccount />,
            key: "/account-chart",
          },
          hasPermissionForModule(permissions, "transaction") && {
            label: <Link to="/account/transactions">Account Transaction</Link>,
            icon: <AiOutlineAccountBook />,
            key: "/account/transactions",
          },
          hasPermissionForModule(permissions, "financialentry") && {
            label: <Link to="/account/cash">Cash Management</Link>,
            icon: <AiOutlineAccountBook />,
            key: "/account/cash",
          },
        ],
      },
  ].filter(Boolean);

  const institution = [
    hasPermissionForModule(permissions, "gradelevel") && {
      key: "/classes",
      label: <Link to="/classes">Classes</Link>,
      icon: <SiGoogleclassroom />,
    },
    hasPermissionForModule(permissions, "classsubject") && {
      key: "/subjects",
      label: <Link to="/subjects">Subjects</Link>,
      icon: <IoBookOutline />,
    },
    hasPermissionForModule(permissions, "section") && {
      key: "/section",
      label: <Link to="/section">Section</Link>,
      icon: <TbSection />,
    },

    hasPermissionForModule(permissions, "shift") && {
      key: "/shift",
      label: <Link to="/shift">Shift</Link>,
      icon: <MdFilterTiltShift />,
    },

    hasPermissionForModule(permissions, "account") && {
      key: "/leave",
      label: <Link to="/leave">Leave</Link>,
      icon: <LuCopyleft />,
    },
    hasPermissionForModule(permissions, "routine") && {
      key: "/routine",
      label: <Link to="/routine">Routine</Link>,
      icon: <IoCalendarOutline />,
    },

    hasPermissionForModule(permissions, "exam") &&
      hasPermissionForModule(permissions, "examhall") &&
      hasPermissionForModule(permissions, "examhallreceipt") &&
      hasPermissionForModule(permissions, "exammark") &&
      hasPermissionForModule(permissions, "gradescale") &&
      hasPermissionForModule(permissions, "studentresult") && {
        key: "/exam-module",
        label: "Exam",
        icon: <FiPenTool />,
        children: [
          hasPermissionForModule(permissions, "exam") && {
            key: "/exam",
            label: <Link to="/exam">Exam</Link>,
            icon: <PiExamLight />,
          },

          hasPermissionForModule(permissions, "examhall") && {
            key: "/exam-hall",
            label: <Link to="/exam-hall">Exam Hall</Link>,
            icon: <SiGoogleclassroom />,
          },
          hasPermissionForModule(permissions, "examhallreceipt") && {
            key: "/exam-receipts",
            label: <Link to="/exam-receipts">Assign Exam Hall</Link>,
            icon: <IoReceiptOutline />,
          },
          hasPermissionForModule(permissions, "exammark") && {
            key: "/mark-exam",
            label: <Link to="/mark-exam">Mark Exam</Link>,
            icon: <BsBookmarks />,
          },
          hasPermissionForModule(permissions, "gradescale") && {
            key: "/grade-mark",
            label: <Link to="/grade-mark">Grade Configuration</Link>,
            icon: <BsFileEarmarkDiff />,
          },
          hasPermissionForModule(permissions, "studentresult") && {
            key: "/exam-result",
            label: <Link to="/exam-result">Publish Result</Link>,
            icon: <IoCompassOutline />,
          },
          hasPermissionForModule(permissions, "exam") && {
            key: "/result-migration",
            label: <Link to="/result-migration">Result Migration</Link>,
            icon: <FaMapMarkedAlt />,
          },
        ],
      },
    hasPermissionForModule(permissions, "admission") &&
      hasPermissionForModule(permissions, "admissionsession") && {
        key: "/admission-module",
        label: "Admission",
        icon: <FaRegAddressCard />,
        children: [
          hasPermissionForModule(permissions, "admission") && {
            key: "/admission",
            label: <Link to="/admission">Admission</Link>,
            icon: <IoMdPersonAdd />,
          },

          hasPermissionForModule(permissions, "admissionsession") && {
            key: "/admission-session",
            label: <Link to="/admission-session">Admission Session</Link>,
            icon: <VscGoToEditingSession />,
          },
        ],
      },

    hasPermissionForModule(permissions, "attendance") &&
      hasPermissionForModule(permissions, "employeeattendance") && {
        key: "/attendance",
        label: "Attendance",
        icon: <MdCoPresent />,
        children: [
          hasPermissionForModule(permissions, "attendance") && {
            label: (
              <Link to="/attendance/mark-student-attendance">
                Students Attendance
              </Link>
            ),
            icon: <PiStudent />,
            key: "/attendance/mark-student-attendance",
          },

          hasPermissionForModule(permissions, "employeeattendance") && {
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
  ].filter(Boolean);

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
            items={members.filter(Boolean) as ItemType<MenuItemType>[]}
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
            items={institution.filter(Boolean) as ItemType<MenuItemType>[]}
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
            items={payroll.filter(Boolean) as ItemType<MenuItemType>[]}
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
            items={settings.filter(Boolean) as ItemType<MenuItemType>[]}
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
