import { useDashboardStore } from './zustandStore';

const AlertPanel = () => {
  const data = useDashboardStore((state) => state.data);

  if (!data?.notifications?.budgetAlerts?.length) {
    return <p className="text-sm text-gray-500">No current budget alerts.</p>;
  }

  return (
    <ul className="space-y-2 text-sm">
      {data.notifications.budgetAlerts.map((alert, index) => (
        <li key={index} className="text-red-600 dark:text-red-400">⚠️ {alert.body}</li>
      ))}
    </ul>
  );
};

export default AlertPanel;

