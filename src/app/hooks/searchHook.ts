import { create } from 'zustand';

interface ProductSearchStore {
  productSearch: string;
  setProductSearch: (search: string) => void;
}

export const useProductSearchStore = create<ProductSearchStore>((set) => ({
  productSearch: '',
  setProductSearch: (search) => set({ productSearch: search }),
}));
