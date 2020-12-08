import { HttpBackend, HttpClient, HttpInterceptor } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';

import { AuthService } from '@tbs/user';
import { MyHttpHandler } from './http-extensions';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';

@Injectable({
  providedIn: 'root',
})
export class HttpClientFactory {

  authInterceptor: AuthInterceptor;

  constructor(
    private backend: HttpBackend,
    @Optional() private authService: AuthService
  ) {
  }

  public createHttpClient(
    baseUrl: string,
    auth = true,
    interceptors: HttpInterceptor[]
  ): HttpClient {
    if (baseUrl) {
      interceptors.push(new BaseUrlInterceptor(baseUrl));
    }

    if (auth) {
      this.authInterceptor = new AuthInterceptor(this.authService);
      interceptors.push(this.authInterceptor);
    }

    const handler = new MyHttpHandler(this.backend, interceptors);
    const client = new HttpClient(handler);
    return client;
  }
}
