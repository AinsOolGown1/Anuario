import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { GraduadosService } from 'src/app/Servicios/graduados.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalanuarioComponent } from '../modalanuario/modalanuario.component';
import { ActivatedRoute } from '@angular/router';
import { IGraduado } from 'src/app/model/AnuarioGraduados/interfaces';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

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
  imagenPordefecto = environment.imagen_graduado;

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
    this.vistaAnuario(); // Cargar inicialmente todos los graduados
  }

  // Método para actualizar los graduados filtrados
  actualizarGraduadosFiltrados(graduados: IGraduado[]): void {
    this.listGraduados = graduados;
    this.totalGraduados = graduados.length;
    this.paginate();

    graduados.forEach((item: IGraduado) => {
      this._graduadoService.obtenerFotoGraduado(item.carnet).subscribe({
        next: (value) => {
          this.convert(value, item);
        },
        error: (err: any) => {
          console.log('Error al obtener la foto ' + err);
        }
      });
    });
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
      const isForward = event.pageIndex > this.pageIndex;
      if (isForward) {
        this.renderer.addClass(appContainer, 'flip-container');
      } else {
        this.renderer.addClass(appContainer, 'flip-back');
      }

      setTimeout(() => {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.paginate();

        if (isForward) {
          this.renderer.removeClass(appContainer, 'flip-container');
        } else {
          this.renderer.removeClass(appContainer, 'flip-back');
        }
      }, 600); 
    }
  }

  convert(value_file: Blob, item: IGraduado): void {
    // Solo procesar si el blob es de tipo imagen
    if (['image/jpeg', 'image/jpg', 'image/png'].includes(value_file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        item.ruta_foto = reader.result as string;  // Convertir a base64
      };
      reader.readAsDataURL(value_file);
    } else {
      console.log('El archivo no es una imagen válida');
    }
  }
  

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.imagenPordefecto;
  }
}
