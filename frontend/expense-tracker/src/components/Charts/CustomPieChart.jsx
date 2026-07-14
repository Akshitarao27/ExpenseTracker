import React from "react";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={140}
          innerRadius={95}
          labelLine={false}
          isAnimationActive={true}
  animationDuration={900}
  animationBegin={200}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>

        <Tooltip
  content={<CustomTooltip />}
  cursor={{ fill: "rgba(99,102,241,0.08)" }}
/>
<Legend
  content={<CustomLegend />}
  verticalAlign="bottom"
/>

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="#6B7280"
fontSize="15px"
fontWeight="500"
            >
              {label}
            </text>

            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              fill="#111827"
fontSize="30px"
fontWeight="700"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;