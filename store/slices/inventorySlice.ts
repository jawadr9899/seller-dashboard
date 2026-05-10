import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DummyInventory } from '@/dummy/inventory';

interface Product {
  sku: string;
  image: string;
  name: string;
  category: string;
  stockQty: number;
  stockMax: number;
  stockStatus: 'good' | 'low' | 'critical';
  price: number;
}

interface InventoryState {
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: string | null;
  searchQuery: string;
}

const initialState: InventoryState = {
  products:(DummyInventory.products as Product[]),
  filteredProducts: (DummyInventory.products as Product[]),
  selectedCategory: null,
  searchQuery: '',
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    filterByCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.filteredProducts = state.products.filter(p => p.category === action.payload);
    },
    searchProducts: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredProducts = state.products.filter(p =>
        p.name.toLowerCase().includes(action.payload.toLowerCase()) ||
        p.sku.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    clearFilters: (state) => {
      state.selectedCategory = null;
      state.searchQuery = '';
      state.filteredProducts = state.products;
    },
    updateProductStock: (state, action: PayloadAction<{ sku: string; qty: number }>) => {
      const product = state.products.find(p => p.sku === action.payload.sku);
      if (product) {
        product.stockQty = action.payload.qty;
      }
    },
  },
});

export const { filterByCategory, searchProducts, clearFilters, updateProductStock } =
  inventorySlice.actions;
export default inventorySlice.reducer;
