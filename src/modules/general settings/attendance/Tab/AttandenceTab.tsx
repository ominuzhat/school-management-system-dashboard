import { useState } from "react";
import OverViewPage from "../overview/pages/OverViewPage";
import LeavePage from "../../Leave/page/LeavePage";

import { LuCopyleft } from "react-icons/lu";
import { PiStudent } from "react-icons/pi";
import { GrOverview } from "react-icons/gr";
import StudentEmployeeAttendanceTab from "./StudentEmployeeAttendanceTab";
import { HiOutlineDocumentReport } from "react-icons/hi";
import BigShiftPage from "../../shift/page/BigShiftPage";
import AttendanceReportPage from "../attendance report/page/AttendanceReportPage";
import { AiTwotoneSchedule } from "react-icons/ai";
import { MdOutlineFilterTiltShift } from "react-icons/md";
import SchedulePage from "../Schedule/page/SchedulePage";

const AttendanceTab = () => {
  const tabs = [
    { key: "overview", label: "Overview", icon: <GrOverview /> },
    {
      key: "attendance",
      label: "Logs",
      icon: <PiStudent />,
    },

    { key: "report", label: "Report", icon: <HiOutlineDocumentReport /> },
    { key: "schedule", label: "Schedule", icon: <AiTwotoneSchedule /> },
    { key: "leave", label: "Leave", icon: <LuCopyleft /> },
    { key: "shift", label: "Shift", icon: <MdOutlineFilterTiltShift /> },
  ];

  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="my-10">
        <div className="bg-white/80 backdrop-blur-md border border-[#A2C3FF] rounded-2xl shadow-xl">
          <div className="grid grid-cols-6 lg:grid-cols-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-5 justify-center px-2 py-2 text-md font-medium transition-all duration-200 rounded-2xl
                  ${
                    activeTab === tab.key
                      ? "bg-blue-600 text-white shadow-md"
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
        {activeTab === "overview" && <OverViewPage />}
        {activeTab === "leave" && <LeavePage />}
        {activeTab === "attendance" && <StudentEmployeeAttendanceTab />}
        {activeTab === "shift" && <BigShiftPage />}
        {activeTab === "report" && <AttendanceReportPage />}
        {activeTab === "schedule" && <SchedulePage />}
      </div>
    </div>
  );
};

export default AttendanceTab;
