import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';
import { KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakBearerInterceptorProvider, KeycloakInitializerProvider } from './core/auth/keycloak-init';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(), 
    //provideHttpClient(withFetch()),
    provideHttpClient(withInterceptorsFromDi()), 
    provideAnimationsAsync(),
    MessageService,
    importProvidersFrom(KeycloakBearerInterceptor, BrowserAnimationsModule),
    KeycloakService,
    KeycloakInitializerProvider,
    KeycloakBearerInterceptorProvider,
  ],
};