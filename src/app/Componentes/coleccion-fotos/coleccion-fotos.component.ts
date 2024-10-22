import { Component, OnInit } from '@angular/core';
import { ColeccionFotosGraduacionesService } from 'src/app/Servicios/coleccionfotos.service';
import { ColeccionGraduacion } from 'src/app/model/Coleccion_Fotos/interfaceColeccionfotos';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-coleccion-fotos',
  templateUrl: './coleccion-fotos.component.html',
  styleUrls: ['./coleccion-fotos.component.scss']
})
export class ColeccionFotosComponent implements OnInit {
  listGraduaciones: ColeccionGraduacion[] = [];
  tallImages: Set<string> = new Set();
  imagenPordefecto = environment.logo_ucn;

  constructor(private _imagenesService: ColeccionFotosGraduacionesService) { }

  ngOnInit(): void {
    this.vistaColeccionFotosGraduaciones();
  }

    // Método para actualizar los graduados filtrados
    actualizarGraduadosFiltrados(graduaciones: ColeccionGraduacion[]): void {
      this.listGraduaciones = graduaciones;
  
      // Obtener fotos en base64 para cada colección de graduaciones
      this.listGraduaciones.forEach(graduaciones => {
        this._imagenesService.obtenerFotosGraduacion(graduaciones._id).subscribe({
          next: (res: any) => {
            graduaciones.fotos_graduaciones = res.imagenesBase64;
          },
          error: (err: any) => {
            //console.log('Error al obtener las fotos de graduación: ' + err);
          }
        });
      });
    }

  vistaColeccionFotosGraduaciones() {
    this._imagenesService.ColeccionesDeGraduaciones().subscribe({
      next: (data: any[]) => {
        this.listGraduaciones = data;

        // Obtener fotos en base64 para cada colección de graduaciones
        this.listGraduaciones.forEach(graduacion => {
          this._imagenesService.obtenerFotosGraduacion(graduacion._id).subscribe({
            next: (res: any) => {
              graduacion.fotos_graduaciones = res.imagenesBase64;
            },
            error: (err: any) => {
              //console.log('Error al obtener las fotos de graduación: ' + err);
            }
          });
        });

        //console.log('Datos de graduaciones:', this.listGraduaciones);
      },
      error: (err: any) => {
        //console.log('Error al obtener las colecciones de graduaciones: ' + err);
      }
    });
  }

  // Chequear dimensiones de imagen para ajustar estilo
  checkImageDimensions(event: Event, src: string): void {
    const imgElement = event.target as HTMLImageElement;
    const aspectRatio = imgElement.naturalWidth / imgElement.naturalHeight;
    if (aspectRatio < 1) {
      this.tallImages.add(src);
    }
  }

  // Mostrar imagen por defecto si falla la carga
  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.imagenPordefecto;
  }

  // Verifica si la imagen es "alta"
  isTallImage(src: string): boolean {
    return this.tallImages.has(src);
  }

  

}
