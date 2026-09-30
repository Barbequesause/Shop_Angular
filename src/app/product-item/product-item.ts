import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../product';

@Component({
  selector: 'app-product-item',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItem {
  @Input({ required: true }) product!: Product;
  @Output() addProduct = new EventEmitter<Product>();
}
