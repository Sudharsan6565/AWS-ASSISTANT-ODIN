import { useDashboardStore } from './zustandStore';
import iconMap from './iconMap';
import awsIcon from './icons/aws.ico';

const BreakdownGrid = () => {
  const { data } = useDashboardStore();
  const breakdown = data?.cost?.breakdown || {};

  const defaultServices = [
    'Cost Explorer',
    'Route 53',
    'Tax',
    'EC2',
    'Lambda',
    'S3',
    'CloudWatch',
    'DynamoDB',
    'SNS',
    'VPC',
  ];

  // Merge actual + fallback services (ensure 10 tiles)
  const filledServices = Array.from(
    new Set([...defaultServices, ...Object.keys(breakdown)])
  ).slice(0, 10);

  const services = filledServices.map((service) => ({
    name: service,
    cost: breakdown[service] || 0,
    icon: iconMap[service] || awsIcon,
  }));

  // Top 3 by cost
  const sorted = [...services].sort((a, b) => b.cost - a.cost);
  const top3 = sorted.slice(0, 3).map((s) => s.name);
return (
  <div className="mt-10">
    <h2 className="text-lg font-semibold mb-4 text-center">
      AWS Service-wise Cost
    </h2>

    <div className="overflow-x-auto pb-2">
      <div className="flex gap-4 px-4 w-max">
        {services.map((svc, idx) => (
          <div
            key={idx}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 w-44 flex-shrink-0 text-center transition-transform hover:scale-105 ${
              top3.includes(svc.name)
                ? 'border-2 border-blue-500'
                : 'border border-gray-300 dark:border-gray-700'
            }`}
          >
            <img
              src={svc.icon}
              alt={svc.name}
              className="w-12 h-12 mx-auto mb-2 object-contain rounded-md shadow-sm"
            />
            <p className="text-sm font-medium truncate">{svc.name}</p>
            <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
              ₹{svc.cost.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);


}

export default BreakdownGrid;

