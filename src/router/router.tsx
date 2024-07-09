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
        path: "/client",
        element: <ClientPage />,
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
