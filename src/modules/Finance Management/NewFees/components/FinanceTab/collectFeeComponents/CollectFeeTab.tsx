import { useState } from "react";
import { FeeCollection } from "../CollectFee";
import { GrConfigure } from "react-icons/gr";
import { TbFileInvoice } from "react-icons/tb";
import { FaMoneyBillWave } from "react-icons/fa6";
import FeesPage from "../../../../Fees/fees/page/FeesPage";
import InvoicePage from "../../../invoice/page/InvoicePage";

const CollectFeeTab = () => {
  const tabs = [
    { key: "collect_fee", label: "Collect Fee", icon: <FaMoneyBillWave /> },
    { key: "invoice", label: "Money Receipt", icon: <TbFileInvoice /> },
    { key: "config", label: "Configuration", icon: <GrConfigure /> },
  ];

  const [activeTab, setActiveTab] = useState("collect_fee");

  return (
    <div className="space-y-6">
      <div className="my-10">
        <div className="bg-white/80 backdrop-blur-md border border-[#A2C3FF] rounded-2xl shadow-xl ">
          <div className="grid grid-cols-3 lg:grid-cols-3 ">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-5 justify-center  px-2 py-2 text-md font-medium transition-all duration-200 rounded-2xl
                  ${
                    activeTab === tab.key
                      ? "bg-[#60B5FF] text-white shadow-md"
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
        {activeTab === "collect_fee" && <FeeCollection />}
        {activeTab === "invoice" && <InvoicePage />}
        {activeTab === "config" && <FeesPage />}
      </div>
    </div>
  );
};

export default CollectFeeTab;
