import { create } from 'zustand';

// Utilizamos tu interfaz exacta
export interface Product {
  id: string;
  name: string;
  description?: string;
  category?: string;
  stock?: number;
  price: number;
  image_url: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  getSubtotal: () => number;
  getShippingCost: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (product, quantity = 1) => {
    const currentItems = get().items;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      set({
        items: currentItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      });
    } else {
      set({ items: [...currentItems, { product, quantity }] });
    }
  },

  removeFromCart: (productId) => {
    set({ items: get().items.filter(item => item.product.id !== productId) });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set({
      items: get().items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    });
  },

  clearCart: () => set({ items: [] }),

  getSubtotal: () => {
    return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  },

  getShippingCost: () => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0) return 0; 
    
    // Tarifa fija inicial (se puede ajustar luego según la lógica de negocio)
    return 15000; 
  },

  getDiscount: () => {
    const subtotal = get().getSubtotal();
    // 10% de descuento aplicado al subtotal
    return subtotal * 0.10; 
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0) return 0;
    
    const shipping = get().getShippingCost();
    const discount = get().getDiscount();
    
    return subtotal + shipping - discount;
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  }
}));