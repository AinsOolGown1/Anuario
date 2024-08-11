import { Component } from '@angular/core';

@Component({
  selector: 'app-filtro-coleccion-fotos',
  templateUrl: './filtro-coleccion-fotos.component.html',
  styleUrls: ['./filtro-coleccion-fotos.component.scss']
})
export class FiltroColeccionFotosComponent {
  years: number[] = [2021, 2022, 2023, 2024];
  campuses: string[] = ['Campus A', 'Campus B', 'Campus C'];
  sessions: string[] = ['Sesión 1', 'Sesión 2', 'Sesión 3'];

  selectedYear: number | null = null;
  selectedCampus: string | null = null;
  selectedSession: string | null = null;

}
