import { useState } from "react";
import OverViewPage from "../overview/pages/OverViewPage";
import LeavePage from "../../Leave/page/LeavePage";
import MarkStudentsAttendance from "../mark student attendance/page/MarkStudentsAttendance";
import MarkTeachersAttendance from "../mark teacher attendance/page/MarkTeacherAttendancePage";
import { IoPeopleOutline } from "react-icons/io5";
import { PiStudent } from "react-icons/pi";

const StudentEmployeeAttendanceTab = () => {
  const tabs = [
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
  ];

  const [activeTab, setActiveTab] = useState("student");

  return (
    <div className="space-y-6">
      <div className="my-10">
        <div className="bg-white/80 backdrop-blur-md border border-[#A2C3FF] rounded-2xl shadow-xl">
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
        {activeTab === "overview" && <OverViewPage />}
        {activeTab === "leave" && <LeavePage />}
        {activeTab === "student" && <MarkStudentsAttendance />}
        {activeTab === "employee" && <MarkTeachersAttendance />}
      </div>
    </div>
  );
};

export default StudentEmployeeAttendanceTab;
