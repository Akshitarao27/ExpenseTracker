import React from "react";
import CustomPieChart from "../Charts/CustomPieChart.jsx";

const COLORS = [
  "#6366F1",
  "#8B5CF6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
];

const FinanceOverview = ({
  totalBalance,
  totalIncome,
  totalExpense,
}) => {
  const balanceData = [
    {
      name: "Total Balance",
      amount: totalBalance,
    },
    {
      name: "Total Expenses",
      amount: totalExpense,
    },
    {
      name: "Total Income",
      amount: totalIncome,
    },
  ];

  return (
    <div className="card hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
      <div>
  <h5 className="text-xl font-semibold text-gray-800">
    Financial Overview
  </h5>

  <p className="text-sm text-gray-500 mt-1">
    Overview of your balance, income and expenses.
  </p>
</div>
      </div>
      <div className="grid grid-cols-3 gap-3 my-6">
  <div className="bg-indigo-50 rounded-2xl p-3 text-center">
    <p className="text-xs text-gray-500">Balance</p>
    <h4 className="text-lg font-bold text-indigo-600">
      ₹{totalBalance}
    </h4>
  </div>

  <div className="bg-green-50 rounded-2xl p-3 text-center">
    <p className="text-xs text-gray-500">Income</p>
    <h4 className="text-lg font-bold text-green-600">
      ₹{totalIncome}
    </h4>
  </div>

  <div className="bg-red-50 rounded-2xl p-3 text-center">
    <p className="text-xs text-gray-500">Expense</p>
    <h4 className="text-lg font-bold text-red-600">
      ₹{totalExpense}
    </h4>
  </div>
</div>


      <div className="mt-2">
      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
      </div>
    </div>
  );
};

export default FinanceOverview;