import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../product';

@Component({
  imports: [],
  selector: 'app-cart',
  styleUrl: './cart.scss',
  templateUrl: './cart.html',
})
export class Cart {
  @Input() items: Product[] = [];
  @Output() remove = new EventEmitter<number>();

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}
