import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pelicula } from '../../core/clases/pelicula';
import { MoviesService } from '../../core/services/movies.service';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../core/services/auth.service';
import { BotonComponent } from '../../components/boton/boton.component';
import { BotonStyle } from '../../components/boton/boton-style';

@Component({
  selector: 'app-movies-info',
  standalone: true,
  imports: [
    CommonModule, 
    BotonComponent
  ],
  templateUrl: './movies-info.component.html',
  styleUrl: './movies-info.component.css'
})
export class MoviesInfoComponent {
  private activatedRoute = inject(ActivatedRoute);
  id: number = this.activatedRoute.snapshot.params['id'];
  pelicula: Pelicula = {
    id: -1,
    titulo: '',
    sinopsis: '',
    precio: 0.0,
    fechaSalida: '',
    genero: { id: -1, nombre: '' },
    condicion: '',
    imagenPequena: null,
    imagenGrande: null,
    directores: [],
    actores: [],
  };

  botonComprarEstilo: BotonStyle = {
    borderRadius: '4px 4px 8px 8px',
    background: 'var(--bg-bar-color)',
    color: 'var(--bg-body-color)',
    width: '16vw',
  };

  botonComprar = {
    texto: 'Agregar al Carrito',
    disabled: false,
    estilo: this.botonComprarEstilo,
  };

  username: string | null = null;

  constructor(
    private movieService: MoviesService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    const tokenData = this.authService.getDecodedToken();
    this.username = tokenData ? JSON.stringify(tokenData) : null;
    this.getPeliculaPorID(this.id);
  }

  getPeliculaPorID(id: number) {
    this.movieService.getMovieById(id).subscribe({
      next: (foundMovies) => {
        this.pelicula = foundMovies;
      },
    });
  }
}

/*import { Component } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { KeycloakService } from 'keycloak-angular';
import { MessageService } from 'primeng/api';
import { Pelicula } from '../../core/clases/pelicula';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-movies-info',
  standalone: true,
  imports: [
    CardModule,
  ],
  templateUrl: './movies-info.component.html',
  styleUrl: './movies-info.component.css'
})
export class MoviesInfoComponent {
  movieId: number | null = null;
  movie: Pelicula | null = null;
  
  constructor(
    private movieService: MoviesService,
    private keycloakService: KeycloakService,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.movieId) {
    this.getMovie(this.movieId);
    }
  }

  getMovie(id:number): void {
    this.movieService.getMovieById(id).subscribe({
      next: (foundMovie) => {
        this.movie = foundMovie;
      },
      error: () => {
        console.error('No se pudo obtener la información de la película');
      }
    });

    /*
    this.movieService.getMoviesById(id).subscribe({
      next: (foundMovies) => {
        console.log('Datos recibidos:', foundMovies);
        this.movie = foundMovies;
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

}*/
