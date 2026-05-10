import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import inventoryReducer from './slices/inventorySlice';
import earningsReducer from './slices/earningsSlice';
import chatReducer from './slices/chatSlice';
import storesReducer from './slices/storesSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    inventory: inventoryReducer,
    earnings: earningsReducer,
    chat: chatReducer,
    stores: storesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
