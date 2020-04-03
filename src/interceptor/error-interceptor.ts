import { HttpInterceptor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {HttpHandler , HttpRequest , HttpEvent , HTTP_INTERCEPTORS } from "@angular/common/http"; 
import { Observable } from "rxjs/Rx";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Passou no interceptor');    

    return next.handle(req).
    catch((error , caught) => {

        let errorObj = error;
        if (errorObj.error) { // se errorObj contém a variável error
            errorObj = errorObj.error;
        }

        if(!errorObj.status) { // Não é um Json
            errorObj = JSON.parse(errorObj);
        }

        console.log("Erro detectado pelo interceptor");
        console.log(errorObj);

        return Observable.throw(errorObj);
    }) as any;
  }
}


export const ErrorInterceptorProvider  = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}