import { Component, OnInit, ViewChild } from '@angular/core';
import { GraduadosService } from 'src/app/Servicios/graduados.service';
import { IngresarGraduados } from 'src/app/model/ingresar-graduados';


@Component({
  selector: 'app-ver-lista-graduados',
  templateUrl: './ver-lista-graduados.component.html',
  styleUrls: ['./ver-lista-graduados.component.scss']
})

export class VerListaGraduadosComponent implements OnInit {

  listGraduados: IngresarGraduados[] = [];
  displayedColumns: string[] = ['carnet', 'nombres', 'apellidos', 'carrera', 'facultad', 'campus','frase_emotiva', 'year_graduado', 'estado', 'destacado', 'foto_graduado', 'qr_graduado', 'acciones'];
  dataSource: IngresarGraduados[] = [];
  constructor(private _graduadoService: GraduadosService){

  }

  ngOnInit (): void {
    this.obtenerGraduados();
  }

  obtenerGraduados(){
    this._graduadoService.getGraduados().subscribe(data =>{
      console.log(data);
      this.listGraduados=data;
      this.dataSource = this.listGraduados;
    },error => {
      console.log(error);
    })
  }

}

