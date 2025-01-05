import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'page-post-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-login.component.html',
  styleUrl: './post-login.component.css',
})
export class PostLoginComponent {
  esperando: boolean = true;
  termino: boolean = false;
  username: string | null = null;

  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  async ngOnInit() {
    const roles = await this.keycloakService.getUserRoles();

    const userProfile = await this.keycloakService.loadUserProfile();
    this.username = userProfile?.firstName || 'Usuario';

    this.esperando = false;
    this.termino = true;
    await this.delay(1000);

    if (roles.includes('ADMIN')) {
      this.router.navigate(['/admin/pelicula']);
    } else if (roles.includes('USER')) {
      this.router.navigate(['/cliente/pelicula']);
    } else {
      this.router.navigate(['/guest/pelicula']);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
