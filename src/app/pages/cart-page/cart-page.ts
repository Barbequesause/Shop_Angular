import { Component } from '@angular/core';
import { Cart } from '../../cart/cart';

@Component({
  selector: 'app-cart-page',
  imports: [Cart],
  template: `
    <h1>Koszyk</h1>
    <div class="wrapper"><app-cart /></div>
  `,
  styles: `
    .wrapper {
      max-width: 640px;
    }
  `,
})
export class CartPage {}
