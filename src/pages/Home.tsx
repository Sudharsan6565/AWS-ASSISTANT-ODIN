import { useEffect } from 'react';
import { useDashboardStore } from '../zustandStore';
import AppHeader from '../AppHeader';
import CostChart from '../CostChart';
import BudgetGauge from '../BudgetGauge';
import ExportBar from '../ExportBar';
import BreakdownGrid from '../BreakdownGrid';
import TrustedAdvisorPanel from '../TrustedAdvisorPanel';
import CostOptimizerPanel from '../CostOptimizerPanel';
import AlertPanel from '../AlertPanel';
import NotificationsPanel from '../NotificationsPanel';
import DevicePanel from '../DevicePanel';

const Home = () => {
  const { data, fetchData } = useDashboardStore();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AppHeader />

      <div className="w-full px-4 sm:px-6 md:px-4">
        {data && (
          <>
            {/* Top 4 Stat Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4 mt-6 max-w-full">
              {[
                { label: 'Actual Billed', value: data.actualBilled },
                { label: 'Est. Month-End', value: data.estimatedMonthEnd },
                { label: 'Budget Limit', value: data.budget.amount },
                { label: 'Remaining', value: data.budget.remaining },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg transition-all hover:shadow-xl"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">${item.value}</p>
                </div>
              ))}
            </div>

            <ExportBar />

            {/* Graph + BudgetGauge */}
            <div className="mt-6 flex flex-col lg:flex-row gap-4 items-start">
              <div className="w-full lg:w-[70%] bg-white p-0 rounded-xl shadow-md dark:bg-gray-800">
                <CostChart />
              </div>
              <div className="w-full lg:w-[30%] bg-white p-4 rounded-xl shadow-md dark:bg-gray-800">
                <BudgetGauge />
              </div>
            </div>

            <BreakdownGrid />

            {/* Trusted Advisor + Cost Optimizer */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 shadow-md rounded-xl dark:bg-gray-800">
                <h2 className="font-semibold mb-2 text-gray-800 dark:text-white">Trusted Advisor</h2>
                <TrustedAdvisorPanel />
              </div>
              <div className="bg-white p-4 shadow-md rounded-xl dark:bg-gray-800">
                <h2 className="font-semibold mb-2 text-gray-800 dark:text-white">Cost Optimization Hub</h2>
                <CostOptimizerPanel />
              </div>
            </div>

            {/* Final Triple Tile: Alerts, Notifications, Devices */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-md dark:bg-gray-800 min-h-[240px]">
                <h2 className="font-semibold mb-2 text-gray-800 dark:text-white">Budget Alerts</h2>
                <AlertPanel />
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md dark:bg-gray-800 min-h-[240px]">
                <h2 className="font-semibold mb-2 text-gray-800 dark:text-white">Notifications</h2>
                <NotificationsPanel />
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md dark:bg-gray-800 min-h-[240px]">
                <h2 className="font-semibold mb-2 text-gray-800 dark:text-white">Registered Devices</h2>
                <DevicePanel />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;

