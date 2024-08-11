import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ingresar-eventos',
  templateUrl: './ingresar-eventos.component.html',
  styleUrls: ['./ingresar-eventos.component.scss']
})
export class IngresarEventosComponent {
  backgroundImage = environment.svg_background_login;

}
