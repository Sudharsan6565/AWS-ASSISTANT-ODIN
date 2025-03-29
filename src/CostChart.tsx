import { useDashboardStore } from "./zustandStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CostChart = () => {
  const chartData = useDashboardStore((state) => state.filteredChartData);
  const hasData = chartData && chartData.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 w-full">
      <h2 className="text-lg font-semibold mb-4">Daily AWS Cost</h2>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={hasData ? chartData : []}
          margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            stroke="#d1d5db"
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            stroke="#d1d5db"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
              fontSize: "0.85rem",
              padding: "0.5rem",
            }}
            labelStyle={{ color: "#374151" }}
          />
          <Line
            type="monotone"
            dataKey="cost"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ r: 4, stroke: "#3B82F6", strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 6 }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>

      {!hasData && (
        <p className="text-center text-sm text-gray-500 mt-4">
          No cost data available for this range.
        </p>
      )}
    </div>
  );
};

export default CostChart;

