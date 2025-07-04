import { useState } from "react";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import ExamPage from "../page/ExamPage";
import ExamHallTab from "./ExamHallTab";
import { IoReceiptOutline } from "react-icons/io5";
import GradeMarkPage from "../Grade/pages/GradeMark";
import ResultMigrationPage from "../Result Migration/pages/ResultMigration";
import MarkExamTab from "./MarkExamTab";
import { BsBookmarks } from "react-icons/bs";
import { FaMapMarkedAlt } from "react-icons/fa";
import { PiExamLight } from "react-icons/pi";

const ExamTab = () => {
  const tabs = [
    {
      key: "exam",
      label: "Exam",
      icon: <PiExamLight />,
    },
    { key: "mark_exam", label: "Mark Exam", icon: <BsBookmarks /> },
    {
      key: "result_migration",
      label: "Result Migration",
      icon: <FaMapMarkedAlt />,
    },
    {
      key: "grade_config",
      label: "Grade Configuration",
      icon: <LiaFileInvoiceSolid />,
    },
    { key: "hall", label: "Hall", icon: <IoReceiptOutline /> },
  ];

  const [activeTab, setActiveTab] = useState("exam");

  return (
    <div className="space-y-6">
      <div>
        <div className="my-10">
          <div className="bg-white/80 backdrop-blur-md border border-[#A2C3FF] rounded-2xl shadow-xl ">
            <div className="grid grid-cols-3 lg:grid-cols-5">
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
          {activeTab === "mark_exam" && <MarkExamTab />}
          {activeTab === "result_migration" && <ResultMigrationPage />}
          {activeTab === "grade_config" && <GradeMarkPage />}
        </div>
      </div>
    </div>
  );
};
export default ExamTab;
