import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl:string = environment.baseUrl +'/filtro_gallery/images'

  constructor(private http: HttpClient) { }

  getImages(filters: any): Observable<any[]> {
    let params = new HttpParams();
    if (filters.campus) params = params.append('campus', filters.campus);
    if (filters.year) params = params.append('year', filters.year.toString());
    if (filters.session) params = params.append('session', filters.session);

    return this.http.get<any[]>(this.apiUrl, { params });
  }
}
