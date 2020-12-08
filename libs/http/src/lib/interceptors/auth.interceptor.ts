import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '@tbs/user';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService) {
        if (!authService) {
            throw Error('Cannot use auth interceptor without providing Authentication!');
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.token$.pipe(
            switchMap(x => {
                req.headers.append('Authentication', `Bearer ${x}`);
                return next.handle(req);
            })
        )
    }
}