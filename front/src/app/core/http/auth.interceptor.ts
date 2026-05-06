import { inject } from "@angular/core";
import { HttpInterceptorFn } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  let authedReq = req;
  if (localStorage.hasOwnProperty('token')) {
    const token = localStorage.getItem('token');
    authedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(authedReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        localStorage.removeItem('token');
        router.navigate(['login']);
      }
      return throwError(() => error);
    })
  );
};
