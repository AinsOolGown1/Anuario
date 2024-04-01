import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IngresarGraduados } from '../model/ingresar-graduados';

@Injectable({
  providedIn: 'root'
})
export class GraduadosService {

  url = 'http://localhost:4000/api/agregar_graduados/';

  constructor(private http: HttpClient) { }

  getGraduados(): Observable<any>{
    return this.http.get(this.url);
  }

  eliminarGraduado(id: string):Observable<any> {
    return this.http.delete(this.url + id);
  }

  guardarGraduado(graduado: IngresarGraduados): Observable<any>{
    return this.http.post(this.url, graduado);
  }

}

