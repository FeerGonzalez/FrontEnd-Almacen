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
/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlLogin = 'https://k8s-lia.unrn.edu.ar/keycloak/realms/videoclub02/protocol/openid-connect/token';
  private apiUrlRegister = ''

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(this.apiUrlRegister, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(this.apiUrlLogin, data);
  }
}*/
