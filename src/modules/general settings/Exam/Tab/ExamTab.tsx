import { useState } from "react";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { FaMoneyBillTransfer, FaUserTie } from "react-icons/fa6";
import ExamPage from "../page/ExamPage";
import MarkExamPage from "../mark-exam/page/MarkExamPage";
import ExamHallTab from "./ExamHallTab";
import { IoReceiptOutline } from "react-icons/io5";

const ExamTab = () => {
  const tabs = [
    {
      key: "exam",
      label: "Exam",
      icon: <FaMoneyBillTransfer />,
    },
    { key: "mark_exam", label: "Mark Exam", icon: <FaUserTie /> },
    { key: "invoice", label: "Invoice", icon: <LiaFileInvoiceSolid /> },
    { key: "hall", label: "Hall", icon: <IoReceiptOutline /> },
  ];

  const [activeTab, setActiveTab] = useState("exam");

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
          {activeTab === "exam" && <ExamPage />}
          {activeTab === "hall" && <ExamHallTab />}
          {activeTab === "mark_exam" && <MarkExamPage />}
          {activeTab === "invoice" && "<InvoiceEntryPage />"}
        </div>
      </div>
    </div>
  );
};
export default ExamTab;
