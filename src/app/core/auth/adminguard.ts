import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.keycloakService.isLoggedIn();
    const isAdmin = await this.keycloakService.isUserInRole('ADMIN');
    if (!isLoggedIn || !isAdmin) {
      this.router.navigate(['/access-denied']);
      return false;
    }
    return true;
  }
}