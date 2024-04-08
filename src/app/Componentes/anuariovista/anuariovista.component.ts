import { Component } from '@angular/core';
import { GraduadosService } from 'src/app/Servicios/graduados.service';
import { IngresarGraduados } from 'src/app/model/ingresar-graduados';

@Component({
  selector: 'app-anuariovista',
  templateUrl: './anuariovista.component.html',
  styleUrls: ['./anuariovista.component.scss']
})
export class AnuariovistaComponent {

  listGraduados: IngresarGraduados[] = [];

  constructor(private _graduadoService: GraduadosService) {}


  ngOnInit(): void {
    this.obtenerGraduados();
  }

  obtenerGraduados(): void {
    this._graduadoService.getGraduados().subscribe((data: IngresarGraduados[]) => {
      console.log(data);
      this.listGraduados = data;
    }, (error: any) => {
      console.log(error);
    });
  }

}
