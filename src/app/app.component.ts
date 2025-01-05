import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { KeycloakService } from 'keycloak-angular';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'FrontEnd-Almacen_Peliculas';

  constructor(private keycloakService: KeycloakService) {}

  /*
  ngOnInit(): void {
    // Verificamos si estamos en el navegador antes de inicializar Keycloak
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.keycloakService.init().then(authenticated => {
        if (authenticated) {
          console.log('Keycloak initialized and user authenticated');
        } else {
          console.log('Keycloak initialized but user not authenticated');
        }
      });
    }
  }
  */

  onSearch(query: string): void {
    console.log('Término de búsqueda recibido en AppComponent:', query);
    // Aquí puedes agregar la lógica para manejar el término de búsqueda
  }
}
