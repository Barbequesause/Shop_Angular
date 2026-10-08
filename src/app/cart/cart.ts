import { CurrencyPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, MatButtonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cart = inject(CartService);

  @Input() editable = true;
}
