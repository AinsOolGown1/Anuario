import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class IniciarLoginService {

    constructor (private http: HttpClient) {}

    private url: string  = environment.baseUrl +'/auth'

    iniciarSesion(email: string, password: string): Observable<any> {
        const body = { email, password };
        return this.http.post(`${this.url}/LoginAuth`, body);
      }
}