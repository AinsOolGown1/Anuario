import { Component, EventEmitter, Output } from '@angular/core';
import { Facultad } from 'src/app/model/Seleccion_carreras_facultad/Interfaz_Facultad';
import { Carreras } from 'src/app/model/Seleccion_carreras_facultad/Interfaz_Carreras';
import { GraduadosService } from 'src/app/Servicios/graduados.service';
import { Observable } from 'rxjs';
import { IGraduado } from 'src/app/model/AnuarioGraduados/interfaces';

@Component({
  selector: 'app-filtro-anuario',
  templateUrl: './filtro-anuario.component.html',
  styleUrls: ['./filtro-anuario.component.scss']
})
export class FiltroAnuarioComponent {
  years: number[] = [2023, 2024];
  campus: string[] = ['Central', 'Doral', 'Jinotepe', 'Extensión Estelí'];
  facultades: Facultad[] = [
    { id: 1, name: 'Ciencias Médicas', carreras: [
      { id: 0, name: 'Seleccionar una carrera' },
      { id: 1, name: 'Medicina' },
      { id: 2, name: 'Farmacia' },
      { id: 3, name: 'Enfermería' },
      { id: 4, name: 'Psicología' }
    ]},
    { id: 2, name: 'Medicina Veterinaria', carreras: [
      { id: 0, name: 'Seleccionar una carrera' },
      { id: 5, name: 'Medicina Veterinaria' }
    ]},
    { id: 3, name: 'Ciencias Administrativas', carreras: [
      { id: 0, name: 'Seleccionar una carrera' },
      { id: 6, name: 'Administración de Empresas' },
      { id: 7, name: 'Contabilidad Pública y Auditoría' },
      { id: 8, name: 'Administración de Turismo y Hotelería' },
      { id: 9, name: 'Mercadotecnia' }
    ]},
    { id: 4, name: 'Ciencias Jurídicas y Sociales', carreras: [
      { id: 0, name: 'Seleccionar una carrera' },
      { id: 10, name: 'Derecho' },
      { id: 11, name: 'Relaciones Internacionales y Comercio Exterior' }
    ]},
    { id: 5, name: 'Ingeniería en Sistemas', carreras: [
      { id: 0, name: 'Seleccionar una carrera' },
      { id: 12, name: 'Ingeniería en Sistemas' }
    ]}
  ];

  selectedYear: number | null = null;
  selectedCampus: string | null = null;
  selectedFacultad: string | null = null;
  selectedCarrera: string | null = null; 
  carreras: Carreras[] = [];

  constructor(
    private _filtroGraduadoService: GraduadosService
  ) {}

  @Output() graduadosFiltrados = new EventEmitter<IGraduado[]>(); //Emitir graduado filtrado

  // Método para filtrar graduados
  filtrarGraduados(): void {
    if (this.selectedYear && this.selectedCampus && this.selectedFacultad && this.selectedCarrera) {
      const year = this.selectedYear.toString();
      const campus = this.selectedCampus!;
      const facultad = this.selectedFacultad!;
      const carrera = this.selectedCarrera!;

      this._filtroGraduadoService.filtrarGraduados(year, campus, facultad, carrera).subscribe({
        next: (data) => {
          console.log('Graduados filtrados:', data);
          this.graduadosFiltrados.emit(data); //Aqui emitimos los graduado filtrados
        },
        error: (err) => {
          //console.error('Error al filtrar graduados:', err);
        }
      });
    } else {
      //console.warn('Por favor, completa todos los campos antes de filtrar.');
    }
  }

  onFacultadChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedFacultad = selectElement.value;

    // Actualizar las carreras basadas en la facultad seleccionada
    const facultadSeleccionada = this.facultades.find(facultad => facultad.name === this.selectedFacultad);
    this.carreras = facultadSeleccionada ? facultadSeleccionada.carreras : [];
    this.selectedCarrera = null;  // Resetear la selección de carrera
  }

  onSelectCarrera(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCarrera = selectElement.value;
    console.log('Selected Carrera:', this.selectedCarrera);  // Debug
  }
}
