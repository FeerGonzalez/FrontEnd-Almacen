import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pelicula } from '../clases/pelicula';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl = 'http://localhost:8080/almacen/pelicula'

  constructor(
    private http:HttpClient, 
    private keycloakService: KeycloakService
  ) {}

  getMovies():Observable<Pelicula[]>{
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  getOnlyMovies(): Observable<Pelicula[]> {
    return this.http.get<{ data: Pelicula[] }>(this.apiUrl).pipe(map(response => response.data));
  }

  getMovieById(id:number):Observable<Pelicula>{
    return this.http.get<Pelicula>('${this.apiUrl}/${id}');
  }

  createMovie(movie:Pelicula):Observable<Pelicula>{
    return this.http.post<Pelicula>(this.apiUrl, movie);
  }

  updateMovie(movie:Pelicula){
    return this.http.put(this.apiUrl, movie);
  }

  deleteMovieById(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
