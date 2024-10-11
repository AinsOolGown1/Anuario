import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ColeccionFotosGraduacionesService } from 'src/app/Servicios/coleccionfotos.service';
import { ColeccionesDeFotos } from 'src/app/model/Coleccion_Fotos/modeloInterfazColeccionFotoa';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ingresar-colec-fotos',
  templateUrl: './ingresar-colec-fotos.component.html',
  styleUrls: ['./ingresar-colec-fotos.component.scss']
})
export class IngresarColecFotosComponent {

  backgroundImage = environment.svg_background_login;

  gallery_fromGrup: FormGroup;
  titulo = 'Agregar Colección de Fotos';
  id: string;

  public archivos: File[] = [];

  constructor(private fb: FormBuilder,
              private _coleccionGraduaciones: ColeccionFotosGraduacionesService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private aRouter: ActivatedRoute,
              private sanitizer: DomSanitizer) {
    this.gallery_fromGrup = this.fb.group({
      campus:['Central', Validators.required],
      year_graduacion:['', Validators.required],
      fotos_graduaciones:['', Validators.required],
      sesion:['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id')!;
  }

  ngOnInit(){
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.archivos = Array.from(event.target.files);
    }
  }

  agregarColeccionFotos() {
    const GALERIA_GRADUACION: ColeccionesDeFotos = {
      campus: this.gallery_fromGrup.get('campus')?.value,
      year_graduacion: this.gallery_fromGrup.get('year_graduacion')?.value,
      fotos_graduaciones: this.archivos,
      sesion: this.gallery_fromGrup.get('sesion')?.value
    };

    this._coleccionGraduaciones.guardarFotosGraduaciones(GALERIA_GRADUACION).subscribe({
      next: (data) => {
        this._snackBar.open('Colección de fotos agregadas', 'Aceptar', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['ingre-coleccion']
        });
        this.gallery_fromGrup.reset();
        this.archivos = [];
      },
      error: () => {
        this._snackBar.open("Error al guardar la colección de fotos", "Aceptar", { 
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['ingre-coleccion-error']
         });
        this.gallery_fromGrup.reset();
        this.archivos = [];
      }
    });
  }
}
