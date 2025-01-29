import { useParams } from "react-router-dom";
import { useGetSinglePayrollQuery } from "../api/payrollEndPoints";

const ViewPayroll = () => {
  const { payrollId } = useParams();
  const { data: singlePayrollData } = useGetSinglePayrollQuery(
    Number(payrollId)
  );

  // Extract data
  const payroll = singlePayrollData?.data || {};

  // Determine if the payroll is for an employee or a teacher
  const isEmployee = !!payroll.employee;
  // const isTeacher = !!payroll.teacher;

  if (!payroll) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Payroll Header */}
      <div className="bg-gradient-to-r from-indigo-800 to-[#B4CAF0] p-8 rounded-lg shadow-xl text-white text-center">
        <h1 className="text-4xl font-bold mb-2">Payroll Details</h1>
        <p className="text-lg">
          Period: {payroll.period_start} to {payroll.period_end}
        </p>
      </div>

      {/* Employee/Teacher Information */}
      <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-indigo-600">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {isEmployee ? "Employee Information" : "Teacher Information"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Full Name:</span>
              <span className="text-gray-800">
                {isEmployee
                  ? `${payroll.employee?.first_name} ${payroll.employee?.last_name}`
                  : `${payroll.teacher?.first_name} ${payroll.teacher?.last_name}`}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Email:</span>
              <span className="text-gray-800">
                {isEmployee ? payroll.employee?.email : payroll.teacher?.email}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Phone:</span>
              <span className="text-gray-800">
                {isEmployee
                  ? payroll.employee?.phone_number
                  : payroll.teacher?.phone_number}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Position:</span>
              <span className="text-gray-800">
                {isEmployee
                  ? payroll.employee?.position
                  : payroll.teacher?.position}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Department:</span>
              <span className="text-gray-800">
                {isEmployee
                  ? payroll.employee?.department?.name
                  : payroll.teacher?.department?.name}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Institution:</span>
              <span className="text-gray-800">
                {isEmployee
                  ? payroll.employee?.user?.role?.institution?.name
                  : payroll.teacher?.user?.role?.institution?.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Breakdown */}
      <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-500">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Salary Breakdown
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Gross Salary:</span>
              <span className="text-gray-800">${payroll.gross_salary}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Net Salary:</span>
              <span className="text-gray-800">${payroll.net_salary}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Paid Amount:</span>
              <span className="text-gray-800">${payroll.paid_Amount}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Due Amount:</span>
              <span className="text-gray-800">${payroll.due_Amount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Allowances */}
      <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-green-500">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Allowances
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries({
            advance_salary: "Advance Salary",
            provident_fund: "Provident Fund",
            mobile_bill: "Mobile Bill",
            feed_allowance: "Feed Allowance",
            performance_bonus: "Performance Bonus",
            festival_bonus: "Festival Bonus",
            travel_allowance: "Travel Allowance",
            health_allowance: "Health Allowance",
            incentive: "Incentive",
            house_rent: "House Rent",
            profit_share: "Profit Share",
            sales_commission: "Sales Commission",
            other_allowance: "Other Allowance",
          })?.map(([key, label]) => (
            <div key={key} className="flex justify-between text-gray-700">
              <span className="font-semibold">{label}:</span>
              <span className="text-gray-800">${payroll[key]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Deductions */}
      <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-red-500">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Deductions
        </h2>
        <div className="space-y-4">
          {payroll?.deductions?.map((deduction: any) => (
            <div
              key={deduction.id}
              className="flex justify-between text-gray-700"
            >
              <span className="font-semibold">{deduction.remarks}:</span>
              <span className="text-gray-800">${deduction.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPayroll;
