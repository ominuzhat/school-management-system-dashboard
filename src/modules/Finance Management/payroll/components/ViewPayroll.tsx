import { useParams } from "react-router-dom";
import { useGetSinglePayrollQuery } from "../api/payrollEndPoints";

const ViewPayroll = () => {
  const { payrollId } = useParams();
  const { data: singlePayrollData } = useGetSinglePayrollQuery(
    Number(payrollId)
  );

  // Extract data
  const payroll = singlePayrollData?.data || {};

  if (!payroll) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-8 bg-gray-50">
      {/* Payroll Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-8 rounded-lg shadow-xl text-white">
        <h1 className="text-4xl font-bold">Payroll Details</h1>
        <p className="text-lg">
          Period: {payroll.period_start} to {payroll.period_end}
        </p>
      </div>

      {/* Employee Information */}
      <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-indigo-600">
        <h2 className="text-2xl font-semibold text-gray-800">
          Employee Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Full Name:</span>
              <span className="text-gray-800">
                {payroll.employee.first_name} {payroll.employee.last_name}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Email:</span>
              <span className="text-gray-800">{payroll.employee.email}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Phone:</span>
              <span className="text-gray-800">
                {payroll.employee.phone_number}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Position:</span>
              <span className="text-gray-800">{payroll.employee.position}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Department:</span>
              <span className="text-gray-800">
                {payroll.employee.department.name}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Institution:</span>
              <span className="text-gray-800">
                {payroll.employee.user.role.institution.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Breakdown */}
      <div className="bg-indigo-100 p-6 rounded-lg shadow-lg border-t-4 border-indigo-600">
        <h2 className="text-2xl font-semibold text-gray-800">
          Salary Breakdown
        </h2>
        <div className="space-y-4 mt-6">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Gross Salary:</span>
            <span className="text-gray-800">${payroll.gross_salary}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Net Salary:</span>
            <span className="text-gray-800">${payroll.net_salary}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Paid Amount:</span>
            <span className="text-gray-800">${payroll.paid_Amount}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Due Amount:</span>
            <span className="text-gray-800">${payroll.due_Amount}</span>
          </div>
        </div>
      </div>

      {/* Allowances */}
      <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-500">
        <h2 className="text-2xl font-semibold text-gray-800">Allowances</h2>
        <div className="space-y-4 mt-6">
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
          }).map(([key, label]) => (
            <div key={key} className="flex justify-between text-gray-700">
              <span className="font-medium">{label}:</span>
              <span className="text-gray-800">${payroll[key]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Deductions */}
      <div className="bg-indigo-50 p-6 rounded-lg shadow-lg border-t-4 border-red-500">
        <h2 className="text-2xl font-semibold text-gray-800">Deductions</h2>
        <div className="space-y-4 mt-6">
          {payroll.deductions.map((deduction: any) => (
            <div
              key={deduction.id}
              className="flex justify-between text-gray-700"
            >
              <span className="font-medium">{deduction.remarks}:</span>
              <span className="text-gray-800">${deduction.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPayroll;
