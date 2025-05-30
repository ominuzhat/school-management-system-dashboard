"use client";
import { useState } from "react";
import {
  FaFileAlt,
  FaCreditCard,
  FaArrowDown,
  FaArrowUp,
  FaSitemap,
} from "react-icons/fa";
import BasicOverview from "../components/Home/BasicOverview";
import { FeeCollection } from "../components/FinanceTab/CollectFee";
import { PaymentFee } from "../components/FinanceTab/PaymentFee";
import { ExpenseTracking } from "../components/FinanceTab/Expense";
import { AccountTransfer } from "../components/FinanceTab/TransferFee";
import AccountList from "../components/FinanceTab/Account";
import { MdAccountBalanceWallet } from "react-icons/md";

const tabs = [
  // { key: "overview", label: "ওভারভিউ", icon: <FaChartPie /> },
  { key: "fees", label: "Collect Fee", icon: <FaFileAlt /> },
  { key: "payments", label: "Payroll", icon: <FaCreditCard /> },
  { key: "expenses", label: "Cash Management", icon: <FaArrowDown /> },
  { key: "transfers", label: "Transfer", icon: <FaArrowUp /> },
  { key: "account", label: "Account", icon: <MdAccountBalanceWallet /> },
  { key: "ledger", label: "খাতা", icon: <FaSitemap /> },
];

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState("fees");

  return (
    <div>
      {/* <BasicOverview /> */}
      <div className="my-10">
        <div className="bg-white/80 backdrop-blur-md border border-[#A2C3FF] rounded-lg shadow-xl p-2">
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-5 justify-center rounded-xl px-2 py-2 text-md font-medium transition-all duration-200
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
        {activeTab === "overview" && <div>Overview Content</div>}
        {activeTab === "fees" && <FeeCollection />}
        {activeTab === "payments" && <PaymentFee />}
        {activeTab === "expenses" && <ExpenseTracking />}
        {activeTab === "transfers" && <AccountTransfer />}
        {activeTab === "account" && <AccountList />}
        {activeTab === "ledger" && <div>Ledger Reports Content</div>}
      </div>
    </div>
  );
};

export default TabComponent;
