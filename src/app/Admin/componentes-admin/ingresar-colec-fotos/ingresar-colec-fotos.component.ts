import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ColeccionFotosGraduacionesService } from 'src/app/Servicios/coleccionfotos.service';
import { ColeccionGraduacion } from 'src/app/model/Coleccion_Fotos/interfaceColeccionfotos';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ingresar-colec-fotos',
  templateUrl: './ingresar-colec-fotos.component.html',
  styleUrls: ['./ingresar-colec-fotos.component.scss']
})
export class IngresarColecFotosComponent {

  backgroundImage = environment.svg_background_login;

  ingre_graduadoForm: FormGroup;
  titulo = 'Agregar Colección de Fotos';
  id: string;

  public archivos: any = [];

  constructor(private fb: FormBuilder,
              private _coleccionGraduaciones: ColeccionFotosGraduacionesService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private aRouter: ActivatedRoute,
              private sanitizer: DomSanitizer) {
    this.ingre_graduadoForm = this.fb.group({
      campus:['', Validators.required],
      year_graduacion:['', Validators.required],
      fotos_graduaciones:['', Validators.required],
      sesion:['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id')!;
  }

  ngOnInit(){
  }

  agregarColeccionFotos() {
    const formData = new FormData();
    formData.append('campus', this.ingre_graduadoForm.get('campus')?.value);
    formData.append('year_graduacione', this.ingre_graduadoForm.get('year_graduacion')?.value);
    formData.append('sesion', this.ingre_graduadoForm.get('sesion')?.value);

    const files = this.ingre_graduadoForm.get('fotos_graduaciones')?.value;
    for (let i = 0; i < files.length; i++) {
      formData.append('fotos_graduaciones', files[i]);
    }

    this._coleccionGraduaciones.guardarFotosGraduaciones(formData).subscribe({
      next: (data) => {
        this._snackBar.open('Colección de fotos agregadas', 'Aceptar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.ingre_graduadoForm.reset();
      },
      error: () => {
        this._snackBar.open("Error al guardar la colección de fotos", "Aceptar", { duration: 3000 });
        this.ingre_graduadoForm.reset();
      }
    });
  }
}
