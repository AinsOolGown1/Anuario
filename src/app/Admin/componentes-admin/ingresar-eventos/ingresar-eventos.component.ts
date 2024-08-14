import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from 'src/app/Servicios/eventosproximos';
import { environment } from 'src/environments/environment';
import { Eventos } from 'src/app/model/EventosProximos/modeloEventosProximos';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ingresar-eventos',
  templateUrl: './ingresar-eventos.component.html',
  styleUrls: ['./ingresar-eventos.component.scss']
})
export class IngresarEventosComponent {
  backgroundImage = environment.svg_background_login;

  evento_formGrup: FormGroup;
  id: string;

  public archivos: any = [];

  constructor(private fb: FormBuilder,
              private _eventosProximos: EventosService,
              private _snackBar: MatSnackBar,
              private aRouter: ActivatedRoute,
              private sanitizer: DomSanitizer
  ){
    this.evento_formGrup = this.fb.group({
      campus_evento: ['', Validators.required],
      year_evento: ['', Validators.required],
      img_evento: ['', Validators.required],
      sesion: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')!;
  }

  ngOnInit(){
  }

  agregar_evento(){
    const EVENTO_PROX: Eventos = {
      campus_evento: this.evento_formGrup.get('campus_evento')?.value,
      year_evento: this.evento_formGrup.get('year_evento')?.value,
      img_evento: this.archivos[0],
      sesion: this.evento_formGrup.get('sesion')?.value
    };

    this._eventosProximos.guardarEvento(EVENTO_PROX).subscribe({
      next: (data) => {
        this._snackBar.open('Evento agregado correctamente', 'Aceptar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.evento_formGrup.reset();
        console.log(data);
      },
      error: () => {
        this._snackBar.open("Error al guardar el evento", "Aceptar", { duration: 3000 });
        this.evento_formGrup.reset();
      }
    });
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
}
