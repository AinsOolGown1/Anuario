import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ColeccionesDeFotos } from '../model/Coleccion_Fotos/modeloInterfazColeccionFotoa';
import { environment } from 'src/environments/environment';
import { ColeccionGraduacion } from '../model/Coleccion_Fotos/interfaceColeccionfotos';

@Injectable({
  providedIn: 'root'
})
export class ColeccionFotosGraduacionesService {

  private url: string  = environment.baseUrl +'/coleccion-fotos'

  constructor(private http: HttpClient) { }

  getGraduaciones_coleccion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/mostrar_coleccion_graduaciones`).pipe(
      map(response => response.map(graduaciones => this.mapGraduaciones(graduaciones)))
    );
  }

  private mapGraduaciones(graduaciones: any): ColeccionesDeFotos {
    return {
      campus: graduaciones.campus,
      year_graduacion: graduaciones.year_graduacion,
      fotos_graduaciones: graduaciones.fotos_graduacion,
      sesion: graduaciones.sesion
    };
  }

  ObtenerImagenesGraduaciones(campus: string, year_graduacion: string, sesion: string): Observable<any> {
    return this.http.get<any>(`${this.url}/buscar/imagen/${campus}/${year_graduacion}/${sesion}`);
  }

  guardarFotosGraduaciones(coleccion: ColeccionesDeFotos): Observable<any> {
    const formData = new FormData();

    //* Agregar los campos al FormData
    formData.append('campus', coleccion.campus);
    formData.append('year_graduacion', String(coleccion.year_graduacion));

      //* Iterar sobre el array de fotos y agregar cada archivo al FormData
  if (Array.isArray(coleccion.fotos_graduaciones)) {
    for (let i = 0; i < coleccion.fotos_graduaciones.length; i++) {
      formData.append('fotos_graduaciones', coleccion.fotos_graduaciones[i]);
    }
  } else {
    console.error('fotos_graduaciones no es un array de archivos');
  }
    formData.append('sesion', String(coleccion.sesion));

    console.log(formData)

    return this.http.post(`${this.url}/cargar-coleccion`, formData);
  }

  obtenerColeccionFotosGraduaciones(_id: string): Observable<any> {
    // Cambia 'any' a una interfaz adecuada si la tienes
    return this.http.get<any>(`${this.url}/mostrar_coleccion_graduaciones/${_id}`);
  }

  ColeccionesDeGraduaciones(): Observable<ColeccionGraduacion[]> {
    return this.http.get<ColeccionGraduacion[]>(`${this.url}/coleccion_graduaciones`);
  }

}
