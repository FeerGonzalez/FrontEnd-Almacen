import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { Pelicula } from '../clases/pelicula';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private apiUrl = 'http://localhost:8080/almacen/pelicula/imagen'
  private externalUrl = 'https://k8s-lia.unrn.edu.ar/grupo02'

  constructor(
    private http:HttpClient, 
    private keycloakService: KeycloakService
  ) {}

  agregarImagen(id:number, imagen:ImageBitmap): void{
    this.http.get<ImageBitmap>('${this.apiUrl}/${id}');
  }

  updateImagen(id:number, imagen:ImageBitmap){
    return this.http.put('${this.apiUrl}/${id}', imagen);
  }

  getImagen(nombreImagen:String, tamanio:String){
    return this.http.get<Pelicula>('${this.apiUrl}/${nombreImagen}');
  }

  /*
  getImagenes():Observable<Pelicula[]>{
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  getOnlyMovies(): Observable<Pelicula[]> {
    return this.http.get<{ data: Pelicula[] }>(this.apiUrl).pipe(map(response => response.data));
  }

  getMoviesById(id:number):Observable<Pelicula>{
    return this.http.get<Pelicula>('${this.apiUrl}/${id}');
  }

  createMovie(movie:Pelicula):Observable<Pelicula>{
    return this.http.post<Pelicula>(this.apiUrl, movie);
  }

  updateMovie(movie:Pelicula){
    return this.http.put(this.apiUrl, movie);
  }

  deleteMovieById(id:number){
    return this.http.delete('${this.apiUrl}/${id}');
  }
  */
}
