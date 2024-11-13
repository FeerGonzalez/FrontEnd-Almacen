import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { RegisterComponent } from './pages/register/register.component';
import { MoviesFormComponent } from './pages/movies-form/movies-form.component';
import { RegisterActorDirectorComponent } from './pages/register-actor-director/register-actor-director.component';
import { AuthGuard } from './core/auth/authguard';

export const routes: Routes = [
    /*{
        path:'login',
        component: LoginComponent,
        title:'Inicio de Sesion'
    },*/
    {
        path:'',
        component: HomeComponent,
        title:'Pagina Principal',
        //canActivate: [AuthGuard],
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
        //canActivate: [AuthGuard],
    },
    /*{
        path:'register',
        component: RegisterComponent,
        title:'Registro',
        canActivate: [AuthGuard],
    },*/
    {
        path:'actores-form',
        component: RegisterActorDirectorComponent,
        title:'Registro de actores',
        canActivate: [AuthGuard],
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch: 'full',
        canActivate: [AuthGuard],
    }
];
