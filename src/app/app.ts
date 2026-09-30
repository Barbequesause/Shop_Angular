import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from './product';
import { ProductList } from './product-list/product-list';
import { Cart } from './cart/cart';

@Component({
  imports: [RouterOutlet, ProductList, Cart],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  products = [
    { id: 1, name: 'Klawiatura', price: 199 },
    { id: 2, name: 'Mysz', price: 99 },
    { id: 3, name: 'Monitor', price: 899 },
    { id: 4, name: 'Słuchawki', price: 149 },
  ];

  cart: Product[] = [];

  addToCart(product: Product) {
    this.cart = [...this.cart, product];
  }
  removeFromCart(index: number) {
    this.cart = this.cart.filter((_, i) => i !== index);
  }
}
