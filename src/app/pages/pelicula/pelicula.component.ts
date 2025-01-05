import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pelicula } from '../../core/clases/pelicula';
import { MoviesService } from '../../core/services/movies.service';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { BotonComponent } from '../../components/boton/boton.component';
import { BotonStyle } from '../../components/boton/boton-style';

@Component({
  selector: 'app-pelicula',
  standalone: true,
  imports: [CommonModule, BotonComponent],
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.css',
})
export class PeliculaComponent {
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
    borderRadius: '4px 4px 4px 16px',
    background: 'var(--bg-bar-color)',
    color: 'var(--bg-body-color)',
  };

  botonComprar = {
    texto: 'Comprar',
    disabled: false,
    estilo: {
      borderRadius: '4px 4px 4px 16px',
      background: 'var(--bg-bar-color)',
      color: 'var(--bg-body-color)',
    },
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
    this.movieService.getMoviesById(id).subscribe({
      next: (foundMovies) => {
        this.pelicula = foundMovies;
      },
    });
  }
}
