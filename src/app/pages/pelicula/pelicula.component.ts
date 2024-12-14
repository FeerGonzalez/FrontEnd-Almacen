import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pelicula } from '../../core/clases/pelicula';
import { MoviesService } from '../../core/services/movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pelicula',
  standalone: true,
  imports: [CommonModule],
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

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
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
