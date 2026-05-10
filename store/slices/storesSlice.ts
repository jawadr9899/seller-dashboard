import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DummyStores } from '@/dummy/stores';

interface Store {
  id: string;
  logo: string;
  name: string;
  type: string;
  status: 'ACTIVE' | 'PAUSED';
  monthlyEarnings: number;
  activeOrders: number;
  trendPct: number;
  trendData: Array<{ date: string; value: number }>;
}

interface StoresState {
  stores: Store[];
  totalRevenue: number;
  totalEarnings: number;
  pendingDeliveries: number;
}

const initialState: StoresState = {
  stores:DummyStores.stores as Store[],
  totalRevenue: 125420,
  totalEarnings: 84200,
  pendingDeliveries: 12,
};

const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    updateStoreStatus: (state, action: PayloadAction<{ id: string; status: 'ACTIVE' | 'PAUSED' }>) => {
      const store = state.stores.find(s => s.id === action.payload.id);
      if (store) {
        store.status = action.payload.status;
      }
    },
  },
});

export const { updateStoreStatus } = storesSlice.actions;
export default storesSlice.reducer;
