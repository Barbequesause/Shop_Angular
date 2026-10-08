import { Routes } from '@angular/router';
import { cartNotEmptyGuard, hasOrderGuard } from './guards';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-page/product-page').then((m) => m.ProductPage),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart-page/cart-page').then((m) => m.CartPage),
  },
  {
    path: 'checkout',
    canActivate: [cartNotEmptyGuard],
    loadComponent: () => import('./pages/checkout/checkout').then((m) => m.Checkout),
  },
  {
    path: 'summary',
    canActivate: [hasOrderGuard],
    loadComponent: () => import('./pages/summary/summary').then((m) => m.Summary),
  },
  { path: '**', redirectTo: '' },
];
