"use client";
import { useState } from "react";
import {
  FaFileAlt,
  FaCreditCard,
  FaArrowDown,
  FaArrowUp,
  FaChartPie,
  FaSitemap,
} from "react-icons/fa";
import BasicOverview from "../components/Home/BasicOverview";
import { FeeCollection } from "../components/FinanceTab/CollectFee";

const tabs = [
  { key: "overview", label: "ওভারভিউ", icon: <FaChartPie /> },
  { key: "fees", label: "ফি সংগ্রহ", icon: <FaFileAlt /> },
  { key: "payments", label: "পেমেন্ট", icon: <FaCreditCard /> },
  { key: "expenses", label: "খরচ", icon: <FaArrowDown /> },
  { key: "transfers", label: "ট্রান্সফার", icon: <FaArrowUp /> },
  { key: "ledger", label: "খাতা", icon: <FaSitemap /> },
];

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState("fees");

  return (
    <>
      <BasicOverview />
      <div className="">
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

        <div className="mt-6">
          {activeTab === "overview" && <div>Overview Content</div>}
          {activeTab === "fees" && <FeeCollection />}
          {activeTab === "payments" && <div>Payment Management Content</div>}
          {activeTab === "expenses" && <div>Expense Tracking Content</div>}
          {activeTab === "transfers" && <div>Account Transfer Content</div>}
          {activeTab === "ledger" && <div>Ledger Reports Content</div>}
        </div>
      </div>
    </>
  );
};

export default TabComponent;
