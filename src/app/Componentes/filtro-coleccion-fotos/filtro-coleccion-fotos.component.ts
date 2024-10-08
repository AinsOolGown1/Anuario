import { Component, EventEmitter, Output } from '@angular/core';
import { ColeccionGraduacion } from 'src/app/model/Coleccion_Fotos/interfaceColeccionfotos';
import { ColeccionFotosGraduacionesService } from 'src/app/Servicios/coleccionfotos.service';

@Component({
  selector: 'app-filtro-coleccion-fotos',
  templateUrl: './filtro-coleccion-fotos.component.html',
  styleUrls: ['./filtro-coleccion-fotos.component.scss']
})
export class FiltroColeccionFotosComponent {
  years: number[] = [2024, 2023];
  campuses: string[] = ['Central', 'Doral', 'Jinotepe', 'Extensión Estelí'];
  sessions: number[] = [1, 2];

  selectedYear: number | null = null;
  selectedCampus: string | null = null;
  selectedSession: string | null = null;

  constructor (private _filtrarColeccionService: ColeccionFotosGraduacionesService){}

  @Output() graduacionesFiltrados = new EventEmitter<ColeccionGraduacion[]>(); //Emitir graduado filtrado

  // Método para filtrar graduados
  filtrarColeccion(): void {
    if (this.selectedYear && this.selectedCampus && this.selectedSession) {
      const year = this.selectedYear.toString();
      const campus = this.selectedCampus!;
      const sesion = this.selectedSession?.toString();

      this._filtrarColeccionService.filtrarGraduados(year, campus, sesion).subscribe({
        next: (data) => {
          console.log('Graduados filtrados:', data);
          this.graduacionesFiltrados.emit(data); //Aqui emitimos los graduado filtrados
        },
        error: (err) => {
          console.error('Error al filtrar graduados:', err);
        }
      });
    } else {
      console.warn('Por favor, completa todos los campos antes de filtrar.');
    }
  }


}
