'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '@/types/database';

type CartContextType = {
  items: CartItem[];
  count: number;
  add: (item: CartItem) => void;
  remove: (productId: string) => void;
  contains: (productId: string) => boolean;
  clear: () => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  count: 0,
  add: () => {},
  remove: () => {},
  contains: () => false,
  clear: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  /* Hydrate from localStorage after mount */
  useEffect(() => {
    try {
      const stored = localStorage.getItem('rd-cart');
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  /* Persist whenever items change */
  useEffect(() => {
    localStorage.setItem('rd-cart', JSON.stringify(items));
  }, [items]);

  function add(item: CartItem) {
    setItems((prev) =>
      prev.some((i) => i.productId === item.productId) ? prev : [...prev, item]
    );
  }

  function remove(productId: string) {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }

  function contains(productId: string) {
    return items.some((i) => i.productId === productId);
  }

  function clear() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, count: items.length, add, remove, contains, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
