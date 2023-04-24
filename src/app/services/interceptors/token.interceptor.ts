import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private usuarioService : UsuarioService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.usuarioService.obterTokenUsuario;
        const requestUrl: Array<any> = request.url.split('/');
        const apiUrl: Array<any> = environment.apiUrl.split('/');

        if (token && requestUrl[2] === apiUrl[2]) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    token: `${token}`
                }
            });

            return next.handle(request).pipe(
              catchError((err) => this.handleError(err))
            );
        }

        else {
            return next.handle(request);
        }
    }

    private handleError(errorResponse: any): Observable<any> {
      console.log('error', errorResponse);
      if(errorResponse instanceof HttpErrorResponse && errorResponse.status === 401)
        this.usuarioService.deslogar();
      return throwError(errorResponse);
    }
}