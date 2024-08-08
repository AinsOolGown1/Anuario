import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CargaMasivaCSV {

  constructor (private http: HttpClient) {}

  private url: string  = environment.baseUrl +'/carga_masiva'

  importarCSV(formData: FormData): Observable<any>{
    return this.http.post<any>(`${this.url}/subir_csv`, formData, {
      reportProgress: true,
      responseType: 'blob' as 'json'
    })
  }

}
