import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const CustomLineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3">
          <p className="text-sm font-semibold text-gray-800 mb-2">
            {payload[0].payload.category}
          </p>

          <p className="text-sm text-gray-500">
            Amount:{" "}
            <span className="text-sm font-semibold text-primary">
              ₹{payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-2">
      <ResponsiveContainer width="100%" height={330}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: -10,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.45} />
            <stop offset="95%" stopColor="#6366F1" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid
  stroke="#E5E7EB"
  strokeDasharray="4 4"
/>

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#6B7280" }}
            stroke="none"
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#6B7280" }}
            stroke="none"
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#6366F1"
            strokeWidth={4}
            fill="url(#incomeGradient)"
            fillOpacity={1}
            dot={{
                r: 5,
                fill: "#6366F1",
              }}
              activeDot={{
                r: 8,
                fill: "#4F46E5",
              }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;