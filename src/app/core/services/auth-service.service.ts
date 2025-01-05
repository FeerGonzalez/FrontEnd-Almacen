import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private keycloakService: KeycloakService) {}

  getToken(): Promise<string> {
    return this.keycloakService.getToken();
  }

  getDecodedToken(): any {
    const token = this.keycloakService.getKeycloakInstance().token;
    return token ? this.decodeToken(token) : null;
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  isAdmin(): boolean {
    return this.keycloakService.isUserInRole('ADMIN');
  }

  isUser(): boolean {
    return this.keycloakService.isUserInRole('USER');
  }
}
