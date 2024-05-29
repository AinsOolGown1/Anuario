import { Component, OnInit, ElementRef } from '@angular/core';
import { GraduadosService } from 'src/app/Servicios/graduados.service';
import { IngresarGraduados } from 'src/app/model/AnuarioGraduados/ingresar-graduados';
import { MatDialog } from '@angular/material/dialog'
import { ModalanuarioComponent } from '../modalanuario/modalanuario.component';
import { ActivatedRoute } from '@angular/router';
import { IGraduado } from 'src/app/model/AnuarioGraduados/interfaces';

@Component({
  selector: 'app-anuariovista',
  templateUrl: './anuariovista.component.html',
  styleUrls: ['./anuariovista.component.scss']
})
export class AnuariovistaComponent implements OnInit {

  listGraduados: IGraduado[] = [];
  id: string | undefined;

  constructor(private _graduadoService: GraduadosService,
    private _matDialog: MatDialog,
    private aRouter: ActivatedRoute,
    private elRef: ElementRef

  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id')!;
  }


  ngOnInit(): void {
    this.vistaAnuario();
  }

  abrirModalAnuario(carnet: string): void {
    if (!carnet) {
      console.error("Carnet de graduado no válido:", carnet);
      return;
    }
    this._matDialog.open(ModalanuarioComponent, {
        data: { carnet: carnet }
    });
  }
  vistaAnuario(): void {
    this._graduadoService.getGraduados().subscribe({
      next:(data: IGraduado[]) =>{
        //*cargo el array de graduados
        this.listGraduados = data;

        //*recorro el array para obtener la foto
        data.forEach((item: IGraduado)=>{

          //*obtengo la foto del graduado tomado del array desde una suscripcion
          this._graduadoService.obtenerFotoGraduado(item.carnet).subscribe({
            next: (value) =>{
              convert(value)
            },
            error: (err: any)=>{
              console.log('Error al obtener la foto'+err)
            }
          })

          //*creo una funcion de conversion de archivo desde el backend a una imagen64
          function convert(value_file:any){
            if(['image/jpeg','image/jpg','image/png'].includes(value_file.type)){
              const reader = new FileReader();
              reader.onload = () => {

                //*creo una ruta de imagen para ocupar de comodin y asignarla a un parametro del objeto
                item.ruta_foto = reader.result as string;
              }
              reader.readAsDataURL(value_file);
            }else{
              console.log('Esto no es una imagen')
            }
          }

        })
      },
      error: (err: any)=>{
        console.log('Error al obtener el graduado'+err)
      }
    })
  }

}
