import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Pelicula } from '../../core/clases/pelicula';
import { Actor } from '../../core/clases/actor';
import { Director } from '../../core/clases/director';
import { MoviesService } from '../../core/services/movies.service';
import { ActoresService } from '../../core/services/actores.service';
import { DirectorService } from '../../core/services/director.service';
import { GeneroService } from '../../core/services/genero.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-movies-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    RouterModule,
    InputTextModule,
    CalendarModule,
    CardModule,
    MultiSelectModule,
    InputNumberModule,
    DropdownModule,
  ],
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.css'],
})
export class MoviesFormComponent implements OnInit {
  movieForm!: FormGroup;
  isSaveInProgress = false;
  edit = false;
  actorsList: Actor[] = [];
  directoresList: Director[] = [];
  generoOptions: { label: string; value: any }[] = [];

  condicionOptions = [
    { label: 'Nuevo', value: 'nuevo' },
    { label: 'Usado', value: 'usado' },
  ];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private movieService: MoviesService,
    private actorService: ActoresService,
    private directorService: DirectorService,
    private generoService: GeneroService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
    // Configuración del formulario, con campos de actores y directores correctamente nombrados
    this.movieForm = this.fb.group({
      id: [null],
      titulo: ['', Validators.required],
      sinopsis: ['', Validators.required],
      precio: ['', Validators.required],
      fechaSalida: ['', Validators.required],
      condicion: ['', Validators.required],
      //generos: [[], Validators.required],
      genero: ['', Validators.required],
      actores: [[], Validators.required], // Aquí especificamos "actores" en lugar de "actorsList"
      directores: [[], Validators.required], // Aquí especificamos "directores" en lugar de "directoresList"
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getActores();
    this.getDirectores();
    this.getGeneros();

    if (id && id !== 'new') {
      this.edit = true;
      this.getMovieById(+id);
    }
  }

  getMovieById(id: number) {
    this.movieService.getMoviesById(id).subscribe({
      next: (foundMovie) => {
        this.movieForm.patchValue(foundMovie);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Película no encontrada',
        });
        this.router.navigateByUrl('/');
      },
    });
  }

  createMovie() {
    if (this.movieForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return;
    }
    this.isSaveInProgress = true;

    const pelicula = new Pelicula();
    pelicula.titulo = this.movieForm.get('titulo')?.value;
    pelicula.sinopsis = this.movieForm.get('sinopsis')?.value;
    pelicula.precio = this.movieForm.get('precio')?.value;

    const fechaSalida: Date = this.movieForm.get('fechaSalida')?.value;
    const formattedDate = fechaSalida.toLocaleDateString('es-ES');
    pelicula.fechaSalida = formattedDate;

    const condicion = this.movieForm.get('condicion')?.value;
    pelicula.condicion = condicion.value;

    const genero = this.movieForm.get('genero')?.value;
    // pelicula.idGenero = genero.value;

    const directores = this.movieForm.get('directores')?.value;
    const idsDirectores = directores
      ? directores.map((director: { id: number }) => director.id)
      : [];
    // pelicula.idsDirectores = idsDirectores;

    const actores = this.movieForm.get('actores')?.value;
    const idsActores = actores
      ? actores.map((actor: { id: number }) => actor.id)
      : [];
    // pelicula.idsActores = idsActores;

    //Console.Logs
    /*
    console.log('Titulo:' + this.movieForm.get('titulo')?.value);
    console.log('Sinopsis:' + this.movieForm.get('sinopsis')?.value);
    console.log('Precio:' + this.movieForm.get('precio')?.value);
    console.log('Condicion:' + condicion.value);
    console.log('Fecha de Salida:', formattedDate);
    console.log(pelicula.fechaSalida);
    console.log ('id genero:' + genero.value);
    console.log ('ids de Directores:' + idsDirectores);
    console.log ('ids de Actores:' + idsActores);
    console.log(this.movieForm.value);
    console.log(pelicula)
    */

    this.movieService.createMovie(pelicula).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Película guardada exitosamente',
        });
        //this.router.navigateByUrl('/');
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al guardar la película',
        });
      },
      complete: () => {
        this.isSaveInProgress = false;
        this.isSubmitting = false;
      },
    });
  }

  updateMovie() {
    if (this.movieForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return;
    }
    this.isSaveInProgress = true;
    this.movieService.updateMovie(this.movieForm.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Película actualizada exitosamente',
        });
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al actualizar la película',
        });
      },
      complete: () => {
        this.isSaveInProgress = false;
        this.isSubmitting = false;
      },
    });
  }

  getActores() {
    this.actorService.getActors().subscribe({
      next: (foundActors) => {
        this.actorsList = foundActors;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los actores',
        });
      },
    });
  }

  getDirectores() {
    this.directorService.getDirectores().subscribe({
      next: (foundDirectores) => {
        this.directoresList = foundDirectores;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los directores',
        });
      },
    });
  }

  getGeneros() {
    this.generoService.getGeneros().subscribe({
      next: (foundGeneros) => {
        this.generoOptions = foundGeneros.map((genero) => ({
          label: genero.nombre,
          value: genero.id,
        }));
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los generos',
        });
      },
    });
  }

  onSubmit() {
    this.isSubmitting = true;
    if (this.edit) {
      this.updateMovie();
    } else {
      this.createMovie();
    }
  }

  onCancel() {
    this.router.navigate(['/home']); // O redirige a donde lo necesites
  }
}
