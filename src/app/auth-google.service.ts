declare var google: any;
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService{
  router = inject(Router);
  constructor(){}

  signOut(){
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['login']);
  }
}

/*import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';


@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(private oAuthService: OAuthService) {
    this.initLogin();
  }

  initLogin(){
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId:'76450805456-3q62ab81kfrl79di6gebsjut831l585a.apps.googleusercontent.com',
      redirectUri: window.location.origin + "/inicio-admin",
      scope: 'openid profile email'
    }

    this.oAuthService.configure(config);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(){
    this.oAuthService.initLoginFlow();
  }

  logout(){
    this.oAuthService.logOut();
  }

  getProfile(){
    return this.oAuthService.getIdentityClaims();
  }



}*/
