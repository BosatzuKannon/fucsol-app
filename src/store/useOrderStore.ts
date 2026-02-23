import { create } from 'zustand';
import { useAuthStore } from './authStore';

const API_URL = 'http://192.168.88.184:3000'; 

export interface OrderItem {
  quantity: number;
  price: number;
  products: {
    name: string;
    image_url: string;
  };
}

export interface Order {
  id: string;
  total_amount: number;
  status: string;
  shipping_address: string;
  created_at: string;
  order_items: OrderItem[];
}

interface CreateOrderPayload {
  total_amount: number;
  shipping_address: string;
  items: {
    product_id: string;
    quantity: number;
    price: number;
  }[];
}

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  fetchOrders: () => Promise<void>;
  createOrder: (orderData: CreateOrderPayload) => Promise<{ success: boolean; orderId?: string; error?: string }>;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  isLoading: false,

  fetchOrders: async () => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/orders`, {
        headers: { 
          'Authorization': `Bearer ${token}` 
        },
      });
      const data = await response.json();
      
      if (response.ok) {
        set({ orders: data, isLoading: false });
      } else {
        throw new Error(data.message || 'Error al obtener los pedidos');
      }
    } catch (error) {
      console.log('Error fetching orders:', error);
      set({ isLoading: false });
    }
  },

  createOrder: async (orderData) => {
    const token = useAuthStore.getState().token;
    if (!token) return { success: false, error: 'No autenticado' };

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Error al procesar el pedido en el servidor');
      
      return { success: true, orderId: data.orderId };
    } catch (error: any) {
      console.log('Error creating order:', error);
      return { success: false, error: error.message };
    }
  },
}));