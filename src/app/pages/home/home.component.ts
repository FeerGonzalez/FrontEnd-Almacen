import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Pelicula } from '../../core/clases/pelicula';
import { MoviesService } from '../../core/services/movies.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-home',
  providers: [KeycloakService],
  standalone: true,
  imports: [
    ButtonModule, 
    CardModule, 
    RouterModule, 
    CommonModule,
    CardComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  moviesList: Pelicula[] = [];
  
  constructor(
    private movieService: MoviesService,
    private keycloakService: KeycloakService,
    private location: Location,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getOnlyMovies().subscribe({
      next: (foundMovies) => {
        console.log('Datos recibidos:', foundMovies);
        this.moviesList = foundMovies;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las peliculas'
        });
      }
    });
  }

  deleteMovieById(id: number): void {
    console.log(id);
    this.movieService.deleteMovieById(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'La película fue eliminada con éxito'
        });

        this.moviesList = this.moviesList.filter(movie => movie.id !== id);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la película'
        });
      }
    });
  }

  trackById(index: number, movie: Pelicula): number {
    return movie.id;
  }
}
