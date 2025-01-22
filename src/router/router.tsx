import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/page/DashboardLayout";
import ErrorPage from "../common/ErrorPage/ErrorPage";
import Login from "../modules/Auth/page/Login";
import Dashboard from "../modules/Dashboard/page/Dashboard";
import Restaurants from "../modules/Restaurants/page/Restaurants";
import Profile from "../modules/Profile/page/Profile";
import SingleViewRestaurant from "../modules/Restaurants/components/SingleViewRestaurant";
import Accounts from "../modules/Accounts/pages/Accounts";
import AccountList from "../modules/Accounts/components/AccountList/AccountList";
import TransactionsHistory from "../modules/Accounts/components/TransactionsHistory/TransactionsHistory";
import BalanceAdjustment from "../modules/Accounts/components/BalanceAdjustment/BalanceAdjustment";
import BalanceStatus from "../modules/Accounts/components/BalanceStatus/BalanceStatus";
import BalanceTransfer from "../modules/Accounts/components/BalanceTransfer/BalanceTransfer";
import ClientAccount from "../modules/Accounts/components/ClientAccount/ClientAccount";
import SendOTP from "../modules/Auth/components/SendOTP";
import MatchOTP from "../modules/Auth/components/MatchOTP";
import ForgotPassword from "../modules/Auth/components/ForgotPassword";
import Invoice from "../modules/invoice/invoice/pages/Invoice";
import NonCommision from "../modules/invoice/non-commission/pages/NonCommision";
import CommisionAirTicket from "../modules/invoice/commission-air-ticket/pages/CommisionAirTicket";
import AgentPage from "../modules/Agent/pages/AgentPages";
import InvoicePages from "../modules/invoice/invoice/pages/InvoicePages";
import EmployeePage from "../modules/Configuration/Employee/pages/EmployeePages";
import DepartmentPage from "../modules/Configuration/Departments/pages/DepartmentsPage";
import DesignationPage from "../modules/Configuration/Designation/pages/DesignationPage";
import GroupPage from "../modules/Configuration/Group/pages/GroupPage";
import ClientCategoryPage from "../modules/Configuration/ClientCategory/pages/ClientCategoryPages";
import UserPage from "../modules/Configuration/User/Users/pages/UserPages";
import UserRoles from "../modules/Configuration/User/Roles/pages/UserRolePage";
import PayrollPages from "../modules/Payroll/pages/PayrollPages";
import MoneyReceiptPage from "../modules/MoneyReceipt/pages/MoneyReceiptPage";
import CreateMoneyReceipt from "../modules/MoneyReceipt/components/CreateMoneyReceipt";
import ProductPages from "../modules/Product/pages/ProductPages";
import ProductView from "../modules/Product/pages/ProductView";
import CategoryPage from "../modules/Configuration/Category/pages/CategoryPage";
import OrderPages from "../modules/Order/pages/OrderPages";
import ServicePages from "../modules/service/pages/ServicePages";
import SecondLogin from "../modules/Auth/page/SecondLogin";
import Verification from "../modules/Auth/components/Verification";
import StudentsPage from "../modules/members/students/pages/StudentsPage";
import StudentView from "../modules/members/students/components/StudentView";
import ClassesPage from "../modules/general settings/classes/pages/ClassesPage";
import SubjectsPage from "../modules/general settings/subjects/pages/SubjectsPage";
import MarkStudentsAttendance from "../modules/general settings/attendance/mark student attendance/page/MarkStudentsAttendance";
import MarkTeachersAttendance from "../modules/general settings/attendance/mark teacher attendance/page/MarkTeacherAttendancePage";
import InstituteProfile from "../modules/settings/institute profile/page/InstituteProfile";
import PrivateRouter from "./PrivateRouter";
import RolePermissionPage from "../modules/settings/role & permission/page/RolePermissionPage";
import ViewRolePermission from "../modules/settings/role & permission/components/ViewRolePermission";
import TeacherPage from "../modules/members/teachers/pages/TeacherPage";
import TeacherView from "../modules/members/teachers/components/TeacherView";
import FeesPage from "../modules/Finance Management/Fees/fees/page/FeesPage";
import FeesView from "../modules/Finance Management/Fees/fees/components/FeesView";
import AdmissionPage from "../modules/general settings/admission/page/AdmissionPage";
import AdmissionSessionPage from "../modules/general settings/admission session/page/AdmissionSessionPage";
import CreateAdmission from "../modules/general settings/admission/components/CreateAdmission";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRouter children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },

      // students
      {
        path: "/students",
        element: <Accounts />,
        children: [
          {
            path: "/students",
            element: <StudentsPage />,
          },
          {
            path: "student-view/:studentId",
            element: <StudentView />,
          },
        ],
      },
      // employees
      {
        path: "/employees",
        element: <Accounts />,
        children: [
          // {
          //   path: "",
          //   element: <StudentsPage />,
          // },
          // {
          //   path: "product-view/:productId",
          //   element: <ProductView />,
          // },
        ],
      },
      // teacher
      {
        path: "/teacher",
        element: <Accounts />,
        children: [
          {
            path: "",
            element: <TeacherPage />,
          },
          {
            path: "teacher-view/:teacherId",
            element: <TeacherView />,
          },
        ],
      },
      // classes
      {
        path: "/classes",
        element: <Accounts />,
        children: [
          {
            path: "/classes",
            element: <ClassesPage />,
          },
        ],
      },
      // subjects
      {
        path: "/subjects",
        element: <Accounts />,
        children: [
          {
            path: "/subjects",
            element: <SubjectsPage />,
          },
        ],
      },
      // admission
      {
        path: "/admission",
        element: <Accounts />,
        children: [
          {
            path: "",
            element: <AdmissionPage />,
          },
          {
            path: "/admission/create-admission",
            element: <CreateAdmission />,
          },
        ],
      },
      // admission session
      {
        path: "/admission-session",
        element: <Accounts />,
        children: [
          {
            path: "",
            element: <AdmissionSessionPage />,
          },
        ],
      },

      // Fees
      {
        path: "/fees",
        element: <Accounts />,
        children: [
          {
            path: "",
            element: <FeesPage />,
          },

          {
            path: "fees-view/:feesId",
            element: <FeesView />,
          },
        ],
      },
      // attendance
      {
        path: "/attendance",
        element: <Accounts />,
        children: [
          {
            path: "mark-student-attendance",
            element: <MarkStudentsAttendance />,
          },
          {
            path: "mark-teacher-attendance",
            element: <MarkTeachersAttendance />,
          },
        ],
      },
      // institution profile
      {
        path: "/institute-profile",
        element: <Accounts />,
        children: [
          {
            path: "/institute-profile",
            element: <InstituteProfile />,
          },
          {
            path: "mark-teacher-attendance",
            element: <MarkTeachersAttendance />,
          },
        ],
      },
      // Role & permissions
      {
        path: "/role-permission",
        element: <Accounts />,
        children: [
          {
            path: "",
            element: <RolePermissionPage />,
          },
          {
            path: ":roleId",
            element: <ViewRolePermission />,
          },
        ],
      },

      // new for education
      {
        path: "/moneyreceipt",
        element: <Accounts />,
        children: [
          {
            path: "add",
            element: <CreateMoneyReceipt />,
          },
          {
            path: "",
            element: <MoneyReceiptPage />,
          },
        ],
      },

      {
        path: "/invoice",
        element: <Invoice />,
        children: [
          {
            path: "commission-air-ticket",
            element: <CommisionAirTicket />,
          },
          {
            path: "non-commission-air-ticket",
            element: <NonCommision />,
          },
        ],
      },
      {
        path: "/view-invoice",
        element: <InvoicePages />,
        children: [
          {
            path: "commission-air-ticket",
            element: <CommisionAirTicket />,
          },
          {
            path: "non-commission-air-ticket",
            element: <NonCommision />,
          },
        ],
      },

      {
        path: "/product",
        element: <Accounts />,
        children: [
          {
            path: "/product",
            element: <ProductPages />,
          },
          {
            path: "product-view/:productId",
            element: <ProductView />,
          },
        ],
      },
      {
        path: "/order",
        element: <Accounts />,
        children: [
          {
            path: "/order",
            element: <OrderPages />,
          },
          {
            path: "product-view/:productId",
            element: <ProductView />,
          },
        ],
      },
      {
        path: "/service",
        element: <Accounts />,
        children: [
          {
            path: "/service",
            element: <ServicePages />,
          },
          {
            path: "product-view/:productId",
            element: <ProductView />,
          },
        ],
      },

      {
        path: "/category",
        element: <CategoryPage />,
      },

      {
        path: "/employee",
        element: <EmployeePage />,
      },
      {
        path: "/department",
        element: <DepartmentPage />,
      },
      {
        path: "/designation",
        element: <DesignationPage />,
      },
      {
        path: "/group",
        element: <GroupPage />,
      },
      {
        path: "/payroll",
        element: <PayrollPages />,
      },
      {
        path: "/client-category",
        element: <ClientCategoryPage />,
      },
      {
        path: "/user/view",
        element: <UserPage />,
      },
      {
        path: "/role/view",
        element: <UserRoles />,
      },
      {
        path: "/agent",
        element: <AgentPage />,
      },
      {
        path: "/accounts",
        element: <Accounts />,
        children: [
          {
            path: "account-list",
            element: <AccountList />,
          },
          {
            path: "transactions-history",
            element: <TransactionsHistory />,
          },
          {
            path: "balance-adjustment",
            element: <BalanceAdjustment />,
          },
          {
            path: "balance-status",
            element: <BalanceStatus />,
          },
          {
            path: "balance-transfer",
            element: <BalanceTransfer />,
          },
          {
            path: "client-account",
            element: <ClientAccount />,
          },
        ],
      },
      {
        path: "restaurants",
        element: <Restaurants />,
        children: [
          {
            path: ":id",
            element: <SingleViewRestaurant />,
          },
        ],
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login-second",
    element: <Login />,
  },
  {
    path: "/login",
    element: <SecondLogin />,
  },
  {
    path: "/verification",
    element: <Verification />,
  },
  {
    path: "/send-otp",
    element: <SendOTP />,
  },
  {
    path: "/match-otp",
    element: <MatchOTP />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

export default router;
