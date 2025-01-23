import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { KeycloakService } from 'keycloak-angular';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterModule, 
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd-Almacen_Peliculas';

  constructor(
    private keycloakService: KeycloakService
  ) {}

  
  onSearch(query: string): void {
    console.log('Término de búsqueda recibido en AppComponent:', query);
    // Aquí puedes agregar la lógica para manejar el término de búsqueda
  }
  
}
