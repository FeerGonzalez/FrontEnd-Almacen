import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MoviesFormComponent } from './pages/movies-form/movies-form.component';
import { RegisterActorDirectorComponent } from './pages/register-actor-director/register-actor-director.component';
import { AuthGuard } from './core/auth/authguard';
import { GeneroFormComponent } from './pages/genero-form/genero-form.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { AdminGuard } from './core/auth/adminguard';
import { PostLoginComponent } from './pages/post-login/post-login.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Pagina Principal',
    canActivate: [AuthGuard],
  },
  {
    path: 'postLogin',
    component: PostLoginComponent,
    canActivate: [AuthGuard],
  },
  // RUTAS DE ADMINISTRADOR
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'movies',
        title: 'Peliculas',
        component: MoviesComponent,
      },
      {
        path: 'pelicula/:id',
        component: PeliculaComponent,
        title: 'Pelicula :id',
      },
      {
        path: 'movies-form/:id',
        component: MoviesFormComponent,
        title: 'Registrar Pelicula',
      },
      {
        path: 'persona-form',
        component: RegisterActorDirectorComponent,
        title: 'Registrar Actor o Director',
      },
      {
        path: 'genero-form',
        component: GeneroFormComponent,
        title: 'Registrar Genero',
      },
    ],
  },
  // RUTAS DEL USER COMUN
  {
    path: 'user',
    children: [
      {
        path: 'movies',
        component: MoviesComponent,
        title: 'Peliculas',
      },
      {
        path: 'pelicula/:id',
        component: PeliculaComponent,
        title: 'Pelicula :id',
      },
    ],
  },
  // RUTAS DEL INVITADO (NO LOGUEADO)
  {
    path: 'guest',
    children: [
      {
        path: 'movies',
        component: MoviesComponent,
        title: 'Peliculas',
      },
      {
        path: 'pelicula/:id',
        component: PeliculaComponent,
        title: 'Pelicula :id',
      },
    ],
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
/*
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MoviesFormComponent } from './pages/movies-form/movies-form.component';
import { RegisterActorDirectorComponent } from './pages/register-actor-director/register-actor-director.component';
import { AuthGuard } from './core/auth/authguard';
import { GeneroFormComponent } from './pages/genero-form/genero-form.component';
import { MoviesInfoComponent } from './pages/movies-info/movies-info.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
        title:'Pagina Principal',
        canActivate: [AuthGuard],
    },
    {
        path:'movies',
        component: MoviesComponent,
        title:'Peliculas',
        canActivate: [AuthGuard],
    },
    {
        path:'movies-form/:id',
        component: MoviesFormComponent,
        title:'Formulario Pelicula',
        canActivate: [AuthGuard],
    },
    {
        path:'movies-info/:id',
        component: MoviesInfoComponent,
        title:'Informacion sobre la pelicula',
        canActivate: [AuthGuard],
    },
    {
        path:'actores-form',
        component: RegisterActorDirectorComponent,
        title:'Registro de actores',
        canActivate: [AuthGuard],
    },
    {
        path:'genero-form',
        component: GeneroFormComponent,
        title:'Registrar genero de pelicula',
        canActivate: [AuthGuard],
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch: 'full',
        canActivate: [AuthGuard],
    }
];
*/
