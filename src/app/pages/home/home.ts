import { Component, inject } from '@angular/core';
import { ProductList } from '../../product-list/product-list';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-home',
  imports: [ProductList],
  template: `
    <h1>Produkty</h1>
    <app-product-list [products]="products" />
  `,
})
export class Home {
  protected readonly products = inject(ProductService).products;
}
