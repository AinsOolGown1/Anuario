import { Component } from '@angular/core';
import { ColeccionFotosGraduacionesService } from 'src/app/Servicios/coleccionfotos.service';
import { ColeccionGraduacion } from 'src/app/model/interfaceColeccionfotos';

@Component({
  selector: 'app-coleccion-fotos',
  templateUrl: './coleccion-fotos.component.html',
  styleUrls: ['./coleccion-fotos.component.scss']
})
export class ColeccionFotosComponent {
  imagenes: string[] = []; // Array para almacenar las rutas de las imágenes

  constructor(private _imagenesService: ColeccionFotosGraduacionesService) { }

  ngOnInit(): void {
    this.obtenerImagenesGraduaciones();
  }

  obtenerImagenesGraduaciones() {
    this._imagenesService.getImagenesGraduaciones().subscribe(
      (response) => {
        this.imagenes = response.imagenes;
      },
      (error) => {
        console.error('Error al obtener las imágenes:', error);
      }
    );
}
}
