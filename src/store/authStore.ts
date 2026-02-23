import { create } from 'zustand';

const API_URL = 'http://192.168.40.9:3000'; 

export interface Address {
  id: string;
  title: string;
  address_line: string;
  reference?: string;
  city: string;
  department: string;
  is_default: boolean;
}

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  points: number;
  phone?: string;
  addresses: Address[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  addAddress: (addressData: Partial<Address>) => Promise<{ success: boolean; error?: string }>;
  removeAddress: (addressId: string) => Promise<{ success: boolean; error?: string }>;
  setDefaultAddress: (addressId: string) => Promise<{ success: boolean; error?: string }>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  logout: () => set({ user: null, token: null, isAuthenticated: false }),

  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Credenciales incorrectas');

      set({ user: data.user, token: data.access_token, isAuthenticated: true });
      return { success: true };
    } catch (error: any) {
      console.log('Error en login:', error);
      return { success: false, error: error.message || 'Error al conectar con el servidor' };
    }
  },

  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Error al crear la cuenta');

      set({ user: data.user, token: data.access_token, isAuthenticated: true });
      return { success: true };
    } catch (error: any) {
      console.log('Error en registro:', error);
      return { success: false, error: error.message || 'Error al conectar con el servidor' };
    }
  },

  addAddress: async (addressData) => {
    const { user, token } = get();
    if (!user || !token) return { success: false, error: 'No autenticado' };

    try {
      const response = await fetch(`${API_URL}/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(addressData),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Error al guardar la dirección');

      const updatedAddresses = user.addresses.map(addr => 
        data.is_default ? { ...addr, is_default: false } : addr
      );

      set({
        user: {
          ...user,
          addresses: [...updatedAddresses, data]
        }
      });

      return { success: true };
    } catch (error: any) {
      console.log('Error agregando dirección:', error);
      return { success: false, error: error.message || 'Error al conectar con el servidor' };
    }
  },

  removeAddress: async (addressId) => {
    const { user, token } = get();
    if (!user || !token) return { success: false, error: 'No autenticado' };

    try {
      const response = await fetch(`${API_URL}/addresses/${addressId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al eliminar la dirección');
      }

      set({
        user: {
          ...user,
          addresses: user.addresses.filter(addr => addr.id !== addressId)
        }
      });

      return { success: true };
    } catch (error: any) {
      console.log('Error eliminando dirección:', error);
      return { success: false, error: error.message || 'Error al conectar con el servidor' };
    }
  },

  setDefaultAddress: async (addressId) => {
    const { user, token } = get();
    if (!user || !token) return { success: false, error: 'No autenticado' };

    try {
      const response = await fetch(`${API_URL}/addresses/${addressId}/default`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al actualizar la dirección predeterminada');
      }

      const updatedAddresses = user.addresses.map(addr => ({
        ...addr,
        is_default: addr.id === addressId
      }));

      set({
        user: {
          ...user,
          addresses: updatedAddresses
        }
      });

      return { success: true };
    } catch (error: any) {
      console.log('Error actualizando dirección predeterminada:', error);
      return { success: false, error: error.message || 'Error al conectar con el servidor' };
    }
  }
}));