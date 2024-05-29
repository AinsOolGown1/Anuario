import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ColeccionesDeFotos } from '../model/Coleccion_Fotos/modeloInterfazColeccionFotoa';

@Injectable({
  providedIn: 'root'
})
export class ColeccionFotosGraduacionesService {

  url = 'http://localhost:4000/api/agregar_coleccionfotos/';

  constructor(private http: HttpClient) { }

  getGraduaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.url).pipe(
      map(response => response.map(graduaciones => this.mapGraduado(graduaciones)))
    );
  }

  private mapGraduado(graduaciones: any): ColeccionesDeFotos {
    return {
      campus: graduaciones.campus,
      year_graduacion: graduaciones.year_graduacion,
      fotos_graduacion: graduaciones.fotos_graduacion,
      sesion: graduaciones.sesion
    };
  }

  ObtenerImagenesGraduaciones(campus: string, year_graduacion: string, sesion: string): Observable<any> {
    return this.http.get<any>(`${this.url}buscar/imagen/${campus}/${year_graduacion}/${sesion}`);
  }

  /*ImagenesGraduaciones(campus: string, year_graduacion: string, sesion: string): Observable<any> {
    return this.http.get(`${this.url}buscar/imagen/${campus}/${year_graduacion}/${sesion}`, {responseType: 'blob'});
  }*/

  guardarFotosGraduaciones(formData: FormData): Observable<any> {
    return this.http.post(`${this.url}coleccion/`, formData);
  }

}
