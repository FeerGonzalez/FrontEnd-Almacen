import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Director } from '../clases/director';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  private apiUrl = 'http://localhost:8080/almacen/director'

  constructor(private http:HttpClient, private keycloakService: KeycloakService) { }

  getDirectores():Observable<Director[]>{
    return this.http.get<Director[]>(this.apiUrl);
  }

  getDirectorById(id:number):Observable<Director>{
    return this.http.get<Director>('${this.apiUrl}/${id}');
  }

  createDirector(director:Director):Observable<Director>{
    return this.http.post<Director>(this.apiUrl, director);
  }

  updateDirector(director:Director){
    return this.http.put(this.apiUrl, director);
  }

  deleteDirectorById(id:number){
    return this.http.delete('${this.apiUrl}/${id}');
  }
}
