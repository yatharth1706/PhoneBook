import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler ): Observable<any>{
    // handle the request
    request = this.addAuthHeader(request);

    // call next and handle response

    return next.handle(request).pipe(
      catchError((error : HttpErrorResponse) => {
        console.log(error);  
        return throwError(error);
      })
    )
  }

  addAuthHeader(request : HttpRequest<any>){
    // get the access token
    const token = this.authService.getAccessToken();

    if(token){
      // append the access token to request header
      return request.clone({
        setHeaders:{
          'x-access-token': token
        }
      })

    }
    return request;
    
  }
}
