import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";



const CustomBarChart = ({ data, xAxisKey }) => {
  const getBarColor = (index) => {
    const colors = [
      "#6366F1",
      "#8B5CF6",
      "#A78BFA",
      "#4F46E5",
      "#818CF8",
    ];
  
    return colors[index % colors.length];
  };
      
      const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
          return (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3">
              <p className="text-sm font-semibold text-gray-800 mb-2">
                {payload[0].payload.source || payload[0].payload.category}
              </p>
      
              <p className="text-sm text-gray-500">
                Amount: <span className="font-semibold text-primary">₹{payload[0].payload.amount}</span>
              </p>
            </div>
          );
        }
        return null;};
  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 mt-6 p-2">
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={data}>
        <CartesianGrid
  strokeDasharray="4 4"
  stroke="#E5E7EB"
/>

          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            stroke="none"
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#6B7280" }}
            stroke="none"
          />

          <Tooltip content={CustomTooltip } />

          <Bar
             dataKey="amount"
             radius={[0, 0, 0, 0]}
             barSize={28}
          >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={getBarColor(index)}
                />
            ))}
         </Bar>
           
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;