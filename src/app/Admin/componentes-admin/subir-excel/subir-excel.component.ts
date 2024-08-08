import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CargaMasivaCSV } from 'src/app/Servicios/cargamasivaCSV.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subir-excel',
  templateUrl: './subir-excel.component.html',
  styleUrls: ['./subir-excel.component.scss']
})
export class SubirExcelComponent implements OnInit {

  backgroundImage = environment.svg_background_login;

  constructor(private _cargaMasivaService: CargaMasivaCSV,
    private _snackBar: MatSnackBar
  ){ }

  ngOnInit(): void {
  }

  archivoSeleccionado(event: Event): void {
    const archivo = (event.target as HTMLInputElement).files?.[0];
    if (archivo) {
      const formData = new FormData();
      formData.append('file', archivo, archivo.name);
      this._cargaMasivaService.importarCSV(formData).subscribe({
        next: (response) =>{
          this._snackBar.open('Archivo almacenado correctamente', 'Aceptar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
        console.log('Datos del archivo almacenados exitosamente:', response);
      }, error: (err: any) => {
        this._snackBar.open('Error en almacenar el archivo', 'Aceptar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
          console.error('Error al subir el archivo:', err);
        }
      });
    }
  }

}
