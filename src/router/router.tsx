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
import PassportManagement from "../modules/PassportMangement/page/PassportManagement";
import CreatePassportManagement from "../modules/PassportMangement/components/CreatePassportManagement";
import ViewPassportManagement from "../modules/PassportMangement/components/ViewPassportManagement";
import Invoice from "../modules/invoice/invoice/pages/Invoice";
import NonCommision from "../modules/invoice/non-commission/pages/NonCommision";
import ClientPage from "../modules/Client/pages/ClientPage";
import CommisionAirTicket from "../modules/invoice/commission-air-ticket/pages/CommisionAirTicket";
import AgentPage from "../modules/Agent/pages/AgentPages";
import InvoicePages from "../modules/invoice/invoice/pages/InvoicePages";
import ExpenseHeadPage from "../modules/Expense/pages/ExpenseHeadPage";
import ExpenseListPage from "../modules/Expense/pages/ExpenseList";
import CreateExpense from "../modules/Expense/components/CreateExpense";
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
import ClientViewPage from "../modules/Client/pages/ClientViewPage";
import ClientInvoice from "../modules/Client/component/ClientInvoice";
import ClientDetails from "../modules/Client/component/ClientDetails";
import ClientPayment from "../modules/Client/component/ClientPayment";
import ClientQuotation from "../modules/Client/component/ClientQuotation";
import ClientRefundProduct from "../modules/Client/component/ClientRefundProduct";
import ClientListOfUploadPassport from "../modules/Client/component/ClientListOfUploadPassport";
import CartPages from "../modules/Cart/pages/CartPages";
import ProductPages from "../modules/Product/pages/ProductPages";
import ProductView from "../modules/Product/pages/ProductView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    // element: <PrivateRouter children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
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
          {
            path: "passport-view/1",
            element: <ViewPassportManagement />,
          },
        ],
      },
      {
        path: "/passport",
        element: <Accounts />,
        children: [
          {
            path: "create-passport",
            element: <CreatePassportManagement />,
          },
          {
            path: "passport-list",
            element: <PassportManagement />,
          },
          {
            path: "passport-view/1",
            element: <ViewPassportManagement />,
          },
        ],
      },
      {
        path: "/expense",
        element: <Accounts />,
        children: [
          {
            path: "head",
            element: <ExpenseHeadPage />,
          },
          {
            path: "list",
            element: <ExpenseListPage />,
          },
          {
            path: "create-expense",
            element: <CreateExpense />,
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
          {
            path: "passport-list",
            element: <PassportManagement />,
          },
          {
            path: "passport-view/1",
            element: <ViewPassportManagement />,
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
          {
            path: "passport-list",
            element: <PassportManagement />,
          },
          {
            path: "passport-view/1",
            element: <ViewPassportManagement />,
          },
        ],
      },
      {
        path: "/",
        element: <Accounts />,
        children: [
          {
            path: "client",
            element: <ClientPage />,
          },
          {
            path: "client/1",
            element: <ClientViewPage />,
            children: [
              {
                path: "details",
                element: <ClientDetails />,
              },
              {
                path: "invoice",
                element: <ClientInvoice />,
              },
              {
                path: "payments",
                element: <ClientPayment />,
              },
              {
                path: "quotation",
                element: <ClientQuotation />,
              },
              {
                path: "refund-product",
                element: <ClientRefundProduct />,
              },
              {
                path: "list-of-upload-passports",
                element: <ClientListOfUploadPassport />,
              },
            ],
          },
        ],
      },

      {
        path: "/product",
        element: <Accounts />,
        children: [
          {
            path: "create-passport",
            element: <CreatePassportManagement />,
          },
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
        path: "/cart",
        element: <CartPages />,
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
    path: "/login",
    element: <Login />,
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
