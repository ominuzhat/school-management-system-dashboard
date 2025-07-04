import { useState } from "react";
import { IoCompassOutline } from "react-icons/io5";
import MarkExamPage from "../mark-exam/page/MarkExamPage";
import ResultsPage from "../Result/pages/ResultsPage";
import { BsBookmarks } from "react-icons/bs";

const MarkExamTab = () => {
  const tabs = [
    { key: "mark_exam", label: "Mark Exam", icon: <BsBookmarks /> },
    {
      key: "publish_result",
      label: "Publish Result",
      icon: <IoCompassOutline />,
    },
  ];

  const [activeTab, setActiveTab] = useState("mark_exam");

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
          {activeTab === "mark_exam" && <MarkExamPage />}
          {activeTab === "publish_result" && <ResultsPage />}
        </div>
      </div>
    </div>
  );
};
export default MarkExamTab;
