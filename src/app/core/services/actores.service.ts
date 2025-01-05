import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actor } from '../clases/actor';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class ActoresService {
  private apiUrl = '/almacen/actor';

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService
  ) {}

  getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.apiUrl);
  }

  getActorById(id: number): Observable<Actor> {
    return this.http.get<Actor>('${this.apiUrl}/${id}');
  }

  createActor(actor: Actor): Observable<Actor> {
    return this.http.post<Actor>(this.apiUrl, actor);
  }

  updateActor(actor: Actor) {
    return this.http.put(this.apiUrl, actor);
  }

  deleteActorById(id: number) {
    return this.http.delete('${this.apiUrl}/${id}');
  }
}
