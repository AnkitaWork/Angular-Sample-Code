// External Imports
import { Injectable, Injector } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { tap } from "rxjs/operators";


// Internal Imports
import { LocalStorageUtilityService } from './local-storage-utility.service';

@Injectable({
  providedIn: "root"
})
export class InterceptedHttp implements HttpInterceptor {

  constructor(private _localStorageUtilityService:LocalStorageUtilityService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    req = req.clone({
        headers: req.headers.set('X-Taxyear', '2019')
    })
   
    if (!req.headers.has("Content-Type") && req.method === "POST") {
      req = req.clone({
        headers: req.headers.set("Content-Type", "application/json")
      });
    }

    return next
      .handle(req)
      .pipe(tap(res => {
        if (res instanceof HttpResponse) {
          this.unwrapHttpValue(res);
        }
        return res;
      }, error => {
        //this.handleError(error);
        return throwError(error);
      }))
  }

  unwrapHttpValue(response: any) {
    if (response != null) {
      // Store XSRF-Token
      if (response.headers.get('XSRF-TOKEN') != null) {
        this._localStorageUtilityService.addToLocalStorage('xsrfToken', response.headers.get('XSRF-TOKEN'));
      }
    }
  }

}
