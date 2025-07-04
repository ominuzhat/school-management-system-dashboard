import { useParams } from "react-router-dom";
import { useGetSinglePaymentQuery } from "../api/paymentEndPoints";
import dayjs from "dayjs";
import { capitalize } from "../../../../common/capitalize/Capitalize";

const ViewPayment = () => {
  const { paymentId } = useParams();
  const { data: singleData, isLoading } = useGetSinglePaymentQuery(
    Number(paymentId)
  );

  // Extract payment data
  const payment = singleData?.data || {};

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Payment data not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Payment Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-8 rounded-lg shadow-xl text-white text-center">
        <h1 className="text-4xl font-bold mb-2">Payroll Payment Details</h1>
        <p className="text-lg">
          Payment ID: <span className="font-semibold">{payment.id}</span>
        </p>
      </div>
      {/* Employee or Teacher Information */}
      <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-purple-500">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {payment?.teacher ? "Teacher Information" : "Employee Information"}
        </h2>
        <div className="space-y-4">
          {payment?.payroll?.teacher ? (
            <>
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Name:</span>
                <span className="text-gray-800">
                  {payment?.payroll?.teacher?.first_name}{" "}
                  {payment?.payroll?.teacher?.last_name}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Subject:</span>
                <span className="text-gray-800">
                  {payment?.payroll?.teacher?.subject}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Hire Date:</span>
                <span className="text-gray-800">
                  {payment?.payroll?.teacher?.hire_date}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Name:</span>
                <span className="text-gray-800">
                  {payment?.payroll?.employee?.first_name}{" "}
                  {payment?.payroll?.employee?.last_name}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Position:</span>
                <span className="text-gray-800">
                  {payment?.payroll?.employee?.position}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Department:</span>
                <span className="text-gray-800">
                  {payment?.payroll?.employee?.department.name}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Base Salary:</span>
                <span className="text-gray-800">
                  ৳{payment?.payroll?.employee?.base_salary}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Payment Information */}
      <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-indigo-600">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Payment Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Payment Date:</span>
              <span className="text-gray-800">{payment.payment_date}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Amount Paid:</span>
              <span className="text-gray-800">৳{payment.amount_paid}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Payment Method:</span>
              <span className="text-gray-800">{payment.payment_method}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Status:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  payment?.payroll?.status === "paid"
                    ? "bg-green-100 text-green-700"
                    : payment.status === "partial"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {capitalize(payment?.payroll?.status)}
              </span>
            </div>

            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Transaction ID:</span>
              <span className="text-gray-800">{payment.transaction_id}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Reference Number:</span>
              <span className="text-gray-800">{payment.reference_number}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Payroll */}
      {payment.payroll && (
        <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-500">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Related Payroll
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Payroll ID:</span>
                <span className="text-gray-800">{payment.payroll.id}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Period:</span>
                <span className="text-gray-800">
                  {dayjs(payment.payroll.period_start).format("DD MMM YYYY")} to{" "}
                  {dayjs(payment.payroll.period_end).format("DD MMM YYYY")}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Gross Salary:</span>
                <span className="text-gray-800">
                  ৳{payment.payroll.gross_salary}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Net Salary:</span>
                <span className="text-gray-800">
                  ৳{payment.payroll.net_salary}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Paid Amount:</span>
                <span className="text-gray-800">
                  ৳{payment.payroll.paid_Amount}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Due Amount:</span>
                <span className="text-gray-800">
                  ৳{payment.payroll.due_Amount}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deductions Section */}
      {payment.payroll?.deductions && (
        <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-red-500">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Deductions
          </h2>
          <div className="space-y-4">
            {payment.payroll.deductions.map((deduction: any) => (
              <div
                key={deduction.id}
                className="flex justify-between text-gray-700"
              >
                <span className="font-semibold">{deduction.remarks}:</span>
                <span className="text-gray-800">৳{deduction.amount}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPayment;
