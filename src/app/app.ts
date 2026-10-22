import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Cart } from './cart/cart';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, Cart],
  //to czego używamy w app.html
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  cart = inject(CartService);
  //potrzebne do licznika "Koszyk (2)" w headerze
}
