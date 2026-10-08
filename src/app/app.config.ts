import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';

registerLocaleData(localePl);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(), //id idzie do komponent
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    provideClientHydration(),
    { provide: LOCALE_ID, useValue: 'pl' },
  ],
};
