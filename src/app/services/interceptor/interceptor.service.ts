import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from "rxjs";

import { APP_CONFIG } from "../appConfig/appConfig.constants";
import { IAppConfig } from "../appConfig/appConfig.interface";

@Injectable()

export class InterceptorService implements HttpInterceptor{
  
  private apiBaseUrl: string;

  constructor(@Inject( APP_CONFIG ) private config: IAppConfig) { 
    this.apiBaseUrl = config.API_BASE_URL;
  }
  
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("Request interceptor: ", req);
    console.log("Api base url: ", this.apiBaseUrl);
    req = req.clone({
      headers:req.headers.set(
        "Authorization",
        "Bearer" + localStorage.getItem("token")
      ),
      url:this.apiBaseUrl + "" + req.url
    });
    console.log("url final: ", req.url);
    
    return next.handle(req);
  }
}
