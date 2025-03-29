import { useDashboardStore } from './zustandStore';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';

const ExportBar = () => {
  const { data, setFilteredChartData, filteredChartData } = useDashboardStore();
  const [selectedRange, setSelectedRange] = useState('Today');
  const [fromDate, setFromDate] = useState(dayjs().format('2025-03-01'));
  const [toDate, setToDate] = useState(dayjs().format('YYYY-MM-DD'));

  const chartData = data?.cost.chartData || [];
  const lastUpdatedTime = dayjs().format('HH:mm:ss');

  useEffect(() => {
    const filtered = chartData.filter((item) => {
      const itemDate = dayjs(item.date, 'MMM D');
      const from = dayjs(fromDate);
      const to = dayjs(toDate);
      return itemDate.isAfter(from.subtract(1, 'day')) && itemDate.isBefore(to.add(1, 'day'));
    });
    setFilteredChartData(filtered);
  }, [fromDate, toDate, chartData, setFilteredChartData]);

const handleExport = () => {
  if (!data) return;

  const { actualBilled, estimatedMonthEnd, budget, cost } = data;
  const chartRows = filteredChartData.length
    ? filteredChartData
    : [{ date: data.date, cost: actualBilled }];

  const chartSection = chartRows.map((row) => ({
    Date: row.date,
    Cost: row.cost,
  }));

  const tilesSection = [
    { Metric: 'Actual Billed', Value: actualBilled },
    { Metric: 'Estimated Month-End', Value: estimatedMonthEnd },
    { Metric: 'Budget Limit', Value: budget.amount },
    { Metric: 'Remaining Budget', Value: budget.remaining },
  ];

  const breakdownSection = Object.entries(cost.breakdown).map(([service, amount]) => ({
    Service: service,
    Cost: amount,
  }));

  // Convert sections to CSV
  const chartCSV = Papa.unparse(chartSection);
  const tilesCSV = Papa.unparse(tilesSection);
  const breakdownCSV = Papa.unparse(breakdownSection);

  // Combine all sections with headers
  const finalCSV =
    '--- Chart Data ---\n' +
    chartCSV +
    '\n\n--- Budget Overview ---\n' +
    tilesCSV +
    '\n\n--- Cost Breakdown ---\n' +
    breakdownCSV;

  const blob = new Blob([finalCSV], { type: 'text/csv;charset=utf-8;' });
  const fromLabel = dayjs(fromDate).format('YYYY-MM-DD');
  const toLabel = dayjs(toDate).format('YYYY-MM-DD');

  saveAs(blob, `odin_aws_report_${fromLabel}_to_${toLabel}.csv`);
};


  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-start gap-4 mb-6 flex-wrap">
      {/* From & To Date Pickers */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-300">From:</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="px-3 py-2 border rounded text-sm dark:bg-gray-800 dark:border-gray-700"
        />

        <label className="text-sm text-gray-600 dark:text-gray-300">To:</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="px-3 py-2 border rounded text-sm dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      {/* Range Selector */}
      <select
        value={selectedRange}
        onChange={(e) => setSelectedRange(e.target.value)}
        className="px-3 py-2 border rounded text-sm dark:bg-gray-800 dark:border-gray-700"
      >
        <option>Today</option>
        <option>Last 7 Days</option>
        <option>Last Month</option>
      </select>

      {/* Export Button */}
      <button
        onClick={handleExport}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
      >
        Export CSV
      </button>

      {/* Last Updated */}
      <p className="text-sm text-gray-500 dark:text-gray-400 ml-auto md:ml-6 mt-2 md:mt-0">
        Last Updated: {lastUpdatedTime}
      </p>
    </div>
  );
};

export default ExportBar;

