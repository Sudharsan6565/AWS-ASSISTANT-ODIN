import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_URL = 'https://x3esrtgf8i.execute-api.ap-south-1.amazonaws.com/prod/insights';

interface ChartData {
  date: string;
  cost: number;
}

interface DashboardData {
  date: string;
  actualBilled: number;
  estimatedMonthEnd: string;
  budget: {
    amount: number;
    forecast: number;
    remaining: number;
    usage: number;
  };
  cost: {
    total: number;
    chartData: ChartData[];
    breakdown: Record<string, number>;
  };
  accountId: string;
}

interface DashboardState {
  data: DashboardData | null;
  filteredChartData: ChartData[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  setFilteredChartData: (data: ChartData[]) => void;

  isAuthenticated: boolean;
  login: () => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      data: null,
      filteredChartData: [],
      loading: false,
      error: null,
      isAuthenticated: false,

      login: () => set({ isAuthenticated: true }),

      fetchData: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(API_URL);
          const lambdaChartData: ChartData[] = response.data?.cost?.chartData || [];

          // Simulate last 10 days with ₹0
          const today = new Date();
          const simulatedChart: ChartData[] = [];

          for (let i = 9; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const iso = date.toISOString().split("T")[0];
            simulatedChart.push({ date: iso, cost: 0 });
          }

          // Merge simulated + real
          const finalChart = simulatedChart.map((entry) => {
            const found = lambdaChartData.find((d) => d.date === entry.date);
            return found || entry;
          });

          const enrichedData: DashboardData = {
            ...response.data,
            cost: {
              ...response.data.cost,
              chartData: finalChart,
              total: finalChart.reduce((sum, d) => sum + d.cost, 0),
            },
          };

          set({
            data: enrichedData,
            filteredChartData: finalChart,
            loading: false,
          });
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      setFilteredChartData: (filtered) => set({ filteredChartData: filtered }),
    }),
    {
      name: 'odin-dashboard-store',
    }
  )
);

