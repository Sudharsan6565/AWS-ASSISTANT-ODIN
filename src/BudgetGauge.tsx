import { useDashboardStore } from './zustandStore';

const BudgetGauge = () => {
  const { data } = useDashboardStore();
  const usage = Math.min(100, data?.budget.usage || 0);

  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (usage / 100) * circumference;

  return (
    <div className="w-full h-64 bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col items-center justify-center">
      <h2 className="text-lg font-semibold mb-4">Budget Usage</h2>
      <svg viewBox="0 0 36 36" className="w-24 h-24">
        {/* Background circle */}
        <path
          className="text-gray-300"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* Foreground arc based on usage */}
        <path
          className="text-blue-500"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
        {/* Usage text */}
        <text
          x="18"
          y="20.35"
          className="text-sm fill-current text-center"
          fill="currentColor"
          textAnchor="middle"
        >
          {usage.toFixed(0)}%
        </text>
      </svg>
    </div>
  );
};

export default BudgetGauge;

