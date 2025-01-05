import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class ClienteGuard implements CanActivate {
  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const isAdmin = await this.keycloakService.isUserInRole('USER');
    if (!isAdmin) {
      await this.keycloakService.login();
      return false;
    }
    return true;
  }
}
