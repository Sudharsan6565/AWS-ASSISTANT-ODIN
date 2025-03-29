import axios from 'axios';
import { create } from 'zustand';

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

  // ✅ New additions
  isAuthenticated: boolean;
  login: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  data: null,
  filteredChartData: [],
  loading: false,
  error: null,
  isAuthenticated: false, // ✅ added auth state

  login: () => set({ isAuthenticated: true }), // ✅ added login method

  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      const chartData = response.data?.cost?.chartData || [];

      set({
        data: response.data,
        filteredChartData: chartData, // default on load
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  setFilteredChartData: (filtered) => set({ filteredChartData: filtered }),
}));

