import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CargaMasivaCSV {

  constructor (private http: HttpClient) {}

  url = 'http://localhost:4100/api/carga_masiva'

  importarCSV(formData: FormData): Observable<any>{
    return this.http.post<any>(`${this.url}/subir_csv`, formData, {
      reportProgress: true,
      responseType: 'blob' as 'json'
    })
  }

}
