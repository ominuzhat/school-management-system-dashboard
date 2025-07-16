"use client";
import { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import PayrollPage from "../../../payroll/pages/PayrollPages";
import PaymentPage from "../../../payment/pages/PaymentPage";
import { GetPermission } from "../../../../../utilities/permission";
import {
  moduleNames,
  actionNames,
} from "../../../../../utilities/permissionConstant";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import NoPermissionData from "../../../../../utilities/NoPermissionData";

export const PaymentFee = () => {
  const tabs = [
    { key: "payroll", label: "Payroll", icon: <FaFileAlt /> },
    { key: "payment", label: "Payroll Payment", icon: <FaCreditCard /> },
  ];

  const [activeTab, setActiveTab] = useState("payroll");

  const { data: dashboardData } = useGetDashboardDataQuery({});

  const viewPayrollPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.payroll,
    actionNames.view
  );
  const createPayrollPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.payroll,
    actionNames.add
  );

  const viewPaymentPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.payment,
    actionNames.view
  );
  const createPaymentPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.payment,
    actionNames.add
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="my-10">
          <div className="bg-white/80 backdrop-blur-md border border-[#A2C3FF] rounded-md shadow-xl ">
            <div className="grid grid-cols-2 lg:grid-cols-2 ">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-5 justify-center  px-2 py-2 text-md font-medium transition-all duration-200
                  ${
                    activeTab === tab.key
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-[#2D3B55] hover:bg-[#E6F0FF]"
                  }
                `}
                >
                  <div className="text-xl mb-1">{tab.icon}</div>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          {activeTab === "payroll" &&
            (viewPayrollPermission && createPayrollPermission ? (
              <PayrollPage />
            ) : (
              <NoPermissionData />
            ))}

          {activeTab === "payment" &&
            (viewPaymentPermission && createPaymentPermission ? (
              <PaymentPage />
            ) : (
              <NoPermissionData />
            ))}

          {/* {activeTab === "payment" && <PaymentPage />} */}

          {/* {activeTab === "payroll" && <PayrollPage />} */}
        </div>
      </div>
    </div>
  );
};
