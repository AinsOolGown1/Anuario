import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GraduadosService } from 'src/app/Servicios/graduados.service';
import { IngresarGraduados } from 'src/app/model/AnuarioGraduados/ingresar-graduados';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modalanuario',
  templateUrl: './modalanuario.component.html',
  styleUrls: ['./modalanuario.component.scss']
})
export class ModalanuarioComponent implements OnInit {
  graduadoSeleccionado: IngresarGraduados | null = null
  imagen_graduado: any;
  imagenPordefecto = environment.imagen_graduado;

  constructor(public _matDialogRef: MatDialogRef<ModalanuarioComponent>,
    private _graduadoService: GraduadosService,
    @Inject(MAT_DIALOG_DATA) public data: { carnet: string }
  ){
    //console.log('Datos recibidos en el constructor:', data);
  }

  ngOnInit(): void {
    if (this.data && this.data.carnet) {
      this.vistaAnuario(this.data.carnet);
      this.obtenerFoto(this.data.carnet)
    } else {
      //console.error('El objeto de datos es nulo o no tiene una propiedad "carnet" válida.');
    }
  }

  vistaAnuario(carnet: string): void {
    this._graduadoService.obtenerEstudiantePorCarnet(carnet).subscribe({
      next: (estudiante: IngresarGraduados) => {
        if (estudiante) {
          this.graduadoSeleccionado = estudiante;
          //console.log(estudiante)
        } else {
          //console.error('No se encontró ningún estudiante con el carnet proporcionado.');
        }
      },
      error: (err: any)=>{
        //console.log('Error al obtener el graduado'+err.message)
      }
  });
  }

  obtenerFoto(carnet:string){
    this._graduadoService.obtenerFotoGraduado(carnet).subscribe({
    next: (value) =>{
      this.convertirBase64(value)
    },
    error: (err: any)=>{
      //console.log('Error al obtener la foto'+err.message)
    }
  })
  }
  convertirBase64(archivo:any){
    if(['image/jpeg','image/jpg','image/png'].includes(archivo.type)){
      const reader = new FileReader();
      reader.onload = () => {
        this.imagen_graduado = reader.result as string;
      }
      reader.readAsDataURL(archivo);
    }else{
      //console.log('Esto no es una imagen')
    }
  };

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.imagenPordefecto;
  }
}
