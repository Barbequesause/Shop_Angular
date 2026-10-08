import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from './cart.service';
import { OrderService } from './order.service';

//nie możesz iść z pustym koszykiem
export const cartNotEmptyGuard: CanActivateFn = () => {
  const cart = inject(CartService);
  const router = inject(Router);
  return cart.count() > 0 ? true : router.createUrlTree(['/cart']);
};

//podsumpwanie po złożeniu zamówienia
export const hasOrderGuard: CanActivateFn = () => {
  const orders = inject(OrderService);
  const router = inject(Router);
  return orders.lastOrder() ? true : router.createUrlTree(['/']);
};
