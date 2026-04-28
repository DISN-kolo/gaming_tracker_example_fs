import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.hasOwnProperty('token')) {
    const token = localStorage.getItem('token');
    console.log("we have a token and it's ", token);
    const authedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authedRequest);
  }
  console.log("we had no token");
  return next(req);
};
