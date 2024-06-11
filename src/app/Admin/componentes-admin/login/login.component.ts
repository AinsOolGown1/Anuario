declare var google: any;
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { environment } from 'src/environments/environment';
//import { AuthGoogleService } from 'src/app/auth-google.service';

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  backgroundImage = environment.svg_background_login;

  private router = inject(Router);

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '106043652118-i7u30h1t4jiqdcqom0u5k6o8582i0t7p.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp)
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme: 'filled_blue',
      size:  'large',
      shape: 'rectangle',
      width: 200
    })
  }

  private decodeToken(token: string){
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any){
    if(response){
      //Decodificar el token
      const payload = this.decodeToken(response.credential);

      //Almacenarlo en la sesion
      sessionStorage.setItem("loggedUser", JSON.stringify(payload));

      //Navegar en la pagina inicio del administrador
      this.router.navigate(['inicio-admin'])
    }
  }



/* constructor(private AuthGoogleService: AuthGoogleService){}

  login(){
    this.AuthGoogleService.login();
  }*/

  hide = true;
}
