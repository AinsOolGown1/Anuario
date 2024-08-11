import { Component } from '@angular/core';


@Component({
  selector: 'app-filtro-anuario',
  templateUrl: './filtro-anuario.component.html',
  styleUrls: ['./filtro-anuario.component.scss']
})
export class FiltroAnuarioComponent {
  years: number[] = [2021, 2022, 2023, 2024];
  campuses: string[] = ['Campus A', 'Campus B', 'Campus C'];
  facultades: string[] = [
    'Ciencias Médicas',
    'Medicina Veterinaria',
    'Ciencias Administrativas',
    'Ciencias Jurídicas y Sociales',
    'Ingeniería en Sistemas'
  ];
  carreras: string[] = ['Carrera 1', 'Carrera 2', 'Carrera 3'];

  selectedYear: number | null = null;
  selectedCampus: string | null = null;
  selectedFacultad: string | null = null;
  selectedCarrera: string | null = null;

}
