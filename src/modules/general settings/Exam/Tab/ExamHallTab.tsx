import { useState } from "react";
import ExamHallPage from "../Exam-hall/page/ExamHall";
import ExamReceiptsPage from "../Exam-receipt/page/ExamReceiptsPage";
import { SiGoogleclassroom } from "react-icons/si";
import { IoReceiptOutline } from "react-icons/io5";
const ExamHallTab = () => {
  const tabs = [
    { key: "hall", label: "Exam Hall", icon: <SiGoogleclassroom /> },
    {
      key: "assign_hall",
      label: "Assign Exam Hall",
      icon: <IoReceiptOutline />,
    },
  ];

  const [activeTab, setActiveTab] = useState("hall");

  return (
    <div className="space-y-6">
      <div>
        <div className="my-10">
          <div className="bg-white/80 backdrop-blur-md border border-[#A2C3FF] rounded-2xl shadow-xl ">
            <div className="grid grid-cols-2 lg:grid-cols-2">
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
          {activeTab === "hall" && <ExamHallPage />}
          {activeTab === "assign_hall" && <ExamReceiptsPage />}
        </div>
      </div>
    </div>
  );
};
export default ExamHallTab;
