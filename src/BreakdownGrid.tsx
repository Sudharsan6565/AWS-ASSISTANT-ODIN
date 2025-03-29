import { useDashboardStore } from './zustandStore';
import awsLogo from './icons/aws.ico';
import iconMap from './iconMap';

const BreakdownGrid = () => {
  const { data } = useDashboardStore();
  if (!data) return null;

  const breakdown = data.cost.breakdown;

  const defaultServices = [
    'Cost Explorer', 'Route 53', 'Tax', 'EC2', 'Lambda',
    'S3', 'CloudWatch', 'DynamoDB', 'SNS', 'VPC',
  ];

  const fullBreakdown = defaultServices.reduce((acc, key) => {
    acc[key] = breakdown[key] ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const sortedBreakdown = Object.fromEntries(
    Object.entries(fullBreakdown).sort((a, b) => b[1] - a[1])
  );

  const highlightTop = Object.keys(sortedBreakdown).slice(0, 3);

  return (
    <div className="mt-12 w-full">
      <h2 className="text-lg font-semibold mb-4 text-center">
        AWS Service-wise Cost
      </h2>
      <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        <div className="flex gap-4 justify-start px-2 min-w-max snap-start">
          {Object.entries(sortedBreakdown).map(([service, cost]) => {
            const icon = iconMap[service] || awsLogo;
            return (
              <div
                key={service}
                className={`min-w-[128px] h-32 flex-shrink-0 flex flex-col items-center justify-center bg-white rounded-xl shadow-md dark:bg-gray-800 transition duration-300 ${
                  highlightTop.includes(service)
                    ? 'border-2 border-blue-500'
                    : 'border border-gray-200 dark:border-gray-700'
                }`}
              >
                <img
                  src={icon}
                  alt={service}
                  className="w-10 h-10 mb-2 rounded-full object-contain border border-gray-300"
                />
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 text-center">
                  {service}
                </p>
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  ₹{cost.toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BreakdownGrid;

