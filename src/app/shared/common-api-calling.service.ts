import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommonApiCallingService {

  constructor(private httpClient:HttpClient) { }

  // public postUrl(origin:string,requestObj:any){
  //   return this.httpClient.post(`${environment.origin_url + origin}`,requestObj);
  // }

  public getURL(origin:string):Observable<any>{
    return this.httpClient.get(`${environment.origin_url + origin}`,{ observe:'response'});
  }

  public postURL(origin:string,requestObj:any):Promise<any>{
    return new Promise((resolve,reject) => {
      this.httpClient.post(`${environment.origin_url + origin}`,requestObj).toPromise().then((response:any)=>{
        resolve(response);
      },(error)=>{
        reject(error);
      });
    });
  }

}
