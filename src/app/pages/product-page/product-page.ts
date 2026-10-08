import { CurrencyPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, afterNextRender, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../cart.service';
import { ProductItem } from '../../product-item/product-item';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-page',
  imports: [CurrencyPipe, MatButtonModule, ProductItem],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage {
  cart = inject(CartService);
  private productService = inject(ProductService);

  @Input() id = '';

  stars = [1, 2, 3, 4, 5];

  origin = '50% 50%';

  constructor() {
    afterNextRender(() => {
      import('swiper/element/bundle').then((m) => m.register());
    });
  }

  move(event: MouseEvent) {
    const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * 100;
    const y = ((event.clientY - box.top) / box.height) * 100;
    this.origin = `${x}% ${y}%`;
  }

  get product() {
    return this.productService.getById(Number(this.id));
  }

  get others() {
    return this.productService.products.filter((p) => p.id !== Number(this.id));
  }
}
