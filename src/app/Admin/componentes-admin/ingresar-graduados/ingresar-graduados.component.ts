import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GraduadosService } from 'src/app/Servicios/graduados.service';
import { IngresarGraduados } from 'src/app/model/ingresar-graduados';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as XLSX from 'xlsx'; // Importar la biblioteca XLSX

@Component({
  selector: 'app-ingresar-graduados',
  templateUrl: './ingresar-graduados.component.html',
  styleUrls: ['./ingresar-graduados.component.scss'],
})
export class IngresarGraduadosComponent {

  ExcelData: any;
  ingre_graduadoForm: FormGroup;
  titulo = 'Agregar graduado';
  id: string;
  public archivos: any = [];
  guardandoDesdeExcel: boolean = false; // Bandera para indicar si se están guardando datos desde un archivo Excel


  constructor(private fb: FormBuilder,
              private _graduadoService: GraduadosService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private aRouter: ActivatedRoute,
              private sanitizer: DomSanitizer) {
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
      foto_graduado:['', Validators.required],
      qr_graduado:['', Validators.required]
    });
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
      estado_graduado: estado_graduado,
      destacado_graduado: destacado_graduado,
      foto_graduado: this.archivos[0], // Se envía el archivo en lugar de la URL
      qr_graduado: this.ingre_graduadoForm.get('qr_graduado')?.value
    };

    if(this.id !== null){
      // Editar graduado
      this._graduadoService.editarGraduado(this.id, GRADUADO).subscribe(() =>{
        this._snackBar.open('Graduado editado correctamente', 'Graduado Guardado', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
      });
      this.router.navigate(['/ver-lista-graduados']);
    }, error => {
      this._snackBar.open("Error al editar el graduado", "Error", { duration: 3000 });
      this.ingre_graduadoForm.reset(error);
    });
  } else {
    // Agregar graduado
    this._graduadoService.guardarGraduado(GRADUADO).subscribe(data => {
      this._snackBar.open('Graduado agregado correctamente', 'Graduado Editado', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      this.router.navigate(['/ver-lista-graduados']);
    }, error => {
      this._snackBar.open("Error al guardar el graduado", "Error", { duration: 3000 });
      this.ingre_graduadoForm.reset(error);
    });
  }

}
 // Función para manejar el cambio de archivo Excel seleccionado
  onFileChange(event: any): void {
  this.guardandoDesdeExcel = true; // Activar la bandera cuando se cargue un archivo Excel
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = (event: any) => {
    const binaryData = event.target.result;
    const workbook = XLSX.read(binaryData, { type: 'binary' });
    const sheetName = workbook.SheetNames;
    this.ExcelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName[0]]);
    console.log(this.ExcelData);
    this.guardarDatos(this.ExcelData);
    this.guardandoDesdeExcel = false; // Desactivar la bandera después de procesar el archivo Excel
  };
}

// Función para enviar los datos al servicio y guardarlos en MongoDB
guardarDatos(datos: any[]): void {
  if (Array.isArray(datos) && datos.length > 0) {
    this._graduadoService.guardarDatosExcel(datos).subscribe(
      (response) => {
        this._snackBar.open('Datos guardados correctamente desde el archivo Excel', 'Aceptar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      },
      (error) => {
        console.error('Error al guardar datos desde el archivo Excel:', error);
        this._snackBar.open('Error al guardar datos desde el archivo Excel', 'Aceptar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    );
  } else {
    // Guardar desde el formulario
    const formData = this.ingre_graduadoForm.value;
    this._graduadoService.guardarGraduado(formData).subscribe(
      (response) => {
        this._snackBar.open('Graduado agregado correctamente desde el formulario', 'Aceptar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        // Limpiar el formulario después de guardar
        this.ingre_graduadoForm.reset();
      },
      (error) => {
        console.error('Error al guardar graduado desde el formulario:', error);
        this._snackBar.open('Error al guardar graduado desde el formulario', 'Aceptar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    );
  }
}

  capturarFile(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const archivoCapturado = inputElement.files[0];
      this.archivos = []; // Limpiar el array de archivos antes de agregar uno nuevo
      this.archivos.push(archivoCapturado);
      this.extraerBase64(archivoCapturado).then((imagenBase64) => {
        console.log(imagenBase64); // Puedes usar esta imagen en una vista previa
      });
    } else {
      console.log('No se seleccionó ningún archivo.');
    }
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
        const unsafeIMG = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeIMG);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
            resolve({ base: reader.result });
        };
        reader.onerror = (error) => {
            reject(error);
        };
    } catch (error) {
        reject(error);
    }
  });

  esEditar(){
    if (this.id !== null){
      this.titulo = "EDITAR GRADUADO";
      this._graduadoService.obtenerUngraduado(this.id).subscribe( data=>{
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
          });
      });
    }
  }
}

