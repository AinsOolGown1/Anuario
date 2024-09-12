import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { GraduadosService } from 'src/app/Servicios/graduados.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalanuarioComponent } from '../modalanuario/modalanuario.component';
import { ActivatedRoute } from '@angular/router';
import { IGraduado } from 'src/app/model/AnuarioGraduados/interfaces';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-anuariovista',
  templateUrl: './anuariovista.component.html',
  styleUrls: ['./anuariovista.component.scss']
})
export class AnuariovistaComponent implements OnInit {

  listGraduados: IGraduado[] = [];
  paginatedGraduados: IGraduado[] = [];
  id: string | undefined;
  totalGraduados: number = 0;
  pageSize: number = 8;
  pageIndex: number = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private renderer: Renderer2,
    private _graduadoService: GraduadosService,
    private _matDialog: MatDialog,
    private aRouter: ActivatedRoute
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
      next: (data: IGraduado[]) => {
        this.listGraduados = data;
        this.totalGraduados = data.length;
        this.paginate();

        data.forEach((item: IGraduado) => {
          this._graduadoService.obtenerFotoGraduado(item.carnet).subscribe({
            next: (value) => {
              this.convert(value, item);
            },
            error: (err: any) => {
              console.log('Error al obtener la foto ' + err);
            }
          });
        });
      },
      error: (err: any) => {
        console.log('Error al obtener el graduado ' + err);
      }
    });
  }

  
  paginate(): void {
    if (!this.paginator) return;

    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = (this.paginator.pageIndex + 1) * this.paginator.pageSize;
    this.paginatedGraduados = this.listGraduados.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    const appContainer = document.getElementById('app');
    if (appContainer) {
      // Determina la dirección de la animación
      const isForward = event.pageIndex > this.pageIndex;

      // Aplica la animación correspondiente
      if (isForward) {
        this.renderer.addClass(appContainer, 'flip-container');
      } else {
        this.renderer.addClass(appContainer, 'flip-back');
      }

      setTimeout(() => {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.paginate();

        // Remueve las clases después de la animación
        if (isForward) {
          this.renderer.removeClass(appContainer, 'flip-container');
        } else {
          this.renderer.removeClass(appContainer, 'flip-back');
        }
      }, 600); // Duración de la animación ajustada
    }
  }

  convert(value_file: any, item: IGraduado): void {
    if (['image/jpeg', 'image/jpg', 'image/png'].includes(value_file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        item.ruta_foto = reader.result as string;
      };
      reader.readAsDataURL(value_file);
    } else {
      console.log('Esto no es una imagen');
    }
  }
}
