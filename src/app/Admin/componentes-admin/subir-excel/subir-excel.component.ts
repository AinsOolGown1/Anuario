import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CargarScriptsService} from 'src/app/Servicios/cargar-scripts.service'

@Component({
  selector: 'app-subir-excel',
  templateUrl: './subir-excel.component.html',
  styleUrls: ['./subir-excel.component.scss']
})
export class SubirExcelComponent {

  backgroundImage = environment.svg_background_login;

  constructor(private _CargarScript: CargarScriptsService){
    _CargarScript.Carga(["VistaSubirExcel/subirexcel"])
  }



}
