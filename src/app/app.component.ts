import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'final2';

  mostrarNavBar: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRoute();
    })
  }

  checkRoute(){
    const rutaActual = this.router.url;
    this.mostrarNavBar = !(rutaActual.includes('login') || rutaActual.includes('inicio-admin'))
  }
}
