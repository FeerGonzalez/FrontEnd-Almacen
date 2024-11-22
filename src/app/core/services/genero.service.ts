import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { Genero } from '../clases/genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  private apiUrl = 'http://localhost:8080/almacen/genero'

  constructor(
    private http:HttpClient, 
    private keycloakService: KeycloakService
  ) { }

  getGeneros():Observable<Genero[]>{
    return this.http.get<Genero[]>(this.apiUrl);
  }

  getGeneroById(id:number):Observable<Genero>{
    return this.http.get<Genero>('${this.apiUrl}/${id}');
  }

  createGenero(genero:Genero):Observable<Genero>{
    return this.http.post<Genero>(this.apiUrl, genero);
  }

  updateGenero(genero:Genero){
    return this.http.put(this.apiUrl, genero);
  }

  deleteGeneroById(id:number){
    return this.http.delete('${this.apiUrl}/${id}');
  }
}
