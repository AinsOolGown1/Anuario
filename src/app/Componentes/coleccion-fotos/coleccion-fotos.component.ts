import { Component, OnInit } from '@angular/core';
import { ColeccionFotosGraduacionesService } from 'src/app/Servicios/coleccionfotos.service';
import { ColeccionGraduacion } from 'src/app/model/Coleccion_Fotos/interfaceColeccionfotos';

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
    //this.obtener_coleccion_fotos();
    this.vistaColeccionFotosGraduaciones();
  }

  /*obtener_coleccion_fotos(){
    this._imagenesService.ObtenerImagenesGraduaciones('Extensión Esteli', '2024', '1').subscribe({
      next: (value) =>{

        this.array_base64_imagenes = value.coleccion_base64;
        console.log('Estas son las imagenes contenidas en el Array',
          this.array_base64_imagenes)
      },
      error: (err: any)=>{
        console.log('Error al obtener las fotos'+err)
      }
    })
  }*/
    vistaColeccionFotosGraduaciones(): void {
      this._imagenesService.getGraduaciones_coleccion().subscribe({
        next: (data: ColeccionGraduacion[]) => {
          this.listGraduaciones = data;
    
          data.forEach((item: ColeccionGraduacion) => {
            this._imagenesService.obtenerColeccionFotosGraduaciones(item._id).subscribe({
              next: (blobs: Blob[]) => {
                const base64ImagesPromises = blobs.map(blob => this.convertBlobToBase64(blob));
                Promise.all(base64ImagesPromises).then(base64ImagesArray => {
                  item.ruta_fotos = base64ImagesArray.flat(); // Asegúrate de que ruta_fotos sea un array de strings
                });
              },
              error: (err: any) => {
                console.log('Error al obtener la foto: ' + err);
              }
            });
          });
        },
        error: (err: any) => {
          console.log('Error al obtener el graduado: ' + err);
        }
      });
    }   
  
    convertBlobToBase64(blob: Blob): Promise<string[]> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve([result]); // Aquí asumo que el blob es un solo archivo, ajusta si es necesario
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }
  
    checkImageDimensions(event: Event, src: string): void {
      const imgElement = event.target as HTMLImageElement;
      const aspectRatio = imgElement.naturalWidth / imgElement.naturalHeight;
  
      if (aspectRatio < 1) {
        this.tallImages.add(src);
      }
    }
  
    isTallImage(src: string): boolean {
      return this.tallImages.has(src);
    }
}
