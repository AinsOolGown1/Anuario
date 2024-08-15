import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Eventos } from '../model/EventosProximos/modeloEventosProximos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EventosService{

    private url: string  = environment.baseUrl +'/eventos'

    constructor(private http: HttpClient) { }

    private mapEvento(eventos: any): Eventos {
        return {
          _id: eventos._id,
          campus_evento: eventos.campus_evento,
          year_evento: eventos.year_evento,
          img_evento: eventos.img_evento,
          sesion: eventos.sesion
        };
      }

    getGraduaciones_eventos(): Observable<any[]> {
        return this.http.get<any[]>(`${this.url}/ver_info_evento`).pipe(
          map(response => response.map(eventos => this.mapEvento(eventos)))
        );
    }

    guardarEvento(evento: Eventos): Observable <any>{
        const formData = new FormData();
        formData.append('campus_evento', evento.campus_evento);
        formData.append('year_evento', String(evento.year_evento));
        formData.append('img_evento', evento.img_evento);
        formData.append('sesion', String(evento.sesion));       

        return this.http.post(`${this.url}/cargar_evento`, formData);
    }

    obtenerFotoEvento(_id: string): Observable<any> {
      return this.http.get(`${this.url}/ver_imagen/${_id}`, {responseType: 'blob'});
    }
}