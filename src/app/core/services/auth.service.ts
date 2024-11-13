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
}
