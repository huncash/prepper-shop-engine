import { useSyncExternalStore } from "react";
import type { Product } from "./data-provider";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

type Listener = () => void;

let state: CartItem[] = [];
const listeners = new Set<Listener>();

function notify() {
  for (const l of listeners) l();
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): CartItem[] {
  return state;
}

export function addItem(product: Pick<Product, "id" | "name" | "price">): void {
  const existing = state.find((i) => i.id === product.id);
  if (existing) {
    state = state.map((i) =>
      i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
    );
  } else {
    state = [...state, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
  }
  notify();
}

export function removeItem(id: number): void {
  state = state.filter((i) => i.id !== id);
  notify();
}

export function getCartItems(): CartItem[] {
  return state;
}

export function clearCart(): void {
  state = [];
  notify();
}

export function useCartStore(): CartItem[] {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
