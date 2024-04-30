import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GraduadosService } from 'src/app/Servicios/graduados.service';
import { IngresarGraduados } from 'src/app/model/ingresar-graduados';

@Component({
  selector: 'app-modalanuario',
  templateUrl: './modalanuario.component.html',
  styleUrls: ['./modalanuario.component.scss']
})
export class ModalanuarioComponent implements OnInit {
  graduadoSeleccionado: IngresarGraduados | null = null

  constructor(public _matDialogRef: MatDialogRef<ModalanuarioComponent>,
    private _graduadoService: GraduadosService,
    @Inject(MAT_DIALOG_DATA) public data: { carnet: string }
  ){
    console.log('Datos recibidos en el constructor:', data);
  }

  ngOnInit(): void {
    if (this.data && this.data.carnet) {
      this.vistaAnuario(this.data.carnet);
    } else {
      console.error('El objeto de datos es nulo o no tiene una propiedad "carnet" válida.');
    }
  }

  vistaAnuario(carnet: string): void {
    this._graduadoService.obtenerEstudiantePorCarnet(carnet).subscribe(
      (estudiante: IngresarGraduados) => {
        if (estudiante) {
          this.graduadoSeleccionado = estudiante;
        } else {
          console.error('No se encontró ningún estudiante con el carnet proporcionado.');
        }
      },
      (error) => {
        console.error('Error al obtener el estudiante:', error);
      }
    );
  }
}
