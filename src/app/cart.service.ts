import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Product } from './product';

@Injectable({ providedIn: 'root' })
export class CartService {
  items = signal<CartItem[]>([]);

  count = computed(() => this.items().reduce((sum, i) => sum + i.quantity, 0));
  total = computed(() => this.items().reduce((sum, i) => sum + i.product.price * i.quantity, 0));

  add(product: Product) {
    const found = this.items().find((i) => i.product.id === product.id);
    if (found) {
      this.increase(product.id);
    } else {
      this.items.update((list) => [...list, { product, quantity: 1 }]);
    }
  }

  increase(id: number) {
    this.items.update((list) =>
      list.map((i) => (i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    );
  }

  decrease(id: number) {
    this.items.update((list) =>
      list
        .map((i) => (i.product.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );
  }

  remove(id: number) {
    this.items.update((list) => list.filter((i) => i.product.id !== id));
  }

  clear() {
    this.items.set([]);
  }
}
