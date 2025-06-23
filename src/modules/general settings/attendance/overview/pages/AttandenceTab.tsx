import { useState } from "react";
import OverViewPage from "./OverViewPage";
import LeavePage from "../../../Leave/page/LeavePage";
import MarkStudentsAttendance from "../../mark student attendance/page/MarkStudentsAttendance";
import MarkTeachersAttendance from "../../mark teacher attendance/page/MarkTeacherAttendancePage";
import { LuCopyleft } from "react-icons/lu";
import { IoPeopleOutline } from "react-icons/io5";
import { PiStudent } from "react-icons/pi";
import { GrOverview } from "react-icons/gr";

const AttendanceTab = () => {
  const tabs = [
    { key: "overview", label: "Overview", icon: <GrOverview /> },
    {
      key: "student",
      label: "Student Attendance",
      icon: <PiStudent />,
    },
    {
      key: "employee",
      label: "Employee Attendance",
      icon: <IoPeopleOutline />,
    },
    { key: "leave", label: "Leave", icon: <LuCopyleft /> },
  
  ];

  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div>
        <div className="my-10">
          <div className="bg-white/80 backdrop-blur-md border border-[#A2C3FF] rounded-2xl shadow-xl">
            <div className="grid grid-cols-4 lg:grid-cols-4">
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
          {activeTab === "overview" && <OverViewPage />}
          {activeTab === "leave" && <LeavePage />}
          {activeTab === "student" && <MarkStudentsAttendance />}
          {activeTab === "employee" && <MarkTeachersAttendance />}
        </div>
      </div>
    </div>
  );
};

export default AttendanceTab;
