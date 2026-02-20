import { create } from 'zustand';
import { Product } from '../components/ProductCard';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  error: null,
  
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('http://192.168.40.9:3000/products');
      
      if (!response.ok) {
        throw new Error('Error al conectar con el servidor');
      }
      
      const data = await response.json();
      set({ products: data, isLoading: false });
    } catch (error: any) {
      console.error('Error fetching products:', error);
      set({ error: error.message, isLoading: false });
    }
  },
}));