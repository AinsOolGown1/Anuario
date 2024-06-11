import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../Servicios/filtro_graduados.service';

interface Year {
  id: number;
  year: number;
}

interface Campus {
  id: number;
  name: string;
}

interface Faculty {
  id: number;
  name: string;
  careers: Career[];
}

interface Career {
  id: number;
  name: string;
}

@Component({
  selector: 'app-filtro-anuario',
  templateUrl: './filtro-anuario.component.html',
  styleUrls: ['./filtro-anuario.component.scss']
})
export class FiltroAnuarioComponent implements OnInit {
  years: Year[] = [
    { id: 1, year: 2020 },
    { id: 2, year: 2021 },
    { id: 3, year: 2022 },
    { id: 4, year: 2023 },
    { id: 5, year: 2024 }
  ];

  campuses: Campus[] = [
    { id: 1, name: 'Central' },
    { id: 2, name: 'Doral' },
    { id: 3, name: 'Jinotepe' },
    { id: 4, name: 'Extensión Estelí' }
  ];

  faculties: Faculty[] = [
    { id: 1, name: 'Ciencias Médicas', careers: [
      { id: 1, name: 'Medicina' },
      { id: 2, name: 'Farmacia' },
      { id: 3, name: 'Enfermeria' },
      { id: 4, name: 'Psicologia' }
    ]},
    { id: 2, name: 'Medicina Veterinaria', careers: [
      { id: 5, name: 'Medicina Veterinaria' }
    ]},
    { id: 3, name: 'Ciencias Administrativas', careers: [
      { id: 6, name: 'Administración de Empresas' },
      { id: 7, name: 'Contabilidad Pública y Auditoría' },
      { id: 8, name: 'Administración de Turismo y Hotelería' },
      { id: 9, name: 'Mercadotecnia' }
    ]},
    { id: 4, name: 'Ciencias Juridicas y Sociales', careers: [
      { id: 10, name: 'Derecho' },
      { id: 11, name: 'Relaciones Internacionales y Comercio exterior' }
    ]},
    { id: 5, name: 'Ingenieria en Sistemas', careers: [
      { id: 12, name: 'Ingenieria en Sistemas' }
    ]}
  ];

  selectedYear?: number;
  selectedCampus?: number;
  selectedFaculty?: Faculty;
  selectedCareer?: number;
  filteredData: any[] = [];

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {}

  onFacultyChange() {
    this.selectedCareer = undefined; // Reset selected career when faculty changes
  }

  getFilteredResults() {
    this.filterService.getFilteredData(
      this.selectedYear,
      this.selectedCampus?.toString(),
      this.selectedFaculty?.name,
      this.selectedCareer?.toString()
    ).subscribe(data => {
      this.filteredData = data;
    });
  }
}
