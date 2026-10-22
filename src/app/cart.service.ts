import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Product } from './product';

@Injectable({ providedIn: 'root' })
//serwis na całą aplikację (każdy komponent widzi ten sam koszyk)
export class CartService {
  items = signal<CartItem[]>([]);
  //lista rzeczy w koszyku, na start pusta

  count = computed(() => this.items().reduce((sum, i) => sum + i.quantity, 0));
  //liczy ile sztuk w sumie (liczba przy "Koszyk (2)")
  total = computed(() => this.items().reduce((sum, i) => sum + i.product.price * i.quantity, 0));
  //suma w zł (cena razy ilość)

  add(product: Product) {
    const found = this.items().find((i) => i.product.id === product.id);
    //czy produkt już jest w koszyku
    if (found) {
      this.increase(product.id);
    } else {
      this.items.update((list) => [...list, { product, quantity: 1 }]);
    }
  }
  //jak jest to dodaje ilość (2x klaw), jak nie ma to dodaje nową pozycję

  increase(id: number) {
    this.items.update((list) =>
      list.map((i) => (i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    );
  }
  //przycisk + (tylko ten produkt dostaje +1)

  decrease(id: number) {
    this.items.update(
      (list) =>
        list
          .map((i) => (i.product.id === id ? { ...i, quantity: i.quantity - 1 } : i))
          //odejmuje 1
          .filter((i) => i.quantity > 0),
      //wyrzuca rzeczy których jest 0
    );
  }
  //przycisk -

  remove(id: number) {
    this.items.update((list) => list.filter((i) => i.product.id !== id));
  }
  //zostawia wszystko oprócz produktu o tym id

  clear() {
    this.items.set([]);
  }
  //po zamówieniu wrzuca pustą listę
}
