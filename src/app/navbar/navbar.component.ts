import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuItemContent, MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { KeycloakService } from 'keycloak-angular';
import { ItemNavBar } from '../components/item-nav-bar/item-nav-bar-model';
import { ItemNavBarComponent } from '../components/item-nav-bar/item-nav-bar.component';

import { AuthServiceService } from '../core/services/auth-service.service';
import { ItemDesplegableNavBarComponent } from '../components/item-desplegable-nav-bar/item-desplegable-nav-bar.component';
import { ItemDesplegableNavBarModel } from '../components/item-desplegable-nav-bar/item-desplegable-nav-bar-model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MenuModule,
    ItemNavBarComponent,
    ItemDesplegableNavBarComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  cartItemCount: number = 0; // This should reflect the actual cart count

  @Output() search = new EventEmitter<string>();
  menuItems: MenuItem[] = [];
  menuItemsProfile: MenuItem[] = [];

  itemsSimples: ItemNavBar[] = Array();
  itemsDesplegables: ItemDesplegableNavBarModel[] = Array();

  username: string | null = null;

  constructor(
    private router: Router,
    private keycloakService: KeycloakService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    const tokenData = this.authService.getDecodedToken();
    this.username = tokenData ? tokenData.name : null;

    this.itemsSimples = [];

    this.itemsDesplegables = [
      {
        titulo: 'Peliculas',
        childs: [
          {
            label: 'Agregar Película',
            enlace: 'movies-form/new',
          },
          {
            label: 'Agregar Película',
            enlace: 'movies-form/new',
          },
          {
            label: 'Agregar Actor',
            enlace: 'actores-form',
          },
          {
            label: 'Agregar Género',
            enlace: 'genero-form',
          },
        ],
      },
    ];

    this.menuItemsProfile = [
      {
        label: 'Cerrar Sesion',
        command: () => this.logout(),
      },
    ];
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
    this.keycloakService
      .logout()
      .then(() => {
        console.log('Sesión cerrada exitosamente');
      })
      .catch((err) => {
        console.error('Error al cerrar sesión:', err);
      });
  }
}
