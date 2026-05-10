import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DummyEarnings } from "@/dummy/earnings";

interface Transaction {
  id: string;
  orderId: string;
  date: string;
  amount: number;
  status: 'SETTLED' | 'PENDING' | 'FAILED';
  icon: string;
}

interface EarningsState {
  totalBalance: number;
  netProfit: number;
  avgOrder: number;
  profitTrend: string;
  avgOrderTrend: string;
  transactions: Transaction[];
  lastPayout: {
    bank: string;
    date: string;
    amount: number;
  };
  revenueData: Array<{ date: string; revenue: number }>;
  period: 'daily' | 'weekly' | 'monthly';
}

const initialState: EarningsState = DummyEarnings as EarningsState;

const earningsSlice = createSlice({
  name: 'earnings',
  initialState,
  reducers: {
    setPeriod: (state, action: PayloadAction<'daily' | 'weekly' | 'monthly'>) => {
      state.period = action.payload;
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      state.totalBalance = action.payload;
    },
  },
});

export const { setPeriod, updateBalance } = earningsSlice.actions;
export default earningsSlice.reducer;
