import { useEffect } from 'react';
import { useDashboardStore } from '../zustandStore';
import AppHeader from '../AppHeader'; // ✅ Header added
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
  const { data, loading, error, fetchData } = useDashboardStore();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AppHeader /> {/* ✅ Header shown at the top */}

      <div className="w-full px-4 sm:px-6 md:px-4">
        {data && (
          <>
            {/* Top 4 Stat Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4 mt-6 max-w-full">
             <div className="bg-white shadow-md p-4 rounded-xl dark:bg-gray-800">
                <p className="text-sm text-gray-500">Actual Billed</p>
                <p className="text-xl font-semibold">₹{data.actualBilled}</p>
              </div>
              <div className="bg-white shadow-md p-4 rounded-xl dark:bg-gray-800">
                <p className="text-sm text-gray-500">Est. Month-End</p>
                <p className="text-xl font-semibold">₹{data.estimatedMonthEnd}</p>
              </div>
              <div className="bg-white shadow-md p-4 rounded-xl dark:bg-gray-800">
                <p className="text-sm text-gray-500">Budget Limit</p>
                <p className="text-xl font-semibold">₹{data.budget.amount}</p>
              </div>
              <div className="bg-white shadow-md p-4 rounded-xl dark:bg-gray-800">
                <p className="text-sm text-gray-500">Remaining</p>
                <p className="text-xl font-semibold">₹{data.budget.remaining}</p>
              </div>
            </div>

            <ExportBar />

            {/* Graph + BudgetGauge */}
            <div className="mt-8 flex flex-col lg:flex-row gap-4 items-start">
              <div className="w-full lg:w-[70%] bg-white p-4 rounded-xl shadow-md dark:bg-gray-800">
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
                <h2 className="font-semibold mb-2">Trusted Advisor</h2>
                <TrustedAdvisorPanel />
              </div>
              <div className="bg-white p-4 shadow-md rounded-xl dark:bg-gray-800">
                <h2 className="font-semibold mb-2">Cost Optimization Hub</h2>
                <CostOptimizerPanel />
              </div>
            </div>

            {/* Alerts + Notifications + Devices */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 shadow-md rounded-xl dark:bg-gray-800">
                <h2 className="font-semibold mb-2">Budget Alerts</h2>
                <AlertPanel />
              </div>
              <div className="bg-white p-4 shadow-md rounded-xl dark:bg-gray-800">
                <h2 className="font-semibold mb-2">Notifications</h2>
                <NotificationsPanel />
              </div>
              <div className="bg-white p-4 shadow-md rounded-xl dark:bg-gray-800">
                <h2 className="font-semibold mb-2">Registered Devices</h2>
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

