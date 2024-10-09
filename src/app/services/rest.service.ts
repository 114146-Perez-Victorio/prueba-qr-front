import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAllowed } from '../UserAllowed';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private apiUrl = 'http://localhost:8080/visitors'; // URL de tu API
  private generateIMGQR = 'http://localhost:8080/api/visitor-qr/image';

  constructor(private http: HttpClient) {}

  postFormulario(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  postQRDATA(data: any):Observable<any>{
    return this.http.post("http://localhost:8080/api/visitor-qr/generate",data)
  }

  getQrImage(id: number): Observable<Blob> {
    return this.http.get<Blob>(`${this.generateIMGQR}/${id}`, { responseType: 'blob' as 'json' });
  }
  
}
