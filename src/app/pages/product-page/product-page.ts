import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  PLATFORM_ID,
  inject,
  viewChild,
} from '@angular/core';
import InnerImageZoom from 'inner-image-zoom';
import { CartService } from '../../cart.service';
import { ProductItem } from '../../product-item/product-item';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-page',
  imports: [CurrencyPipe, ProductItem],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage implements AfterViewInit, OnDestroy {
  cart = inject(CartService);
  private productService = inject(ProductService);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  @Input() id = '';

  stars = [1, 2, 3, 4, 5];

  private readonly zoomFrame = viewChild<ElementRef<HTMLElement>>('zoomFrame');
  private zoom?: { uninit(): void };

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.initCarousel();

    // małe opóźnienie, żeby zdjęcie zdążyło się wyrenderować
    setTimeout(() => this.initZoom(), 100);
  }

  private initZoom(): void {
    console.log('zoomFrame:', this.zoomFrame());

    if (!this.zoomFrame()) return;

    this.zoom = new InnerImageZoom('.image-frame.iiz', {
      zoomScale: 2.5,
      zoomType: 'hover',
      zoomPreload: true,
      fadeDuration: 0,
    }) as unknown as { uninit(): void };

    console.log('po inicjalizacji:', document.querySelector('.iiz')?.outerHTML);
  }

  ngOnDestroy(): void {
    this.zoom?.uninit();
  }

  private initCarousel(): void {
    import('swiper/element/bundle').then((m) => m.register());
  }

  get product() {
    return this.productService.getById(Number(this.id));
  }

  get others() {
    return this.productService.products.filter((p) => p.id !== Number(this.id));
  }
}
