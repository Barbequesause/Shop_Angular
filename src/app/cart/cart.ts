import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  @Input() items: Product[] = [];
  @Output() remove = new EventEmitter<number>();

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}
