import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MoviesFormComponent } from './pages/movies-form/movies-form.component';
import { RegisterActorDirectorComponent } from './pages/register-actor-director/register-actor-director.component';
import { AuthGuard } from './core/auth/authguard';
import { GeneroFormComponent } from './pages/genero-form/genero-form.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Pagina Principal',
    canActivate: [AuthGuard],
  },
  {
    path: 'movies',
    component: MoviesComponent,
    title: 'Peliculas',
    canActivate: [AuthGuard],
  },
  {
    path: 'pelicula/:id',
    component: PeliculaComponent,
    title: 'Pelicula :id',
    canActivate: [AuthGuard],
  },
  {
    path: 'movies-form/:id',
    component: MoviesFormComponent,
    title: 'Formulario Pelicula',
    canActivate: [AuthGuard],
  },
  {
    path: 'actores-form',
    component: RegisterActorDirectorComponent,
    title: 'Registro de actores',
    canActivate: [AuthGuard],
  },
  {
    path: 'genero-form',
    component: GeneroFormComponent,
    title: 'Registrar genero de pelicula',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];
