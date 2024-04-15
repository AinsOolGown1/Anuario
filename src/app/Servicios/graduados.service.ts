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
    const formData = new FormData();
    formData.append('carnet', graduado.carnet);
    formData.append('nombres', graduado.nombres);
    formData.append('apellidos', graduado.apellidos);
    formData.append('carrera', graduado.carrera);
    formData.append('facultad', graduado.facultad);
    formData.append('frase_emotiva', graduado.frase_emotiva);
    formData.append('campus', graduado.campus);
    formData.append('year_graduado', String(graduado.year_graduado));
    formData.append('estado_graduado', String(graduado.estado_graduado));
    formData.append('destacado_graduado', String(graduado.destacado_graduado));
    formData.append('foto_graduado', graduado.foto_graduado);
    formData.append('qr_graduado', graduado.qr_graduado);

    return this.http.post(this.url, formData);
  }

  agregarArchivo(uri: string, formdata: FormData ): Observable<any>{
    return this.http.post(uri, formdata);
  }

  obtenerGraduado(id: string): Observable<any>{
    return this.http.get(this.url + id);
  }

  editarGraduado(id: string, graduado: IngresarGraduados): Observable<any>{
    return  this.http.put(this.url + id , graduado );
  }

}

