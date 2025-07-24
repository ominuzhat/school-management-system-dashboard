import { useState } from "react";
import { BsCash } from "react-icons/bs";
import { CiMobile3 } from "react-icons/ci";
import {
  MdAccountBalance,
  MdAccountBalanceWallet,
  MdOutlineWorkHistory,
} from "react-icons/md";
import MfsPage from "../../../Accounts/account/pages/MfsPage";
import AccountPage from "../../../Accounts/account/pages/AccountPages";
import BankPage from "../../../Accounts/account/pages/BankPage";
import ShurjoPayPage from "../../../Accounts/account/pages/ShurjoPayPage";
import { PiHandDeposit } from "react-icons/pi";
import ApprovalPage from "../../../Accounts/account/pages/ApprovalPage";
import { SiTicktick } from "react-icons/si";
import CollectionPage from "../../../Accounts/account/pages/CollectionPage";
import CashPage from "../../../Accounts/account/pages/CashPage";

const AccountTab = () => {
  const tabs = [
    { key: "account", label: "Account", icon: <MdAccountBalanceWallet /> },
    { key: "bank", label: "Bank", icon: <MdAccountBalance /> },
    { key: "mfs", label: "MFS", icon: <CiMobile3 /> },
    { key: "cash", label: "Cash", icon: <BsCash /> },
    { key: "surjopay", label: "ShurjoPay", icon: <PiHandDeposit /> },
    {
      key: "collection",
      label: "Staff Ledger",
      icon: <MdOutlineWorkHistory />,
    },
    { key: "approval", label: "Approval", icon: <SiTicktick /> },
  ];

  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="space-y-6">
      {/* Fee Collection Summary - Responsive Grid */}
      <div>
        <div className="my-10">
          <div className="bg-white/80 backdrop-blur-md border border-[#A2C3FF] rounded-2xl shadow-xl ">
            <div className="grid grid-cols-3 lg:grid-cols-7">
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
          {activeTab === "account" && <AccountPage />}
          {activeTab === "bank" && <BankPage />}
          {activeTab === "cash" && <CashPage />}
          {activeTab === "surjopay" && <ShurjoPayPage />}
          {activeTab === "mfs" && <MfsPage />}
          {activeTab === "collection" && <CollectionPage />}
          {activeTab === "approval" && <ApprovalPage />}
        </div>
      </div>
    </div>
  );
};

export default AccountTab;
