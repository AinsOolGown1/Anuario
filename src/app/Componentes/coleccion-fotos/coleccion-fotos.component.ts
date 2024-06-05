import { Component, OnInit } from '@angular/core';
import { ColeccionFotosGraduacionesService } from 'src/app/Servicios/coleccionfotos.service';
import { ColeccionGraduacion } from 'src/app/model/Coleccion_Fotos/interfaceColeccionfotos';

@Component({
  selector: 'app-coleccion-fotos',
  templateUrl: './coleccion-fotos.component.html',
  styleUrls: ['./coleccion-fotos.component.scss']
})
export class ColeccionFotosComponent implements OnInit {
  listGraduados: ColeccionGraduacion[] = [];

  array_base64_imagenes = []

  constructor(private _imagenesService: ColeccionFotosGraduacionesService) { }

  imagenPordefecto = "assets/Fotos/LOGO UCN.png"

  ngOnInit(): void {

    this.obtener_coleccion_fotos();
  }

  obtener_coleccion_fotos(){
    this._imagenesService.ObtenerImagenesGraduaciones('Jinotepe', '2023', '1').subscribe({
      next: (value) =>{

        this.array_base64_imagenes = value.coleccion_base64;

      },
      error: (err: any)=>{
        console.log('Error al obtener las fotos'+err)
      }
    })
  }


  //*metodos para verificar y cargar la imagen si es alta más que ancha
  tallImages: Set<string> = new Set();

  checkImageDimensions(event: Event, src: string): void {
    const imgElement = event.target as HTMLImageElement;
    const aspectRatio = imgElement.naturalWidth / imgElement.naturalHeight;

    // Determine if the image is tall based on its aspect ratio
    if (aspectRatio < 1) {
      this.tallImages.add(src);
    }
  }

  isTallImage(src: string): boolean {
    return this.tallImages.has(src);
  }
}
