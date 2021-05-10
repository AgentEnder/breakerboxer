import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '@tbs/xplat/core';

export class GamesDbApiKeyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('thegamesdb') !== -1) {
      req = req.clone({
        params: req.params.set('apikey', environment.apiKeys.thegamesdb),
      });
    }
    return next.handle(req);
  }
}
