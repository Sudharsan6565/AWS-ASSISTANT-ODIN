import React from "react";
import { useDashboardStore } from "./zustandStore";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const BudgetGauge = () => {
  const data = useDashboardStore((state) => state.data);

  if (!data) return null;

  const percentage = Math.min(100, data.budget.usage);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 flex flex-col items-center">
      <h2 className="font-semibold mb-4 text-center">Budget Usage</h2>
      <div className="w-36 h-36 animate-pulse">
        <CircularProgressbar
          value={percentage}
          text={`${percentage.toFixed(0)}%`}
          styles={buildStyles({
            textColor: "#111",
            pathColor: "#3B82F6",
            trailColor: "#eee",
            strokeLinecap: "round",
            textSize: "16px",
          })}
        />
      </div>
    </div>
  );
};

export default BudgetGauge;

