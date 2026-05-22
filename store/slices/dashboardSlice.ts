import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DummyDashboard } from '@/dummy/dashboard';

interface Order {
  id: string;
  customerName: string;
  itemCount: number;
  amount: number;
  status: 'NEW' | 'URGENT' | 'PREPARING' | "COMPLETED";
  receivedMinsAgo: number;
  distanceKm: number;
}

interface DashboardState {
  shopName: string;
  todayOrders: number;
  todayOrdersChange: string;
  revenue: string;
  revenueChange: string;
  weeklyRevenue: string;
  weeklyRevenueChange: string;
  orders: Order[];
}

const initialState: DashboardState = DummyDashboard as DashboardState;

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    acceptOrder: (state, action: PayloadAction<string>) => {
      const order = state.orders.find(o => o.id === action.payload);
      if (order) {
        order.status = 'PREPARING';
      }
    },
    declineOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(o => o.id !== action.payload);
    },
    updateOrder: (state, action: PayloadAction<string>) => {
      const order = state.orders.find(o => o.id === action.payload);
      if (order) {
        order.status = 'PREPARING';
      }
    },
  },
});

export const { acceptOrder, declineOrder, updateOrder } = dashboardSlice.actions;
export default dashboardSlice.reducer;
