import { useDashboardStore } from './zustandStore';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);


const ExportBar = () => {
  const { data, setFilteredChartData, filteredChartData } = useDashboardStore();
  const [selectedRange, setSelectedRange] = useState('Today');
  const [fromDate, setFromDate] = useState(dayjs().format('2025-03-01'));
  const [toDate, setToDate] = useState(dayjs().format('YYYY-MM-DD'));

  const chartData = data?.cost.chartData || [];
  const lastUpdatedTime = dayjs().format('HH:mm:ss');

  useEffect(() => {
    if (!chartData.length) return;

    const from = dayjs(fromDate);
    const to = dayjs(toDate);

    const filtered = chartData.filter((item) => {
      const itemDate = dayjs(item.date);
      if (!itemDate.isValid()) return false;
      return itemDate.isSameOrAfter(from) && itemDate.isSameOrBefore(to);
    });

    setFilteredChartData(filtered.length ? filtered : chartData);
  }, [fromDate, toDate, chartData, setFilteredChartData]);

  const handleExport = async () => {
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

    const chartCSV = Papa.unparse(chartSection);
    const tilesCSV = Papa.unparse(tilesSection);
    const breakdownCSV = Papa.unparse(breakdownSection);

    const finalCSV =
      '--- Chart Data ---\n' +
      chartCSV +
      '\n\n--- Budget Overview ---\n' +
      tilesCSV +
      '\n\n--- Cost Breakdown ---\n' +
      breakdownCSV;

    const fromLabel = dayjs(fromDate).format('YYYY-MM-DD');
    const toLabel = dayjs(toDate).format('YYYY-MM-DD');
    const filename = `odin_aws_report_${fromLabel}_to_${toLabel}.csv`;

    if (Capacitor.isNativePlatform()) {
      try {
        await Filesystem.writeFile({
          path: filename,
          data: finalCSV,
          directory: Directory.Documents,
        });
        alert(`✅ Saved to device: ${filename}`);
      } catch (err) {
        console.error('❌ Failed to save CSV on device:', err);
        alert('❌ Failed to save CSV on device');
      }
    } else {
      const blob = new Blob([finalCSV], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, filename);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6 mt-6">
      <div className="flex items-center gap-2 flex-wrap">
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

      <select
        value={selectedRange}
        onChange={(e) => setSelectedRange(e.target.value)}
        className="px-3 py-2 border rounded text-sm dark:bg-gray-800 dark:border-gray-700"
      >
        <option>Today</option>
        <option>Last 7 Days</option>
        <option>Last Month</option>
      </select>

      <button
        onClick={handleExport}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm active:scale-95 transition-transform"
      >
        Export CSV
      </button>

      <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
        Last Updated: {lastUpdatedTime}
      </span>
    </div>
  );
};

export default ExportBar;

