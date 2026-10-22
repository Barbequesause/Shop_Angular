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
  //schema potrzebna do <swiper-container> bo to nie jest zwykły angularowy element
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage implements AfterViewInit, OnDestroy {
  cart = inject(CartService);
  private productService = inject(ProductService);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  //sprawdza czy kod działa w przeglądarce (serwer nie ma document więc by się wywaliło)

  @Input() id = '';
  //numer produktu z adresu /product/2

  stars = [1, 2, 3, 4, 5];
  //do rysowania gwiazdek w html

  private readonly zoomFrame = viewChild<ElementRef<HTMLElement>>('zoomFrame');
  //łapie ramkę ze zdjęciem (#zoomFrame w html)
  private zoom?: { uninit(): void };
  //tu trzymamy zoom żeby go potem wyłączyć

  ngAfterViewInit(): void {
    //odpala się jak strona już się wyświetli
    if (!this.isBrowser) return;
    //na serwerze nic nie robimy

    this.initCarousel();

    if (this.zoomFrame()) {
      //jak ramka istnieje to włączamy zoom
      this.zoom = new InnerImageZoom('.image-frame.iiz', {
        zoomScale: 2.5,
        //ile razy przybliża
      }) as unknown as {
        uninit(): void;
      };
    }
  }

  ngOnDestroy(): void {
    this.zoom?.uninit();
    //jak wychodzimy ze strony to sprzątamy po zoomie
  }

  private initCarousel(): void {
    import('swiper/element/bundle').then((m) => m.register());
    //włącza karuzelę (swiper)
  }

  get product() {
    return this.productService.getById(Number(this.id));
    //szuka produktu o tym id (Number bo z adresu to tekst)
  }

  get others() {
    return this.productService.products.filter((p) => p.id !== Number(this.id));
    //reszta produktów do karuzeli (bez tego który oglądamy)
  }
}
