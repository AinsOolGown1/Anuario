import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GraduadosService } from 'src/app/Servicios/graduados.service';
import { IngresarGraduados } from 'src/app/model/ingresar-graduados';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar
import { ActivatedRoute, Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-ingresar-graduados',
  templateUrl: './ingresar-graduados.component.html',
  styleUrls: ['./ingresar-graduados.component.scss'],
})
export class IngresarGraduadosComponent {
  ingre_graduadoForm: FormGroup;
  titulo = 'Agregar graduado';
  id: string;

  constructor(private fb: FormBuilder,
              private _graduadoService: GraduadosService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private aRouter: ActivatedRoute) {
    this.ingre_graduadoForm = this.fb.group({
      carnet:['', Validators.required],
      nombres:['', Validators.required],
      apellidos:['', Validators.required],
      carrera:['', Validators.required],
      facultad:['', Validators.required],
      frase_emotiva:['', Validators.required],
      campus:['', Validators.required],
      year_graduado:['', Validators.required],
      estado_graduado:['', Validators.required],
      destacado_graduado:['', Validators.required],
      foto_graduado: ['', Validators.required],
      qr_graduado:['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')!;
  }
  ngOnInit(){
    this.esEditar();
  }

  agregar_graduado() {
    const estado_graduado: boolean = this.ingre_graduadoForm.get('estado_graduado')?.value === 'true';
    const destacado_graduado: boolean = this.ingre_graduadoForm.get('destacado_graduado')?.value === 'true';

    const GRADUADO: IngresarGraduados = {
      carnet: this.ingre_graduadoForm.get('carnet')?.value,
      nombres: this.ingre_graduadoForm.get('nombres')?.value,
      apellidos: this.ingre_graduadoForm.get('apellidos')?.value,
      carrera: this.ingre_graduadoForm.get('carrera')?.value,
      facultad: this.ingre_graduadoForm.get('facultad')?.value,
      frase_emotiva: this.ingre_graduadoForm.get('frase_emotiva')?.value,
      campus: this.ingre_graduadoForm.get('campus')?.value,
      year_graduado: this.ingre_graduadoForm.get('year_graduado')?.value,
      estado_graduado: estado_graduado, // Asigna el valor booleano aquí
      destacado_graduado: destacado_graduado,
      foto_graduado: this.ingre_graduadoForm.get('foto_graduado')?.value,
      qr_graduado: this.ingre_graduadoForm.get('qr_graduado')?.value
    };

    if(this.id !== null){
      //Editamos graduado
      this._graduadoService.editarGraduado(this.id,GRADUADO).subscribe(() =>{
        this._snackBar.open('Graduado editado correctamente', 'Graduado Guardado', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
      });
      this.router.navigate(['/ver-lista-graduados']);
    }, error => {
      this._snackBar.open("Error al editar el graduado", "Error", { duration: 3000 });
      this.ingre_graduadoForm.reset();
    })
  }
    else{
      //Agregamos graduado
      console.log(GRADUADO);

      this._graduadoService.guardarGraduado(GRADUADO).subscribe(data => {
        this._snackBar.open('Graduado agregado correctamente', 'Graduado Editado', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.router.navigate(['/ver-lista-graduados']); // Redirige a la página principal después de guardar

      }, error => {
        this._snackBar.open("Error al guardar el graduado", "Error", { duration: 3000 });
        this.ingre_graduadoForm.reset();
      });
    }

  }

  esEditar(){
    if (this.id !== null){
      this.titulo = "EDITAR GRADUADO";
      this._graduadoService.obtenerGraduado(this.id).subscribe( data=>{
        this.ingre_graduadoForm.setValue({
            carnet: data.carnet,
            nombres: data.nombres,
            apellidos: data.apellidos,
            carrera: data.carrera,
            facultad: data.facultad,
            frase_emotiva: data.frase_emotiva,
            campus: data.campus,
            year_graduado: data.year_graduado,
            estado_graduado: data.estado_graduado,
            destacado_graduado: data.destacado_graduado,
            foto_graduado: data.foto_graduado,
            qr_graduado: data.qr_graduado
          })
      })
    }
  }
}
