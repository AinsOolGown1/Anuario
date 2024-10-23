import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-imagenes-masivas',
  templateUrl: './imagenes-masivas.component.html',
  styleUrls: ['./imagenes-masivas.component.scss']
})
export class ImagenesMasivasComponent {

  backgroundImage = environment.svg_background_login;

}
