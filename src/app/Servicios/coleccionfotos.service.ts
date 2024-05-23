import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ColeccionGraduacion } from '../model/interfaceColeccionfotos';

@Injectable({
  providedIn: 'root'
})
export class ColeccionFotosGraduacionesService {

  url = 'http://localhost:4000/api/agregar_coleccionfotos/';

  constructor(private http: HttpClient) { }

  getImagenesGraduaciones(): Observable<any> {
    return this.http.get<any>(`${this.url}buscar/imagen`);
  }

  guardarFotosGraduaciones(formData: FormData): Observable<any> {
    return this.http.post(`${this.url}coleccion/`, formData);
  }

}
