import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Pelicula } from '../../core/clases/pelicula';
import { MoviesService } from '../../core/services/movies.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  providers: [KeycloakService],
  standalone: true,
  imports: [ButtonModule, CardModule, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  // Nota: Corregido styleUrl a styleUrls para que acepte un arreglo.
})
export class HomeComponent implements OnInit {
  isAuthenticated !: boolean;
  userToken: string | undefined;
  movies: Pelicula[] = [];
  
  constructor(
    private movieService: MoviesService,
    private keycloakService: KeycloakService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Verifica si el usuario está autenticado
    this.isAuthenticated = this.keycloakService.isLoggedIn();
    console.log(this.keycloakService.isLoggedIn());
    if (this.isAuthenticated) {
      // Limpia los parámetros de la URL (opcional)
      //this.location.replaceState('/');

      // Obtiene el token de acceso
      this.keycloakService.getToken().then(userToken => {this.userToken = userToken});
      console.log('Access Token:', this.userToken);

      // Llama a getAllMovies solo si el usuario está autenticado
      this.getAllMovies();
    } else {
      this.keycloakService.login().then();
      console.log(this.keycloakService);
      console.log('User is not authenticated');
    }
  }

  getAllMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => this.movies = data,
      error: (err) => console.error('Error al obtener las películas:', err)
    });
  }

  deleteMovieById(id: number): void {
    this.movieService.deleteMovieById(id).subscribe({
      next: () => this.movies = this.movies.filter(movie => movie.id !== id),
      error: (err) => console.error('Error al eliminar la película:', err)
    });
  }

  trackById(index: number, movie: Pelicula): number {
    return movie.id;
  }
}
