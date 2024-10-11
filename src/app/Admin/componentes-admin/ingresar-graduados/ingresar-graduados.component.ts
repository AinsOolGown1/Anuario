import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GraduadosService } from 'src/app/Servicios/graduados.service';
import { IngresarGraduados } from 'src/app/model/AnuarioGraduados/ingresar-graduados';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Facultad } from 'src/app/model/Seleccion_carreras_facultad/Interfaz_Facultad';
import { Carreras } from 'src/app/model/Seleccion_carreras_facultad/Interfaz_Carreras';

@Component({
  selector: 'app-ingresar-graduados',
  templateUrl: './ingresar-graduados.component.html',
  styleUrls: ['./ingresar-graduados.component.scss'],
})
export class IngresarGraduadosComponent implements OnInit {
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

  selectedFaculty: Facultad | undefined;
  selectedCareer: Carreras | undefined;
  backgroundImage = environment.svg_background_login;

  ingre_graduadoForm: FormGroup;
  id: string;
  public archivos: any = [];

  constructor(
    private fb: FormBuilder,
    private _graduadoService: GraduadosService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRouter: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.ingre_graduadoForm = this.fb.group({
      carnet: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      facultad: [this.facultades[0].name, Validators.required],
      carrera: [this.facultades[0].carreras[0].name, Validators.required],
      frase_emotiva: ['', Validators.required],
      campus: ['Central', Validators.required],
      year_graduado: ['', Validators.required],
      telefono_graduado: ['', Validators.required],
      correo_graduado: ['', [Validators.required, Validators.email]], // Validación de correo
      estado_graduado: [true, Validators.required],
      destacado_graduado: [false, Validators.required],
      foto_graduado: ['', Validators.required],
      qr_graduado: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id')!;
    this.selectedFaculty = this.facultades.find(facultad => facultad.name === this.facultades[0].name);
  }

  ngOnInit() {
  }

  agregar_graduado() {
    if (this.ingre_graduadoForm.valid) {
      const estado_graduado: boolean = this.ingre_graduadoForm.get('estado_graduado')?.value === 'true';
      const destacado_graduado: boolean = this.ingre_graduadoForm.get('destacado_graduado')?.value === 'true';

      const GRADUADO: IngresarGraduados = {
        carnet: this.ingre_graduadoForm.get('carnet')?.value,
        nombres: this.ingre_graduadoForm.get('nombres')?.value,
        apellidos: this.ingre_graduadoForm.get('apellidos')?.value,
        facultad: this.ingre_graduadoForm.get('facultad')?.value,
        carrera: this.ingre_graduadoForm.get('carrera')?.value,
        frase_emotiva: this.ingre_graduadoForm.get('frase_emotiva')?.value,
        campus: this.ingre_graduadoForm.get('campus')?.value,
        year_graduado: this.ingre_graduadoForm.get('year_graduado')?.value,
        telefono_graduado: this.ingre_graduadoForm.get('telefono_graduado')?.value,
        correo_graduado: this.ingre_graduadoForm.get('correo_graduado')?.value,
        estado_graduado: estado_graduado,
        destacado_graduado: destacado_graduado,
        foto_graduado: this.archivos[0], //* Se envía el archivo en lugar de la URL
        qr_graduado: this.ingre_graduadoForm.get('qr_graduado')?.value
      };
        //* Agregar graduado
        this._graduadoService.guardarGraduado(GRADUADO).subscribe({
          next: (data) => {
            this._snackBar.open('Graduado agregado correctamente', 'Aceptar', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['ingre-graduado']
            });
            this.ingre_graduadoForm.reset();
          },
          error: () => {
            this._snackBar.open('Error al guardar el graduado', 'Aceptar', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['ingre-graduado-error']
            });
            this.ingre_graduadoForm.reset();
          }
        });
      }
     else {
      this._snackBar.open('Formulario no válido. Por favor, revise los campos.', 'Aceptar', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['ingre-graduado-error']
      });
    }
  }

  capturarFile(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const archivoCapturado = inputElement.files[0];
      this.archivos = []; //* Limpiar el array de archivos antes de agregar uno nuevo
      this.archivos.push(archivoCapturado);
      this.extraerBase64(archivoCapturado).then((imagenBase64) => {
        console.log(imagenBase64); // Opcional: puedes imprimir el base64 de la imagen en la consola para verificarlo
      });
    } else {
      console.log('No se ha seleccionado ningún archivo.');
    }
  }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result
          });
        };
        reader.onerror = (error) => {
          reject({
            base: null
          });
        };
      } catch (e) {
        reject({
          base: null
        });
      }
    });

    getCarreras(): Carreras[] {
      return this.selectedFaculty?.carreras || [];
    }
    
  
    onSelectFacultad(event: Event): void {
      const selectElement = event.target as HTMLSelectElement;
      const selectedFacultyName = selectElement.value;
      this.selectedFaculty = this.facultades.find(facultad => facultad.name === selectedFacultyName);
    
      this.ingre_graduadoForm.get('carrera')?.setValue(''); // Reiniciar el valor del select de carreras
      this.ingre_graduadoForm.get('carrera')?.enable(); // Habilitar el select de carreras
    }
    
  
    onSelectCarrera(event: Event): void {
      const selectElement = event.target as HTMLSelectElement;
      const selectedCareerName = selectElement.value;
      this.selectedCareer = this.selectedFaculty?.carreras.find(carrera => carrera.name === selectedCareerName);
      this.ingre_graduadoForm.get('carrera')?.setValue(this.selectedCareer?.name);
    }
}
