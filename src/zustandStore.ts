import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import dayjs from 'dayjs';

const API_URL = 'https://x3esrtgf8i.execute-api.ap-south-1.amazonaws.com/prod/insights';

interface ChartData {
  date: string;
  cost: number;
}

interface Notification {
  type?: string;
  message: string;
  timestamp: string;
}

interface Device {
  deviceId: string;
  fcmToken: string;
  createdAt: string;
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
  notifications?: {
    budgetAlerts?: { title: string; body: string }[];
    trustedAdvisor?: { title: string; body: string }[];
    costOptimizer?: { title: string; body: string }[];
  };
  devices?: Device[];
}

interface DashboardState {
  data: DashboardData | null;
  filteredChartData: ChartData[];
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  systemNotifications: Notification[];
  fetchData: () => Promise<void>;
  login: () => void;
  setFilteredChartData: (data: ChartData[]) => void;
  addNotification: (note: Notification) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      data: null,
      filteredChartData: [],
      loading: false,
      error: null,
      isAuthenticated: false,
      systemNotifications: [],

      login: () => set({ isAuthenticated: true }),

      addNotification: (note) => {
        const current = get().systemNotifications;
        const capped = [note, ...current].slice(0, 5); // 🧢 max 5
        set({ systemNotifications: capped });
      },

      setFilteredChartData: (data) => set({ filteredChartData: data }),

      fetchData: async () => {
        set({ loading: true, error: null });

        try {
          const response = await axios.get(API_URL);
          const lambdaChartData: ChartData[] = response.data?.cost?.chartData || [];

          // 🧪 Simulate last 10 days
          const today = new Date();
          const simulatedChart: ChartData[] = [];
          for (let i = 9; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const iso = date.toISOString().split('T')[0];
            simulatedChart.push({ date: iso, cost: 0 });
          }

          // 🔗 Merge simulation with actual lambda data
          let mergedChart = simulatedChart.map((entry) => {
            const found = lambdaChartData.find((d) => {
              const lambdaDate = d.date?.split('T')?.[0] ?? d.date;
              return lambdaDate === entry.date;
            });
            return found || entry;
          });

          // 🛡️ Fallback: ensure at least 2 points
          if (mergedChart.filter((d) => d.cost > 0).length < 2) {
            const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
            mergedChart.unshift({ date: yesterday, cost: 0 });
          }

          const enrichedData: DashboardData = {
            ...response.data,
            cost: {
              ...response.data.cost,
              chartData: mergedChart,
              total: mergedChart.reduce((sum, d) => sum + d.cost, 0),
            },
          };

          set({
            data: enrichedData,
            filteredChartData: mergedChart,
            loading: false,
          });

          get().addNotification({
            message: '📡 Data sync complete.',
            timestamp: dayjs().format('HH:mm:ss'),
          });
        } catch (err: any) {
          set({
            error: err.message || 'Fetch error',
            loading: false,
          });

          get().addNotification({
            message: '❌ Data sync failed.',
            type: 'error',
            timestamp: dayjs().format('HH:mm:ss'),
          });
        }
      },
    }),
    {
      name: 'odin-dashboard-store',
      partialize: (state) => ({
        systemNotifications: state.systemNotifications,
        isAuthenticated: state.isAuthenticated,
        filteredChartData: state.filteredChartData,
      }),
    }
  )
);

