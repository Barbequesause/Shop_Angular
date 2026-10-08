import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  products: Product[] = [
    {
      id: 1,
      name: 'Klawiatura',
      price: 199,
      rating: 4.5,
      description: 'cool głośna klawiatura',
      image: '/img/klawiatura.jpg',
      bigImage: '/img/klawiatura.jpg',
    },
    {
      id: 2,
      name: 'Mysz',
      price: 99,
      rating: 4,
      description: 'myszka do klikania',
      image: '/img/myszka.jpg',
      bigImage: '/img/myszka.jpg',
    },
    {
      id: 3,
      name: 'Monitor',
      price: 899,
      rating: 5,
      description: 'duży monitor',
      image: '/img/monitor.jpg',
      bigImage: '/img/monitor.jpg',
    },
    {
      id: 4,
      name: 'Słuchawki',
      price: 149,
      rating: 3.5,
      description: 'Nsłychać dzwiek',
      image: '/img/słuchawki.jpg',
      bigImage: '/img/sluchawki.jpg',
    },
    {
      id: 5,
      name: 'Zaparzacz',
      price: 22493.98,
      rating: 2,
      description: 'fajny jest',
      image: '/img/zaparzacz.jpg',
      bigImage: '/img/zaparzacz.jpg',
    },
  ];

  getById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }
}
