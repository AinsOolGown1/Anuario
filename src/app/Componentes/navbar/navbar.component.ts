import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  rutaApp = ""
  LOGO = environment.logo_ucn;
  isMenuOpen = false;

  constructor(@Inject(DOCUMENT) document:any){
   // console.log(document.location.href)
    this.rutaApp= document.location.href
    console.log(this.rutaApp)
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  
  felicitacionestxt = "FELICIDADES A LOS GRADUADOS 2024"
  anuariotxt = "ANUARIO UNIVERSIDAD CENTRAL DE NICARAGUA"
}

