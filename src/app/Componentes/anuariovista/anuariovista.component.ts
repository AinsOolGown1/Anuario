import { Component, OnInit, ElementRef } from '@angular/core';
import { GraduadosService } from 'src/app/Servicios/graduados.service';
import { IngresarGraduados } from 'src/app/model/ingresar-graduados';
import { MatDialog } from '@angular/material/dialog'
import { ModalanuarioComponent } from '../modalanuario/modalanuario.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anuariovista',
  templateUrl: './anuariovista.component.html',
  styleUrls: ['./anuariovista.component.scss']
})
export class AnuariovistaComponent implements OnInit {

  listGraduados: IngresarGraduados[] = [];
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

  abrirModalAnuario(): void {
    if (!this.id || this.id.length !== 24) {
      console.error("ID de graduado no válido:", this.id);
      return;
    }
    this._matDialog.open(ModalanuarioComponent, {
        data: { id: this.id }
    });
}

  vistaAnuario(): void {
    this._graduadoService.getGraduados().subscribe((data: IngresarGraduados[]) => {
      console.log(data);
      this.listGraduados = data;

    }, (error: any) => {
      console.log('Error al obtener el graduado', error);
    });
  }
}
