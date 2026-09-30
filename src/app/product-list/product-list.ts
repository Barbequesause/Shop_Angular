import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../product';
import { ProductItem } from '../product-item/product-item';

@Component({
  imports: [ProductItem],
  selector: 'app-product-list',
  styleUrl: './product-list.scss',
  templateUrl: './product-list.html',
})
export class ProductList {
  @Input() products: Product[] = [];
  @Output() addProduct = new EventEmitter<Product>();
}
