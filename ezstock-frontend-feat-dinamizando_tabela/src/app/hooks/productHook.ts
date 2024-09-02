import { create } from 'zustand';
import { Produto } from '@/app/types';

interface ProductStore {
  produtos: Produto[];
  setProdutos: (produtos: Produto[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  produtos: [],
  setProdutos: (produtos) => set({ produtos }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
