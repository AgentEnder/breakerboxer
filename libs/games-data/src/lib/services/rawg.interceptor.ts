import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '@tbs/xplat/core';

export class GamesDbApiKeyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('rawg.io') !== -1) {
      req = req.clone({
        params: req.params.set('key', environment.apiKeys.rawg),
      });
    }
    return next.handle(req);
  }
}
