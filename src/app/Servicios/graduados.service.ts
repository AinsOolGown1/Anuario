import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa map para transformar la respuesta JSON
import { IngresarGraduados } from '../model/AnuarioGraduados/ingresar-graduados';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GraduadosService {

  private url: string = environment.baseUrl +'/graduados'

  constructor(private http: HttpClient) { }

  getGraduados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/obtener`).pipe(
      map(response => response.map(graduado => this.mapGraduado(graduado)))
    );
  }

  guardarDatosExcel(datos: any[]): Observable<any> {
    return this.http.post(`${this.url}guardar-desde-excel/`, datos);
  }

  //* Función auxiliar para mapear el objeto graduado recibido del servidor a un objeto IngresarGraduados
  private mapGraduado(graduado: any): IngresarGraduados {
    return {
      carnet: graduado.carnet,
      nombres: graduado.nombres,
      apellidos: graduado.apellidos,
      carrera: graduado.carrera,
      facultad: graduado.facultad,
      frase_emotiva: graduado.frase_emotiva,
      campus: graduado.campus,
      year_graduado: graduado.year_graduado,
      telefono_graduado: graduado.telefono_graduado,
      correo_graduado: graduado.correo_graduado,
      estado_graduado: graduado.estado_graduado,
      destacado_graduado: graduado.destacado_graduado,
      foto_graduado: graduado.foto_graduado,
      qr_graduado: graduado.qr_graduado
    };
  }

  eliminarGraduado(id: string): Observable<any> {
    return this.http.delete(`${this.url}/eliminar/${id}`);
  }

  guardarGraduado(graduado: IngresarGraduados): Observable<any> {
    const formData = new FormData();
    //* Agregar los campos al FormData
    formData.append('carnet', graduado.carnet);
    formData.append('nombres', graduado.nombres);
    formData.append('apellidos', graduado.apellidos);
    formData.append('carrera', graduado.carrera);
    formData.append('facultad', graduado.facultad);
    formData.append('frase_emotiva', graduado.frase_emotiva);
    formData.append('campus', graduado.campus);
    formData.append('year_graduado', String(graduado.year_graduado));
    formData.append('telefono_graduado', String(graduado.telefono_graduado));
    formData.append('correo_graduado', String(graduado.correo_graduado))
    formData.append('estado_graduado', String(graduado.estado_graduado));
    formData.append('destacado_graduado', String(graduado.destacado_graduado));
    formData.append('foto_graduado', graduado.foto_graduado);
    formData.append('qr_graduado', graduado.qr_graduado);

    return this.http.post(`${this.url}/agregar`, formData);
  }

  obtenerEstudiantePorCarnet(carnet: string): Observable<IngresarGraduados> {
    return this.http.get<IngresarGraduados>(`${this.url}/buscar-carnet/${carnet}`);
  }

  obtenerFotoGraduado(carnet: string): Observable<any> {
    return this.http.get(`${this.url}/buscar/imagen/${carnet}`, {responseType: 'blob'});
  }

  obtenerUngraduado(id: string): Observable<IngresarGraduados> {
    return this.http.get<IngresarGraduados>(`${this.url}/obtener/${id}`); // Especificamos el tipo de datos esperado como IngresarGraduados
  }

  editarGraduado(id: string, graduado: IngresarGraduados): Observable<any> {
    return this.http.put(`${this.url}/actualizar/${id}`, graduado);
  }

}
