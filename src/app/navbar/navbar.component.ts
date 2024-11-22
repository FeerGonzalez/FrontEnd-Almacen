import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuItemContent, MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cartItemCount: number = 0; // This should reflect the actual cart count

  @Output() search = new EventEmitter<string>();
  menuItems: MenuItem[] = [];
  menuItemsProfile: MenuItem[] = [];

  constructor(
    private router: Router,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Agregar Película',
        icon: 'pi pi-video',
        routerLink: 'movies-form/new',
      },
      {
        label: 'Agregar Actor',
        icon: 'pi pi-user',
        routerLink: 'actores-form',
      },
      {
        label: 'Agregar Género',
        icon: 'pi pi-tag',
        routerLink: 'genero-form',
      }
    ];

    this.menuItemsProfile = [
      {
        label: 'Cerrar Sesion',
        command: () => this.logout()
      }
    ]
  }

  onSearch(event: any) {
    const query = event.target.value;
    this.search.emit(query); // Emit search query to parent component
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.keycloakService.logout().then(() => {
      console.log('Sesión cerrada exitosamente');
    }).catch(err => {
      console.error('Error al cerrar sesión:', err);
    });
  }

  
}
