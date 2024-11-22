import {KeycloakBearerInterceptor, KeycloakService} from 'keycloak-angular';
import {APP_INITIALIZER, Provider} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: 'https://k8s-lia.unrn.edu.ar/keycloak',
            realm: 'videoclub02',
            clientId: 'angular-client',
          },
          loadUserProfileAtStartUp: true,
          initOptions: {
            //onLoad: 'check-sso',
            onLoad: 'login-required',
            checkLoginIframe: false,
          },
          bearerExcludedUrls: ['/assets'],
          enableBearerInterceptor: true,
          bearerPrefix: 'Bearer ',
        });
        resolve(resolve);
      } catch (error) {
        reject(error);
      }
    });
  };
}
// Provider for Keycloak Bearer Interceptor
export const KeycloakBearerInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: KeycloakBearerInterceptor,
  multi: true
};

// Provider for Keycloak Initialization
export const KeycloakInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializer,
  multi: true,
  deps: [KeycloakService]
}

//Close session
export function closeSession(keycloak: KeycloakService){
  keycloak.logout();
}

