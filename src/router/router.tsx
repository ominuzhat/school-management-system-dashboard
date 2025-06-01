import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/page/DashboardLayout";
import ErrorPage from "../common/ErrorPage/ErrorPage";
import Login from "../modules/Auth/page/Login";
import Dashboard from "../modules/Dashboard/page/Dashboard";
import Profile from "../modules/Profile/page/Profile";
import Accounts from "../modules/Accounts/pages/Accounts";
import BalanceStatus from "../modules/Accounts/components/BalanceStatus/BalanceStatus";
import ClientAccount from "../modules/Accounts/components/ClientAccount/ClientAccount";
import SendOTP from "../modules/Auth/components/SendOTP";
import MatchOTP from "../modules/Auth/components/MatchOTP";
import ForgotPassword from "../modules/Auth/components/ForgotPassword";
import SecondLogin from "../modules/Auth/page/SecondLogin";
import Verification from "../modules/Auth/components/Verification";
import StudentsPage from "../modules/members/students/pages/StudentsPage";
import StudentView from "../modules/members/students/components/StudentView";
import ClassesPage from "../modules/general settings/classes/pages/ClassesPage";
import SubjectsPage from "../modules/general settings/subjects/pages/SubjectsPage";
import MarkStudentsAttendance from "../modules/general settings/attendance/mark student attendance/page/MarkStudentsAttendance";
import MarkTeachersAttendance from "../modules/general settings/attendance/mark teacher attendance/page/MarkTeacherAttendancePage";
import InstituteProfile from "../modules/settings/institute profile/page/InstituteProfile";
import PrivateRouter from "./PrivateRouter";
import RolePermissionPage from "../modules/settings/role & permission/page/RolePermissionPage";
import ViewRolePermission from "../modules/settings/role & permission/components/ViewRolePermission";
import TeacherPage from "../modules/members/teachers/pages/TeacherPage";
import TeacherView from "../modules/members/teachers/components/TeacherView";
import FeesPage from "../modules/Finance Management/Fees/fees/page/FeesPage";
import FeesView from "../modules/Finance Management/Fees/fees/components/FeesView";
import AdmissionPage from "../modules/general settings/admission/page/AdmissionPage";
import AdmissionSessionPage from "../modules/general settings/admission session/page/AdmissionSessionPage";
import CreateAdmission from "../modules/general settings/admission/components/CreateAdmission";
import AdmissionView from "../modules/general settings/admission/components/AdmissionView";
import UpdateAdmission from "../modules/general settings/admission/components/UpdateAdmission";
import ViewStudentsAttendanceList from "../modules/general settings/attendance/mark student attendance/components/ViewStudentsAttendanceList";
import DepartmentPage from "../modules/general settings/Department/page/DepartmentPage";
import EmployeePage from "../modules/members/employees/pages/EmployeePage";
import ViewSingleStudentsAttendanceList from "../modules/general settings/attendance/mark student attendance/components/ViewSingleStudentsAttendanceList";
import SingleViewEmployee from "../modules/members/employees/components/SingleViewEmployee";
import PayrollPage from "../modules/Finance Management/payroll/pages/PayrollPages";
import ViewPayroll from "../modules/Finance Management/payroll/components/ViewPayroll";
import PaymentPage from "../modules/Finance Management/payment/pages/PaymentPage";
import ViewPayment from "../modules/Finance Management/payment/components/ViewPayment";
import TuitionFeePaymentPage from "../modules/Finance Management/Tuition payment/pages/TuitionFeePaymentPage";
import ViewEmployeeAttendanceList from "../modules/general settings/attendance/mark teacher attendance/components/ViewEmployeeAttendanceList";
import ViewSingleEmployeeAttendance from "../modules/general settings/attendance/mark teacher attendance/components/ViewSingleEmployeeAttandance";
import AdditionalFeesPage from "../modules/Finance Management/Fees/Additional Fee/page/AdditionalFeesPage";
import CollectFeePage from "../modules/Finance Management/Fees/Collect Fee/page/CollectFeePage";
import CreateCollectFee from "../modules/Finance Management/Fees/Collect Fee/components/CreateCollectFee";
import UpdateCollectFee from "../modules/Finance Management/Fees/Collect Fee/components/UpdateCollectFee";
import SingleCollectFee from "../modules/Finance Management/Fees/Collect Fee/components/SingleCollectFee";
import CreateStudent from "../modules/members/students/components/CreateStudent";
import UpdateStudent from "../modules/members/students/components/UpdateStudent";
import SectionPage from "../modules/general settings/Section/pages/SectionPage";
import RoutinePages from "../modules/general settings/Routine/pages/RoutinePages";
import CreateRoutine from "../modules/general settings/Routine/components/CreateRoutine";
import ViewRoutine from "../modules/general settings/Routine/components/ViewRoutine";
import UpdateRoutine from "../modules/general settings/Routine/components/UpdateRoutine";
import NoticePage from "../modules/settings/notice/pages/NoticePage";
import RulesPage from "../modules/settings/rules & regulations/pages/RulesPage";
import AccountPage from "../modules/Finance Management/Accounts/account/pages/AccountPages";
import TransactionPage from "../modules/Finance Management/Accounts/Transaction/pages/TransactionPage";
import SmsPage from "../modules/settings/sms configuration/pages/SmsPage";
import ShiftPage from "../modules/general settings/shift/page/ShiftPage";
import ExamPage from "../modules/general settings/Exam/page/ExamPage";
import CreateExam from "../modules/general settings/Exam/components/CreateExam";
import ViewExam from "../modules/general settings/Exam/components/ViewExam";
import UpdateExam from "../modules/general settings/Exam/components/UpdateExam";
import ExamHallPage from "../modules/general settings/Exam/Exam-hall/page/ExamHall";
import ExamReceiptsPage from "../modules/general settings/Exam/Exam-receipt/page/ExamReceiptsPage";
import MarkExamPage from "../modules/general settings/Exam/mark-exam/page/MarkExamPage";
import GradeMarkPage from "../modules/general settings/Exam/Grade/pages/GradeMark";
import ResultsPage from "../modules/general settings/Exam/Result/pages/ResultsPage";
import ResultView from "../modules/general settings/Exam/Result/components/ResultView";
import ResultMigrationPage from "../modules/general settings/Exam/Result Migration/pages/ResultMigration";
import LeavePage from "../modules/general settings/Leave/page/LeavePage";
import WithPermission from "./withPermissionRouter";
import ListOfResultMigration from "../modules/general settings/Exam/Result Migration/pages/ListOfResultMigration";
import CashPage from "../modules/Finance Management/Accounts/cash management/pages/CashPage";
import MigrationResultView from "../modules/general settings/Exam/Result Migration/Components/MigrationResultView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRouter children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },

      // students
      {
        path: "/students",
        element: (
          <WithPermission requiredPermission="student">
            <Accounts />
          </WithPermission>
        ),
        children: [
          {
            path: "/students",
            element: <StudentsPage />,
          },
          {
            path: "create",
            element: <CreateStudent />,
          },
          {
            path: "update/:studentId",
            element: <UpdateStudent />,
          },
          {
            path: "student-view/:studentId",
            element: <StudentView />,
          },
        ],
      },
      // employees
      {
        path: "/employees",
        element: (
          <WithPermission requiredPermission="employee">
            <Accounts />
          </WithPermission>
        ),
        children: [
          {
            path: "",
            element: <EmployeePage />,
          },
          {
            path: "employee-view/:employeeId",
            element: <SingleViewEmployee />,
          },
        ],
      },
      // teacher
      {
        path: "/teacher",
        element: (
          <WithPermission requiredPermission="teacher">
            <Accounts />
          </WithPermission>
        ),
        children: [
          {
            path: "",
            element: <TeacherPage />,
          },
          {
            path: "teacher-view/:teacherId",
            element: <TeacherView />,
          },
        ],
      },
      // Department
      {
        path: "/department",
        element: (
          <WithPermission requiredPermission="department">
            <DepartmentPage />
          </WithPermission>
        ),
      },
      // classes
      {
        path: "/classes",
        element: (
          <WithPermission requiredPermission="gradelevel">
            <ClassesPage />
          </WithPermission>
        ),
      },
      // subjects
      {
        path: "/subjects",
        element: (
          <WithPermission requiredPermission="classsubject">
            <SubjectsPage />
          </WithPermission>
        ),
      },
      // Section
      {
        path: "/section",
        element: (
          <WithPermission requiredPermission="section">
            <SectionPage />
          </WithPermission>
        ),
      },
      // shift
      {
        path: "/shift",
        element: (
          <WithPermission requiredPermission="shift">
            <ShiftPage />
          </WithPermission>
        ),
      },

      // Leave
      {
        path: "/leave",
        element: <LeavePage />,
      },

      // exam
      {
        path: "/exam",
        element: (
          <WithPermission requiredPermission="exam">
            <Accounts />
          </WithPermission>
        ),
        children: [
          {
            path: "",
            element: <ExamPage />,
          },
          {
            path: "create",
            element: <CreateExam />,
          },
          {
            path: ":examId",
            element: <UpdateExam />,
          },
          {
            path: "view/:examId",
            element: <ViewExam />,
          },
        ],
      },

      // exam Hall
      {
        path: "/exam-hall",
        element: (
          <WithPermission requiredPermission="examhall">
            <Accounts />
          </WithPermission>
        ),
        children: [
          {
            path: "",
            element: <ExamHallPage />,
          },
          {
            path: "create",
            element: <CreateExam />,
          },
          {
            path: ":examId",
            element: <UpdateExam />,
          },
          {
            path: "view/:examId",
            element: <ViewExam />,
          },
        ],
      },
      // mark exam
      {
        path: "/mark-exam",
        element: (
          <WithPermission requiredPermission="exammark">
            <MarkExamPage />
          </WithPermission>
        ),
      },
      // exam Receipts
      {
        path: "/exam-receipts",
        element: (
          <WithPermission requiredPermission="examhallreceipt">
            <ExamReceiptsPage />
          </WithPermission>
        ),
      },
      // Grade Mark
      {
        path: "/grade-mark",
        element: (
          <WithPermission requiredPermission="gradescale">
            <GradeMarkPage />
          </WithPermission>
        ),
      },

      // Result Migration
      //sa Result Migration

      {
        path: "/result-migration",
        element: (
          <WithPermission requiredPermission="exam">
            <Accounts />
          </WithPermission>
        ),
        children: [
          {
            path: "",
            element: <ResultMigrationPage />,
          },
          {
            path: "list",
            element: <ListOfResultMigration />,
          },

          {
            path: "view/:roleId",
            element: <MigrationResultView />,
          },
        ],
      },

      // {
      //   path: "/result-migration",
      //   element: (
      //     <WithPermission requiredPermission="exam">
      //       <ResultMigrationPage />
      //     </WithPermission>
      //   ),
      //   children: [
      //     {
      //       path: "list",
      //       element: <ListOfResultMigration />,
      //     },
      //     {
      //       path: "/result-migration/:roleId",
      //       element: <MigrationResultView />,
      //     },
      //   ],
      // },
      // {
      //   path: "/result-migration/list",
      //   element: (
      //     <WithPermission requiredPermission="exam">
      //       <ListOfResultMigration />
      //     </WithPermission>
      //   ),
      // },

      // exam Result
      {
        path: "/exam-result",
        element: (
          <WithPermission requiredPermission="studentresult">
            <Accounts />
          </WithPermission>
        ),
        children: [
          {
            path: "",
            element: <ResultsPage />,
          },
          {
            path: "/exam-result/view/:resultId",
            element: <ResultView />,
          },
        ],
      },

      // routine
      {
        path: "/routine",
        element: (
          <WithPermission requiredPermission="routine">
            <Accounts />
          </WithPermission>
        ),
        children: [
          {
            path: "",
            element: <RoutinePages />,
          },
          {
            path: "/routine/create-routine",
            element: <CreateRoutine />,
          },
          {
            path: "/routine/view/:routineID",
            element: <ViewRoutine />,
          },
          {
            path: "/routine/update/:routineID",
            element: <UpdateRoutine />,
          },
        ],
      },

      // admission
      {
        path: "/admission",
        element: (
          <WithPermission requiredPermission="admission">
            <Accounts />
          </WithPermission>
        ),
        children: [
          {
            path: "",
            element: <AdmissionPage />,
          },
          {
            path: "/admission/create-admission",
            element: <CreateAdmission />,
          },
          {
            path: "/admission/admission-view/:admissionId",
            element: <AdmissionView />,
          },
          {
            path: "/admission/:admissionId",
            element: <UpdateAdmission />,
          },
        ],
      },
      // admission session
      {
        path: "/admission-session",
        element: (
          <WithPermission requiredPermission="admissionsession">
            <AdmissionSessionPage />
          </WithPermission>
        ),
      },
      // Fees
      {
        path: "/fees",
        element: (
          <WithPermission requiredPermission="feestructure">
            <Accounts />
          </WithPermission>
        ),
        children: [
          {
            path: "",
            element: <FeesPage />,
          },

          {
            path: "view/:feesId",
            element: <FeesView />,
          },
        ],
      },

      // collect fee
      {
        path: "/collect-fee",
        element: (
          <WithPermission requiredPermission="fees">
            <Accounts />
          </WithPermission>
        ),
        children: [
          {
            path: "",
            element: <CreateCollectFee />,
          },
          {
            path: "list",
            element: <CollectFeePage />,
          },
          {
            path: ":collectFeeId",
            element: <UpdateCollectFee />,
          },
          {
            path: "view/:collectFeeId",
            element: <SingleCollectFee />,
          },
        ],
      },

      // Tuition Fees
      {
        path: "/additional-fee",
        element: (
          <WithPermission requiredPermission="admissionfeestructure">
            <Accounts />
          </WithPermission>
        ),
        children: [
          {
            path: "",
            element: <AdditionalFeesPage />,
          },

          {
            path: "fees-view/:feesId",
            element: <FeesView />,
          },
        ],
      },

      // Tuition Fees Payment
      {
        path: "/tuition-fees-payment",
        element: <Accounts />,
        children: [
          {
            path: "",
            element: <TuitionFeePaymentPage />,
          },

          {
            path: "fees-view/:feesId",
            element: <FeesView />,
          },
        ],
      },

      // attendance
      {
        path: "/attendance",
        element: <Accounts />,
        children: [
          {
            path: "mark-student-attendance",
            element: <MarkStudentsAttendance />,
          },
          {
            path: "mark-student-attendance-list",
            element: <ViewStudentsAttendanceList />,
          },
          {
            path: "mark-student-attendance-list/:attendanceId",
            element: <ViewSingleStudentsAttendanceList />,
          },
          {
            path: "mark-employee-attendance",
            element: <MarkTeachersAttendance />,
          },
          {
            path: "mark-employee-attendance-list",
            element: <ViewEmployeeAttendanceList />,
          },
          {
            path: "mark-employee-attendance-list/:attendanceId",
            element: <ViewSingleEmployeeAttendance />,
          },
        ],
      },
      // institution profile
      {
        path: "/institute-profile",
        element: (
          <WithPermission requiredPermission="institution">
            <InstituteProfile />
          </WithPermission>
        ),
      },
      // Notice
      {
        path: "/notice",
        element: (
          <WithPermission requiredPermission="noticeboard">
            <NoticePage />
          </WithPermission>
        ),
      },
      // Rules
      {
        path: "/rules",
        element: (
          <WithPermission requiredPermission="rulesandregulations">
            <RulesPage />
          </WithPermission>
        ),
      },
      // SMS
      {
        path: "/sms",
        element: (
          <WithPermission requiredPermission="smsconfig">
            <SmsPage />
          </WithPermission>
        ),
      },

      // Role & permissions
      {
        path: "/role-permission",
        element: (
          <WithPermission requiredPermission="role">
            <Accounts />
          </WithPermission>
        ),
        children: [
          {
            path: "",
            element: <RolePermissionPage />,
          },
          {
            path: ":roleId",
            element: <ViewRolePermission />,
          },
        ],
      },

      // payment
      {
        path: "/payment",
        element: (
          <WithPermission requiredPermission="payment">
            <Accounts />
          </WithPermission>
        ),
        children: [
          {
            path: "",
            element: <PaymentPage />,
          },
          {
            path: "payment-view/:paymentId",
            element: <ViewPayment />,
          },
        ],
      },

      // payroll
      {
        path: "/payroll",
        element: (
          <WithPermission requiredPermission="payroll">
            <Accounts />
          </WithPermission>
        ),
        children: [
          {
            path: "",
            element: <PayrollPage />,
          },
          {
            path: "payroll-view/:payrollId",
            element: <ViewPayroll />,
          },
        ],
      },
      {
        path: "/account",
        element: <Accounts />,
        children: [
          {
            path: "/account",
            element: <AccountPage />,
          },
          {
            path: "/account/transactions",
            element: <TransactionPage />,
          },
          {
            path: "/account/cash",
            element: <CashPage />,
          },
          {
            path: "balance-status",
            element: <BalanceStatus />,
          },

          {
            path: "client-account",
            element: <ClientAccount />,
          },
        ],
      },
      // _______________________________________________________________________________________________________________
      // new for education

      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login-second",
    element: <SecondLogin />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verification",
    element: <Verification />,
  },
  {
    path: "/send-otp",
    element: <SendOTP />,
  },
  {
    path: "/match-otp",
    element: <MatchOTP />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

export default router;
