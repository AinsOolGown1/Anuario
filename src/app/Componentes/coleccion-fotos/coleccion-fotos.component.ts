import { Component } from '@angular/core';
import { ColeccionFotosGraduacionesService } from 'src/app/Servicios/coleccionfotos.service';
import { ColeccionGraduacion } from 'src/app/model/Coleccion_Fotos/interfaceColeccionfotos';

@Component({
  selector: 'app-coleccion-fotos',
  templateUrl: './coleccion-fotos.component.html',
  styleUrls: ['./coleccion-fotos.component.scss']
})
export class ColeccionFotosComponent {
  listGraduados: ColeccionGraduacion[] = [];

  array_base64_imagenes = []

  constructor(private _imagenesService: ColeccionFotosGraduacionesService) { }

  ngOnInit(): void {
    //this.vistaColeccionFotosGraduaciones();
    this.obtener_coleccion_fotos();
  }

  /*vistaColeccionFotosGraduaciones(): void {
    this._imagenesService.getGraduaciones().subscribe({
      next:(data: ColeccionGraduacion[]) =>{
        //*cargo el array de las fotos de las graduaciones
        this.listGraduados = data;

        console.log({datos_graduacion:data})

        //*recorro el array para obtener las fotos
        data.forEach((item: ColeccionGraduacion)=>{

          //*obtengo las fotos de las gradaciones tomado del array desde una suscripcion
          this._imagenesService.ImagenesGraduaciones(item.campus, item.year_graduacion, item.sesion).subscribe({
            next: (value) =>{
              convert(value)
            },
            error: (err: any)=>{
              console.log('Error al obtener las fotos'+err)
            }
          })

          //*creo una funcion de conversion de archivo desde el backend a una imagen64
          function convert(value_file:any){
            if(['image/jpeg','image/jpg','image/png'].includes(value_file.type)){
              const reader = new FileReader();
              reader.onload = () => {

                //*creo una ruta de imagen para ocupar de comodin y asignarla a un parametro del objeto
                item.ruta_fotos = reader.result as string;
              }
              reader.readAsDataURL(value_file);
            }else{
              console.log('Esto no es una imagen')
            }
          }
        })
      },
      error: (err: any)=>{
        console.log('Error al obtener las fotos de graduaciones'+err)
      }
    })
  }*/

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
