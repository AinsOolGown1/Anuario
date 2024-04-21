import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GraduadosService } from 'src/app/Servicios/graduados.service';
import { IngresarGraduados } from 'src/app/model/ingresar-graduados';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-modalanuario',
  templateUrl: './modalanuario.component.html',
  styleUrls: ['./modalanuario.component.scss']
})
export class ModalanuarioComponent implements OnInit {
  graduadoSeleccionado: IngresarGraduados | null = null

  constructor(public _matDialogRef: MatDialogRef<ModalanuarioComponent>,
    private _graduadoService: GraduadosService,
    private aRouter: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ){
    console.log('Datos recibidos en el constructor:', data);
  }

  ngOnInit(): void {
    console.log('Datos recibidos en ngOnInit:', this.data);
  if (this.data && this.data.id) {
    console.log('ID recibido:', this.data.id);
    this.vistaAnuario(this.data.id);
  } else {
    console.error('El objeto de datos es nulo o no tiene una propiedad "id" válida.');
  }
  }

  vistaAnuario(id: string): void {
    this._graduadoService.obtenerUngraduado(id).subscribe(
      (graduado: IngresarGraduados) => {
        if (graduado) {
          this.graduadoSeleccionado = graduado;
        } else {
          console.error('No se encontró ningún graduado con el ID proporcionado.');
        }
      },
      (error) => {
        console.error('Error al obtener el graduado:', error);
      }
    );
  }
}
