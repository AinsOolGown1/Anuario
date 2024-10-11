import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GraduadosService } from 'src/app/Servicios/graduados.service';
import { IngresarGraduados } from 'src/app/model/AnuarioGraduados/ingresar-graduados';
import { Carreras } from 'src/app/model/Seleccion_carreras_facultad/Interfaz_Carreras';
import { Facultad } from 'src/app/model/Seleccion_carreras_facultad/Interfaz_Facultad';

@Component({
  selector: 'app-modal-editar-graduado',
  templateUrl: './modal-editar-graduado.component.html',
  styleUrls: ['./modal-editar-graduado.component.scss']
})
export class ModalEditarGraduadoComponent implements OnInit{

  selectedFileName: string | null = null;

  selectedFaculty: Facultad | undefined;
  facultades: Facultad[] = [
    { id: 1, name: 'Ciencias Médicas', carreras: [
      { id: 0, name: 'Seleccionar' },
      { id: 1, name: 'Medicina' },
      { id: 2, name: 'Farmacia' },
      { id: 3, name: 'Enfermeria' },
      { id: 4, name: 'Psicologia' }
    ]},
    { id: 2, name: 'Medicina Veterinaria', carreras: [
      { id: 0, name: 'Seleccionar' },
      { id: 5, name: 'Medicina Veterinaria' }
    ]},
    { id: 3, name: 'Ciencias Administrativas', carreras: [
      { id: 0, name: 'Seleccionar' },
      { id: 6, name: 'Administración de Empresas' },
      { id: 7, name: 'Contabilidad Pública y Auditoría' },
      { id: 8, name: 'Administración de Turismo y Hotelería' },
      { id: 9, name: 'Mercadotecnia' }
    ]},
    { id: 4, name: 'Ciencias Juridicas y Sociales', carreras: [
      { id: 0, name: 'Seleccionar' },
      { id: 10, name: 'Derecho' },
      { id: 11, name: 'Relaciones Internacionales y Comercio exterior' }
    ]},
    { id: 5, name: 'Ingenieria en Sistemas', carreras: [
      { id: 0, name: 'Seleccionar' },
      { id: 12, name: 'Ingenieria en Sistemas' }
    ]}
  ];

  graduadoSeleccionado: IngresarGraduados | null = null;
  formGroupEditarGraduado: FormGroup;

  constructor(
    private fb: FormBuilder,
    private graduadoService: GraduadosService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {carnet: string}
  ) {

    this.formGroupEditarGraduado = this.fb.group({
      carnet: [this.data.carnet, Validators.required],
      nombres: ['NA', Validators.required],
      apellidos: ['', Validators.required],
      facultad: ['', Validators.required],
      carrera: ['', Validators.required],
      frase_emotiva: ['', Validators.required],
      campus: ['NA', Validators.required],
      year_graduado: ['', Validators.required],
      telefono_graduado: ['', Validators.required],
      correo_graduado: ['', [Validators.required, Validators.email]], // Validación de correo
      // estado_graduado: [true, Validators.required],}
      destacado_graduado: [false, Validators.required],
      foto_graduado: ['', Validators.required],
      qr_graduado: ['', Validators.required]
    })

   }

  ngOnInit(): void {
    this.vistaEditarGraduado();
  }

