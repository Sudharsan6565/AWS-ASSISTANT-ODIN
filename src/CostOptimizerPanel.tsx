import { useDashboardStore } from './zustandStore';

const CostOptimizerPanel = () => {
  const data = useDashboardStore((state) => state.data);

  if (!data?.notifications?.costOptimizer?.length) {
    return <p className="text-sm text-gray-500">No cost optimization tips at the moment.</p>;
  }

  return (
    <ul className="space-y-2 text-sm">
      {data.notifications.costOptimizer.map((item, index) => (
        <li key={index} className="text-green-700 dark:text-green-400">💡 {item.body}</li>
      ))}
    </ul>
  );
};

export default CostOptimizerPanel;

