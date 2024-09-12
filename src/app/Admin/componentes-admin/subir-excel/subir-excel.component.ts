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

  isLoading = false;

  backgroundImage = environment.svg_background_login;

  constructor(private _cargaMasivaService: CargaMasivaCSV,
    private _snackBar: MatSnackBar
  ){ }

  ngOnInit(): void {

     // Mostrar el spinner cuando la página se recarga
     this.isLoading = true;

     // Ocultar el spinner después de que todo se haya cargado
     setTimeout(() => {
       this.isLoading = false;
     }, 1000); // Aqui se ajusta el tiempo según sea necesario
  }

  archivoSeleccionado(event: Event): void {
    const archivo = (event.target as HTMLInputElement).files?.[0];
    if (archivo) {
      const formData = new FormData();
      formData.append('file', archivo, archivo.name);
      this._cargaMasivaService.importarCSV(formData).subscribe({
        next: (response) =>{
          const snackBarRef = this._snackBar.open('Archivo almacenado correctamente', 'Aceptar', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['ingre-csv']
        });
        console.log('Datos del archivo almacenados exitosamente:', response);
         // Recargar la página después de que el Snackbar se cierre
         snackBarRef.afterDismissed().subscribe(() => {
          window.location.reload();
        });
      }, error: (err: any) => {
        const snackBarRef = this._snackBar.open('Error en almacenar el archivo', 'Aceptar', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['ingre-csv-error']
        });
          console.error('Error al subir el archivo:', err);
            // Recargar la página después de que el Snackbar se cierre
         snackBarRef.afterDismissed().subscribe(() => {
          window.location.reload();
        });
        }
      });
    }
  }

}
