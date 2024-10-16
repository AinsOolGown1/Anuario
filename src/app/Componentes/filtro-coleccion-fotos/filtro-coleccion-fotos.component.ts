import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ColeccionGraduacion } from 'src/app/model/Coleccion_Fotos/interfaceColeccionfotos';
import { ColeccionFotosGraduacionesService } from 'src/app/Servicios/coleccionfotos.service';

@Component({
  selector: 'app-filtro-coleccion-fotos',
  templateUrl: './filtro-coleccion-fotos.component.html',
  styleUrls: ['./filtro-coleccion-fotos.component.scss']
})
export class FiltroColeccionFotosComponent implements OnInit {
  years: number[] = [2024, 2023];
  campuses: string[] = ['Central', 'Doral', 'Jinotepe', 'Extensión Estelí'];
  sessions: number[] = [1, 2];

  mostrarFiltros = false;  // Controla la visibilidad en pantallas pequeñas

  selectedYear: number | null = null;
  selectedCampus: string | null = null;
  selectedSession: string | null = null;

  constructor (private _filtrarColeccionService: ColeccionFotosGraduacionesService){}

  @Output() graduacionesFiltrados = new EventEmitter<ColeccionGraduacion[]>(); //Emitir graduado filtrado


  ngOnInit(): void {
    // this.checkScreenSize();
  }
  // Alternar visibilidad de los filtros
  toggleFiltros() {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  //Detectar el cambio de tamaño de pantalla

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   this.checkScreenSize();
  // }

  // Verificar el tamaño de la pantalla

  // checkScreenSize() {
  //   if (window.innerWidth >= 769) {
  //     this.mostrarFiltros = true; // Siempre mostrar filtros en pantallas grandes
  //   } else {
  //     this.mostrarFiltros = false; // Ocultar filtros en pantallas pequeñas
  //   }
  // }

  closeFiltro() {
    this.mostrarFiltros = false;
  }

  // Método para filtrar graduados
  filtrarColeccion(): void {
    if (this.selectedYear && this.selectedCampus && this.selectedSession) {
      const year = this.selectedYear.toString();
      const campus = this.selectedCampus!;
      const sesion = this.selectedSession?.toString();

      this._filtrarColeccionService.filtrarGraduados(year, campus, sesion).subscribe({
        next: (data) => {
          //console.log('Graduados filtrados:', data);
          this.graduacionesFiltrados.emit(data); //Aqui emitimos los graduado filtrados
        },
        error: (err) => {
          //console.error('Error al filtrar graduados:', err);
        }
      });
    } else {
      //console.warn('Por favor, completa todos los campos antes de filtrar.');
    }
  }


}
