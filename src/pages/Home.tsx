import { useEffect } from 'react';
import { useDashboardStore } from '../zustandStore';
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
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">ODIN AWS Assistant</h1>

      {loading && <p>Loading data...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {data && (
        <>
          {/* Top 4 Stat Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="bg-white shadow p-4 rounded dark:bg-gray-800">
              <p className="text-sm text-gray-500">Actual Billed</p>
              <p className="text-xl font-semibold">₹{data.actualBilled}</p>
            </div>
            <div className="bg-white shadow p-4 rounded dark:bg-gray-800">
              <p className="text-sm text-gray-500">Est. Month-End</p>
              <p className="text-xl font-semibold">₹{data.estimatedMonthEnd}</p>
            </div>
            <div className="bg-white shadow p-4 rounded dark:bg-gray-800">
              <p className="text-sm text-gray-500">Budget Limit</p>
              <p className="text-xl font-semibold">₹{data.budget.amount}</p>
            </div>
            <div className="bg-white shadow p-4 rounded dark:bg-gray-800">
              <p className="text-sm text-gray-500">Remaining</p>
              <p className="text-xl font-semibold">₹{data.budget.remaining}</p>
            </div>
          </div>

          {/* ExportBar with Date Picker, CSV, Last Updated */}
          <ExportBar />

          {/* Graph + BudgetGauge */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CostChart />
            </div>
            <div className="flex flex-col gap-6">
              <BudgetGauge />
            </div>
          </div>

          {/* Breakdown Grid */}
          <BreakdownGrid />

          {/* Horizontal Split: Trusted Advisor + Cost Optimizer */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 shadow rounded dark:bg-gray-800">
              <h2 className="font-semibold mb-2">Trusted Advisor</h2>
              <TrustedAdvisorPanel />
            </div>
            <div className="bg-white p-4 shadow rounded dark:bg-gray-800">
              <h2 className="font-semibold mb-2">Cost Optimization Hub</h2>
              <CostOptimizerPanel />
            </div>
          </div>

          {/* Horizontal Split: Alerts + Notifications + Devices */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 shadow rounded dark:bg-gray-800">
              <h2 className="font-semibold mb-2">Budget Alerts</h2>
              <AlertPanel />
            </div>
            <div className="bg-white p-4 shadow rounded dark:bg-gray-800">
              <h2 className="font-semibold mb-2">Notifications</h2>
              <NotificationsPanel />
            </div>
            <div className="bg-white p-4 shadow rounded dark:bg-gray-800">
              <h2 className="font-semibold mb-2">Registered Devices</h2>
              <DevicePanel />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

