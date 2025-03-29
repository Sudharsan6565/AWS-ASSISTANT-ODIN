import { useDashboardStore } from './zustandStore';

const TrustedAdvisorPanel = () => {
  const data = useDashboardStore((state) => state.data);

  if (!data?.notifications?.trustedAdvisor?.length) {
    return <p className="text-sm text-gray-500">No current Trusted Advisor alerts.</p>;
  }

  return (
    <ul className="space-y-2 text-sm">
      {data.notifications.trustedAdvisor.map((item, index) => (
        <li key={index} className="text-blue-700 dark:text-blue-400">✅ {item.body}</li>
      ))}
    </ul>
  );
};

export default TrustedAdvisorPanel;

