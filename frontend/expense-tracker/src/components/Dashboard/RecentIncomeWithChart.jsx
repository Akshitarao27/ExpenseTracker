import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = [
  "#6366F1",
  "#8B5CF6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();

    return () => {};
  }, [data]);

  return (
    <div className="card hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
      <div>
  <h5 className="text-xl font-semibold text-gray-800">
    Last 60 Days Income
  </h5>

  <p className="text-sm text-gray-500 mt-1">
    Income distribution by source for the last 60 days.
  </p>
</div>
      </div>
    
      <div className="mt-2">
      {chartData.length > 0 ? (
  <CustomPieChart
    data={chartData}
    label="Total Income"
    totalAmount={`₹${totalIncome}`}
    showTextAnchor
    colors={COLORS}
  />
) : (
  <div className="flex items-center justify-center h-[350px]">
    <p className="text-gray-400 text-sm">
      No income records available.
    </p>
  </div>
)}
      </div>
    </div>
  );
};

export default RecentIncomeWithChart;