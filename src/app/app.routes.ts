import { Routes } from '@angular/router';
import { cartNotEmptyGuard, hasOrderGuard } from './guards';

//lista stron: adres -> co się wyświetla
//loadComponent = lazy loading (strona ładuje się dopiero jak na nią wejdziemy)
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  //strona główna
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-page/product-page').then((m) => m.ProductPage),
  },
  //strona produktu, :id to numer produktu
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart-page/cart-page').then((m) => m.CartPage),
  },
  //koszyk
  {
    path: 'checkout',
    canActivate: [cartNotEmptyGuard],
    loadComponent: () => import('./pages/checkout/checkout').then((m) => m.Checkout),
  },
  //płatność (guard nie wpuszcza jak koszyk pusty)
  {
    path: 'summary',
    canActivate: [hasOrderGuard],
    loadComponent: () => import('./pages/summary/summary').then((m) => m.Summary),
  },
  //podsumowanie (guard nie wpuszcza jak nie było zamówienia)
  { path: '**', redirectTo: '' },
  //każdy inny adres wraca na stronę główną
];
