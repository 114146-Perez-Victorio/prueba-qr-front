import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAllowed } from '../UserAllowed';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private apiUrl = 'http://localhost:8090/visitors'; // URL de tu API

  constructor(private http: HttpClient) {}

  postFormulario(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
