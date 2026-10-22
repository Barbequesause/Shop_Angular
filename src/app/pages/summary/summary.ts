import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-summary',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './summary.html',
  styleUrl: './summary.scss',
})
export class Summary {
  order = inject(OrderService).lastOrder;
  //bierze ostatnie zamówienie z serwisu
}
