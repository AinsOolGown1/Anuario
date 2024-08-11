import { Component, OnInit } from '@angular/core';
import { ColeccionFotosGraduacionesService } from 'src/app/Servicios/coleccionfotos.service';
import { ColeccionGraduacion } from 'src/app/model/Coleccion_Fotos/interfaceColeccionfotos';
import { ColeccionesDeFotos } from 'src/app/model/Coleccion_Fotos/modeloInterfazColeccionFotoa';

@Component({
  selector: 'app-coleccion-fotos',
  templateUrl: './coleccion-fotos.component.html',
  styleUrls: ['./coleccion-fotos.component.scss']
})
export class ColeccionFotosComponent implements OnInit {
  listGraduaciones: ColeccionGraduacion[] = [];
  tallImages: Set<string> = new Set();
  array_base64_imagenes = []

  constructor(private _imagenesService: ColeccionFotosGraduacionesService) { }

  imagenPordefecto = "assets/Fotos/LOGO UCN.png"

  ngOnInit(): void {
    // this.obtener_coleccion_fotos();
    this.vistaColeccionFotosGraduaciones();
  }

  // obtener_coleccion_fotos(){
  //   this._imagenesService.ObtenerImagenesGraduaciones('Central', '2024', '1').subscribe({
  //     next: (value) =>{

  //       this.array_base64_imagenes = value.coleccion_base64;
  //       console.log('Estas son las imagenes contenidas en el Array',
  //         this.array_base64_imagenes)
  //     },
  //     error: (err: any)=>{
  //       console.log('Error al obtener las fotos'+err)
  //     }
  //   })
  // }
  vistaColeccionFotosGraduaciones() {
    this._imagenesService.ColeccionesDeGraduaciones().subscribe({
      next: (data: any[]) => {
        this.listGraduaciones = data;

        // Para cada colección de graduaciones, obtener las fotos en base64
        this.listGraduaciones.forEach(graduacion => {
          this._imagenesService.obtenerFotosGraduacion(graduacion._id).subscribe({
            next: (res: any) => {
              graduacion.fotos_graduaciones = res.imagenesBase64; // Reemplaza las rutas con las imágenes en base64
            },
            error: (err: any) => {
              console.log('Error al obtener las fotos de graduación: ' + err);
            }
          });
        });

        console.log('Datos de graduaciones:', this.listGraduaciones);
      },
      error: (err: any) => {
        console.log('Error al obtener las colecciones de graduaciones: ' + err);
      }
    });
  }

  checkImageDimensions(event: Event, src: string): void {
    const imgElement = event.target as HTMLImageElement;
    console.log('Imagen cargada:', src);
    console.log('Dimensiones:', imgElement.naturalWidth, imgElement.naturalHeight);
    
    const aspectRatio = imgElement.naturalWidth / imgElement.naturalHeight;
    if (aspectRatio < 1) {
      this.tallImages.add(src);
    }
  }

  isTallImage(src: string): boolean {
    return this.tallImages.has(src);
  }
}
