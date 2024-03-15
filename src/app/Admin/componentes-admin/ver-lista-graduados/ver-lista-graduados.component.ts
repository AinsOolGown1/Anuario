import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IngresarGraduados } from 'src/app/model/ingresar-graduados';


@Component({
  selector: 'app-ver-lista-graduados',
  templateUrl: './ver-lista-graduados.component.html',
  styleUrls: ['./ver-lista-graduados.component.scss']
})

export class VerListaGraduadosComponent {

  listagraduados: IngresarGraduados[] = [
    {carnet: '17-0186-6', nombres: 'Isaac Aarón', apellidos: 'Morales Zavala', carrera: 'Ingenieria en Sistemas',
    facultad: 'Ingenieria en Sistemas', campus: 'Central', frase_emotiva: 'Con fuego y con hierro',
    destacado: true, year_graduado: 2024, estado: true },
    {carnet: '18-0186-6', nombres: 'Isaac Aarón', apellidos: 'Morales Zavala', carrera: 'Ingenieria en Sistemas',
    facultad: 'Ingenieria en Sistemas', campus: 'Doral', frase_emotiva: 'Con fuego y con hierro',
    destacado: true, year_graduado: 2024, estado: true },
    {carnet: '19-0186-6', nombres: 'Isaac Aarón', apellidos: 'Morales Zavala', carrera: 'Ingenieria en Sistemas',
    facultad: 'Ingenieria en Sistemas', campus: 'Jinotepe', frase_emotiva: 'Con fuego y con hierro',
    destacado: true, year_graduado: 2024, estado: true },
    {carnet: '17-0186-6', nombres: 'Chavo del 8', apellidos: 'Morales Zavala', carrera: 'Ingenieria en Sistemas',
    facultad: 'Ingenieria en Sistemas', campus: 'Central', frase_emotiva: 'Con fuego y con hierro',
    destacado: true, year_graduado: 2024, estado: true },
    {carnet: '17-0186-6', nombres: 'Isaac Aarón', apellidos: 'Morales Zavala', carrera: 'Ingenieria en Sistemas',
    facultad: 'Ingenieria en Sistemas', campus: 'Central', frase_emotiva: 'Con fuego y con hierro',
    destacado: true, year_graduado: 2022, estado: true },
    {carnet: '17-0186-6', nombres: 'Isaac Aarón', apellidos: 'Morales Zavala', carrera: 'Ingenieria en Sistemas',
    facultad: 'Ingenieria en Sistemas', campus: 'Central', frase_emotiva: 'Con fuego y con hierro',
    destacado: true, year_graduado: 2024, estado: false},
    {carnet: '17-0186-6', nombres: 'Isaac Aarón', apellidos: 'Morales Zavala', carrera: 'Ingenieria en Sistemas',
    facultad: 'Ingenieria en Sistemas', campus: 'Esteli', frase_emotiva: 'Con fuego y con hierro',
    destacado: true, year_graduado: 2024, estado: true },
    {carnet: '20-0186-6', nombres: 'Isaac Aarón', apellidos: 'Morales Zavala', carrera: 'Ingenieria en Sistemas',
    facultad: 'Ingenieria en Sistemas', campus: 'Doral', frase_emotiva: 'Con fuego y con hierro',
    destacado: true, year_graduado: 2021, estado: true },
    {carnet: '17-0186-6', nombres: 'Isaac Aarón', apellidos: 'Morales Zavala', carrera: 'Ingenieria en Sistemas',
    facultad: 'Ingenieria en Sistemas', campus: 'Central', frase_emotiva: 'Con fuego y con hierro',
    destacado: true, year_graduado: 2024, estado: true },
    {carnet: '20-0186-6', nombres: 'Isaac Aarón', apellidos: 'Morales Zavala', carrera: 'Ingenieria en Sistemas',
    facultad: 'Ingenieria en Sistemas', campus: 'Central', frase_emotiva: 'Con fuego y con hierro',
    destacado: true, year_graduado: 2023, estado: true },
    {carnet: '18-0186-6', nombres: 'Isaac Aarón', apellidos: 'Morales Zavala', carrera: 'Ingenieria en Sistemas',
    facultad: 'Ingenieria en Sistemas', campus: 'Jinotepe', frase_emotiva: 'Con fuego y con hierro',
    destacado: true, year_graduado: 2024, estado: true },
    {carnet: '19-0186-6', nombres: 'Isaac Aarón', apellidos: 'Morales Zavala', carrera: 'Ingenieria en Sistemas',
    facultad: 'Ingenieria en Sistemas', campus: 'Jinotepe', frase_emotiva: 'Con fuego y con hierro',
    destacado: true, year_graduado: 2024, estado: true }
  ];

  displayedColumns: string[] = ['carnet', 'nombres', 'apellidos', 'carrera', 'facultad', 'campus',
  'frase_emotiva', 'destacado', 'year_graduado', 'estado'];
  dataSource: MatTableDataSource<IngresarGraduados> = new MatTableDataSource(this.listagraduados);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //Filtro de busqueda
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

}

