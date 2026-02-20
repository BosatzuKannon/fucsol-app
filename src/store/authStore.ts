import { create } from 'zustand';

const API_URL = 'http://192.168.40.9:3000'; 

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  points: number;
  phone?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
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
  }
}));