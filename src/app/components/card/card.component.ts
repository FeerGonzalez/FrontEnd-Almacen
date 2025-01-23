import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../../core/clases/pelicula';
import { MoviesService } from '../../core/services/movies.service';
import { KeycloakService } from 'keycloak-angular';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {

  @Input() pelicula!: Pelicula;

  verDetalle(){
    this.router.navigate(['/pelicula', this.pelicula.id])
  }
  
  constructor(private router: Router) {}
}
