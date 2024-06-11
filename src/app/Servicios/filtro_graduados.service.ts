import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private URL = 'http://localhost:4100/api/filtro';

  constructor(private http: HttpClient) {}

  getFilteredData(year?: number, campus?: string, faculty?: string, career?: string): Observable<any> {
    const url = `${this.URL}/${year || ''}/${encodeURIComponent(campus || '')}/${encodeURIComponent(faculty || '')}/${encodeURIComponent(career || '')}`;
    return this.http.get<any>(url);
  }
}
