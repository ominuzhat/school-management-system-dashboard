// import { useState } from "react";
// import {
//   FaFileAlt,
//   FaCreditCard,
//   FaArrowDown,
//   FaArrowUp,
// } from "react-icons/fa";
// import { FeeCollection } from "../components/FinanceTab/CollectFee";
// import { PaymentFee } from "../components/FinanceTab/PaymentFee";
// import { ExpenseTracking } from "../components/FinanceTab/Expense";
// import { AccountTransfer } from "../components/FinanceTab/TransferFee";
// import AccountList from "../components/FinanceTab/Account";
// import { MdAccountBalanceWallet } from "react-icons/md";
// import { hasPermissionForModule } from "../../../../utilities/permission";

// const TabComponent = ({ permissions }) => {
//   const [activeTab, setActiveTab] = useState("fees");

//   // Define all possible tabs with required permissions
//   const allTabs = [
//     {
//       key: "fees",
//       label: "Collect Fee",
//       icon: <FaFileAlt />,
//       permission: "fees",
//     },
//     {
//       key: "payments",
//       label: "Payroll",
//       icon: <FaCreditCard />,
//       permission: "payment",
//     },
//     {
//       key: "expenses",
//       label: "Cash Management",
//       icon: <FaArrowDown />,
//       permission: "financialentry",
//     },
//     {
//       key: "transfers",
//       label: "Transfer",
//       icon: <FaArrowUp />,
//       permission: "transaction",
//     },
//     {
//       key: "account",
//       label: "Account",
//       icon: <MdAccountBalanceWallet />,
//       permission: "account",
//     },
//   ];

//   // Filter tabs based on permissions
//   const tabs = allTabs.filter((tab: any) =>
//     hasPermissionForModule(permissions, tab.permission)
//   );

//   return (
//     <div>
//       <div className="my-10">
//         <div className="bg-white/80 backdrop-blur-md border border-[#A2C3FF] rounded-lg shadow-xl p-2">
//           <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.key}
//                 onClick={() => setActiveTab(tab.key)}
//                 className={`flex items-center gap-5 justify-center rounded-xl px-2 py-2 text-md font-medium transition-all duration-200
//                   ${
//                     activeTab === tab.key
//                       ? "bg-blue-600 text-white shadow-md"
//                       : "text-[#2D3B55] hover:bg-[#E6F0FF]"
//                   }
//                 `}
//               >
//                 <div className="text-xl mb-1">{tab.icon}</div>
//                 <span>{tab.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div>
//         {activeTab === "fees" &&
//           hasPermissionForModule(permissions, "fees") && <FeeCollection />}
//         {activeTab === "payments" &&
//           hasPermissionForModule(permissions, "payment") && <PaymentFee />}
//         {activeTab === "expenses" &&
//           hasPermissionForModule(permissions, "financialentry") && (
//             <ExpenseTracking />
//           )}
//         {activeTab === "transfers" &&
//           hasPermissionForModule(permissions, "transaction") && (
//             <AccountTransfer />
//           )}
//         {activeTab === "account" &&
//           hasPermissionForModule(permissions, "account") && <AccountList />}
//       </div>
//     </div>
//   );
// };

// export default TabComponent;

import { useState } from "react";
import { FaCreditCard, FaArrowUp } from "react-icons/fa";
// import BasicOverview from "../components/Home/BasicOverview";
import { PaymentFee } from "../components/FinanceTab/PaymentFee";
import { AccountTransfer } from "../components/FinanceTab/TransferFee";
import { MdAccountBalanceWallet, MdOutlineReceiptLong } from "react-icons/md";
import CollectFeeTab from "../components/FinanceTab/collectFeeComponents/CollectFeeTab";
import AccountTab from "../components/FinanceTab/AccountTab";
import { FaArrowsSpin } from "react-icons/fa6";
import CashManagementTab from "../components/FinanceTab/CashManagementTab";

const tabs = [
  // { key: "overview", label: "ওভারভিউ", icon: <FaChartPie /> },
  { key: "fees", label: "Fee", icon: <MdOutlineReceiptLong /> },
  { key: "payments", label: "Payroll", icon: <FaCreditCard /> },
  { key: "expenses", label: "Cash Management", icon: <FaArrowUp /> },
  { key: "transfers", label: "Transfer", icon: <FaArrowsSpin /> },
  { key: "account", label: "Account", icon: <MdAccountBalanceWallet /> },
  // { key: "ledger", label: "খাতা", icon: <FaSitemap /> },
];

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState("fees");

  return (
    <div>
      {/* <BasicOverview /> */}
      <div className="my-10">
        <div className="bg-white/80 backdrop-blur-md border border-[#A2C3FF] rounded-lg shadow-xl p-2">
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 ">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-5 justify-center rounded-xl px-2 py-2 text-md font-medium transition-all duration-200
                ${
                  activeTab === tab.key
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-[#2D3B55] hover:bg-[#E6F0FF]"
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
        {activeTab === "fees" && <CollectFeeTab />}
        {activeTab === "payments" && <PaymentFee />}
        {activeTab === "expenses" && <CashManagementTab />}
        {activeTab === "transfers" && <AccountTransfer />}
        {activeTab === "account" && <AccountTab />}
      </div>
    </div>
  );
};

export default TabComponent;
