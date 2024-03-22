import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingresar-graduados',
  templateUrl: './ingresar-graduados.component.html',
  styleUrls: ['./ingresar-graduados.component.scss'],
})
export class IngresarGraduadosComponent {
  ingre_graduadoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.ingre_graduadoForm = this.fb.group({
      carnet:['', Validators.required],
      nombres:['', Validators.required],
      apellidos:['', Validators.required],
      carrera:['', Validators.required],
      facultad:['', Validators.required],
      campus:['', Validators.required],
      year_graduado:['', Validators.required],
      estado_graduado:['', Validators.required],
      destacado_graduado:['', Validators.required],
      qr_graduado:['', Validators.required]
    })
  }
  agregar_graduado(){
    console.log(this.ingre_graduadoForm)
  }
}