  vistaEditarGraduado(): void{
    this.graduadoService.obtenerEstudiantePorCarnet(this.data.carnet).subscribe({
      next: (estudiante: IngresarGraduados) => {
        if(estudiante){
          this.graduadoSeleccionado = estudiante;

          this.formGroupEditarGraduado.controls['carnet'].setValue(this.data.carnet)
          this.formGroupEditarGraduado.controls['nombres'].setValue(estudiante.nombres)
          this.formGroupEditarGraduado.controls['apellidos'].setValue(estudiante.apellidos)
          this.formGroupEditarGraduado.controls['facultad'].setValue(estudiante.facultad)
          this.formGroupEditarGraduado.controls['campus'].setValue(estudiante.campus)
          this.formGroupEditarGraduado.controls['frase_emotiva'].setValue(estudiante.frase_emotiva)
          this.formGroupEditarGraduado.controls['telefono_graduado'].setValue(estudiante.telefono_graduado)
          this.formGroupEditarGraduado.controls['correo_graduado'].setValue(estudiante.correo_graduado)
          this.formGroupEditarGraduado.controls['qr_graduado'].setValue(estudiante.qr_graduado)
          this.formGroupEditarGraduado.controls['destacado_graduado'].setValue(estudiante.destacado_graduado)

          this.onSelectFacultad();
          this.formGroupEditarGraduado.get('carrera')?.setValue(estudiante.carrera);

               // Obtener y mostrar la foto del graduado
               this.graduadoService.obtenerFotoGraduado(this.data.carnet).subscribe({
                next: (blob: Blob) => {
                  const reader = new FileReader();
                  reader.onload = (e: any) => {
                    this.selectedImageUrl = e.target.result;
                  };
                  reader.readAsDataURL(blob);
                },
                error: (err: any) => {
                  console.error('Error al obtener la foto:', err.message);
                }
              });
        } else {
          console.error('Error al obtener el graduado por el id')
        }
      },
      error: (err: any)=>{
        console.log('Error al obtener el graduado'+err.message)
      }
    })
  }  

  guardarGraduadoActualizado(){
    const formData = new FormData();
    //* Agregar los campos al FormData
    formData.append('carnet', this.formGroupEditarGraduado.value.carnet);
    formData.append('nombres', this.formGroupEditarGraduado.value.nombres);
    formData.append('apellidos', this.formGroupEditarGraduado.value.apellidos);
    formData.append('facultad', this.formGroupEditarGraduado.value.facultad);
    formData.append('carrera', this.formGroupEditarGraduado.value.carrera);
    formData.append('frase_emotiva', this.formGroupEditarGraduado.value.frase_emotiva);
    formData.append('campus', this.formGroupEditarGraduado.value.campus);
    formData.append('year_graduado', String(this.formGroupEditarGraduado.value.year_graduado));
    formData.append('telefono_graduado', String(this.formGroupEditarGraduado.value.telefono_graduado));
    formData.append('correo_graduado', String(this.formGroupEditarGraduado.value.correo_graduado))
    formData.append('destacado_graduado', String(this.formGroupEditarGraduado.value.destacado_graduado));
    if (this.formGroupEditarGraduado.get('foto_graduado')?.value instanceof File) {
      formData.append('foto_graduado', this.formGroupEditarGraduado.get('foto_graduado')?.value as File);
    }
    formData.append('qr_graduado', this.formGroupEditarGraduado.value.qr_graduado);

    this.graduadoService.updateGraduado(this.data.carnet, formData).subscribe({
      next:(response) => {
        this.snackbar.open('Graduado editado correctamente', 'Aceptar', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      },
      error:(err) => {
        this.snackbar.open('Error al actualizar los datos', 'Aceptar', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      },
    })
  }

  onSelectFacultad(): void {
    const selectedFacultyName = this.formGroupEditarGraduado.get('facultad')?.value;
    this.selectedFaculty = this.facultades.find(facultad => facultad.name === selectedFacultyName);
    
    if (this.selectedFaculty) {
      // Reiniciar y habilitar el campo de carrera
      this.formGroupEditarGraduado.get('carrera')?.setValue('');
      this.formGroupEditarGraduado.get('carrera')?.enable();
    } else {
      // Deshabilitar el campo de carrera si no hay facultad seleccionada
      this.formGroupEditarGraduado.get('carrera')?.setValue('');
      this.formGroupEditarGraduado.get('carrera')?.disable();
    }
  }
  
  getCarreras(): Carreras[] {
    return this.selectedFaculty?.carreras || [];
  }

  selectedImageUrl: string | ArrayBuffer | null = null;
  
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name;
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
  
      // Asegúrate de usar el objeto `File` en lugar del nombre del archivo
      this.formGroupEditarGraduado.get('foto_graduado')?.setValue(file);
    }
  }
  
  
}
