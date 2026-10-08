import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  //gdzie kiedy
  { path: 'product/:id', renderMode: RenderMode.Server },
  { path: 'checkout', renderMode: RenderMode.Client },
  { path: 'summary', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Prerender },
];
