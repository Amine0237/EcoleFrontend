import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private url = 'http://localhost:8082/etudiants';

  constructor(private http: HttpClient) { }

  getEtudiantById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }
}
