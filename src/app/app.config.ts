import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';

registerLocaleData(localePl);
//dzięki temu ceny są po polsku (19978438,05 zł)

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      //:id z adresu trafia do @Input() id w komponencie
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      //po wejściu na nową stronę przewija na górę
    ),
    provideClientHydration(),
    { provide: LOCALE_ID, useValue: 'pl' },
  ],
};
