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
//tak wygląda zamówienie

@Injectable({ providedIn: 'root' })
export class OrderService {
  lastOrder = signal<Order | null>(null);
  //ostatnie zamówienie (null = jeszcze nic nie zamówiono), z tego korzysta podsumowanie

  //udaje wysłanie zamówienia, czasem (10%) rzuca błąd
  async placeOrder(data: Omit<Order, 'id'>): Promise<Order> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    //czeka sekundę jakby się naprawdę wysyłało

    if (Math.random() < 0.1) {
      throw new Error('Płatność nie powiodła się. Spróbuj ponownie.');
    }
    //losuje liczbę od 0 do 1, jak mniejsza niż 0.1 to błąd (czyli 10% szans)

    const order: Order = { ...data, id: 'ZAM-' + Math.floor(Math.random() * 100000) };
    //dodaje losowy numer zamówienia
    this.lastOrder.set(order);
    return order;
  }
}
