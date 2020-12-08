import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

export class BaseUrlInterceptor implements HttpInterceptor {

  constructor(private baseUrl: string) {
    this.baseUrl = this.baseUrl.replace(/\/$/, ''); // trim end slash of base url
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const urlPath = req.url.replace(/^\/+/, ''); // trim starting slashes of the partial url
    req = req.clone({
      url: `${this.baseUrl}/${urlPath}`
    });
    return next.handle(req);
  }
}
