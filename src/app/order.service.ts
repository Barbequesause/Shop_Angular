import { Injectable, signal } from '@angular/core';
import { CartItem } from './product';

export interface Order {
  id: string;
  name: string;
  address: string;
  payment: string;
  items: CartItem[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  lastOrder = signal<Order | null>(null);

  async placeOrder(data: Omit<Order, 'id'>): Promise<Order> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (Math.random() < 0.1) {
      throw new Error('Płatność nie powiodła się. Spróbuj ponownie.');
    }

    const order: Order = { ...data, id: 'ZAM-' + Math.floor(Math.random() * 100000) };
    this.lastOrder.set(order);
    return order;
  }
}
