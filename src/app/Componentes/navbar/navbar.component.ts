import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  rutaApp = ""

  constructor(@Inject(DOCUMENT) document:any){
   // console.log(document.location.href)
    this.rutaApp= document.location.href
    console.log(this.rutaApp)
  }
  felicitacionestxt = "FELICIDADES A LOS GRADUADOS 2024"
  anuariotxt = "ANUARIO UNIVERSIDAD CENTRAL DE NICARAGUA"
}

