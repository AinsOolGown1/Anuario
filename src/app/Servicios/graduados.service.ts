import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraduadosService {

  url = 'http://localhost:4000/api/agregar_graduados/';

  constructor(private http: HttpClient) { }

  getGraduados(): Observable<any>{
    return this.http.get(this.url);
  }
}
