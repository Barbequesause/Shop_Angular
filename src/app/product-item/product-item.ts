import { CurrencyPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CartService } from '../cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-item',
  imports: [CurrencyPipe, RouterLink, MatButtonModule, MatCardModule],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItem {
  cart = inject(CartService);

  @Input({ required: true }) product!: Product;
}
