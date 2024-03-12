import { Component, inject } from '@angular/core';
import { AuthGoogleService } from 'src/app/auth-google.service';
/*import { Router } from '@angular/router';
import { AuthGoogleService } from 'src/app/auth-google.service';*/

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent {
  auth = inject(AuthGoogleService)

  signOut(){
    this.auth.signOut();
    sessionStorage.removeItem("loggedUser");
  }
  /*constructor(private AuthGoogleService: AuthGoogleService,
  private router: Router   ){
  }

  logOut(){
    this.AuthGoogleService.logout();
      this.router.navigate(['login']);
  }*/

}
