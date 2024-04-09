import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private BaseUrl:string='https://localhost:7086/Api/User/'
  constructor(public httpClient:HttpClient) { }

  loginUser(endpoint:string,data:object):Observable<any>{
    return this.httpClient.post<any>(this.BaseUrl+endpoint,data);
  }

  registerUser(endpoint:string,data:object):Observable<any>{
    return this.httpClient.post<any>(this.BaseUrl+endpoint,data);
  }
}
