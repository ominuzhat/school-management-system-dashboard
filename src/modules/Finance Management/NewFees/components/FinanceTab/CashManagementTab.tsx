import { useState } from "react";
import { ExpenseTracking } from "./Expense";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import {
  FaMoneyBillTransfer,
  FaMoneyBillTrendUp,
  FaUserTie,
} from "react-icons/fa6";
import VendorPage from "../../../Accounts/cash management/Vendor/page/VendorPage";
import VendorEntryPage from "../../../Accounts/cash management/Vendor Entry/pages/VendorEntryPag";
import InvoiceEntryPage from "../../../Accounts/cash management/Invoice Entry/pages/InvoiceEntryPage";

const CashManagementTab = () => {
  const tabs = [
    {
      key: "expense",
      label: "Income & Expense",
      icon: <FaMoneyBillTransfer />,
    },
    { key: "payment", label: "Vendor Payment", icon: <FaMoneyBillTrendUp /> },
    { key: "vendor", label: "Vendor", icon: <FaUserTie /> },
    { key: "invoice", label: "Invoice", icon: <LiaFileInvoiceSolid /> },
  ];

  const [activeTab, setActiveTab] = useState("expense");

  return (
    <div className="space-y-6">
      <div>
        <div className="my-10">
          <div className="bg-white/80 backdrop-blur-md border border-[#A2C3FF] rounded-2xl shadow-xl ">
            <div className="grid grid-cols-3 lg:grid-cols-4">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-5 justify-center px-2 py-2 text-md font-medium transition-all duration-200 rounded-2xl
                  ${
                    activeTab === tab.key
                      ? " bg-[#60B5FF] text-white shadow-md"
                      : "text-[#2D3B55] hover:bg-[#60b5ff23]"
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
          {activeTab === "expense" && <ExpenseTracking />}
          {activeTab === "vendor" && <VendorPage />}
          {activeTab === "payment" && <VendorEntryPage />}
          {activeTab === "invoice" && <InvoiceEntryPage />}
        </div>
      </div>
    </div>
  );
};
export default CashManagementTab;
