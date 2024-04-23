import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private BaseUrl:string = 'https://localhost:7086/Api/'
  
  private authHeader = new HttpHeaders({
    'Accept': "application/json",
    Authorization: `Bearer ${localStorage.getItem('userToken')}` || ""
  })
  constructor(public httpClient: HttpClient) { }

  loginUser(endpoint: string, data: Object): Observable<any> {
    return this.httpClient.post<any>(this.BaseUrl + endpoint, data);
  }

  registerUser(endpoint: string, data: Object): Observable<any> {
    return this.httpClient.post<any>(this.BaseUrl + endpoint, data);
  }

  getAllNotes(endpoint: string): Observable<any> {
    return this.httpClient.get<any>(this.BaseUrl+endpoint, {headers: this.authHeader});
  }

  trashNote(endpoint: string, data: Object): Observable<any> {
    return this.httpClient.patch<any>(this.BaseUrl+endpoint, data, {headers: this.authHeader});
  }

  addNote(endpoint: string, data: Object): Observable<any> {
    return this.httpClient.post<any>(this.BaseUrl+endpoint, data, {headers: this.authHeader});
  }

  archiveNote(endpoint: string): Observable<any> {
    return this.httpClient.patch<any>(this.BaseUrl+endpoint, {}, {headers: this.authHeader});
  }
}