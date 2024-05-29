import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GraduadosService } from 'src/app/Servicios/graduados.service';
import { IngresarGraduados } from 'src/app/model/AnuarioGraduados/ingresar-graduados';

@Component({
  selector: 'app-ver-lista-graduados',
  templateUrl: './ver-lista-graduados.component.html',
  styleUrls: ['./ver-lista-graduados.component.scss']
})
export class VerListaGraduadosComponent implements OnInit {

  listGraduados: IngresarGraduados[] = [];
  displayedColumns: string[] = [
    'carnet',
    'nombres',
    'apellidos', 
    'carrera', 
    'facultad', 
    'campus',
    'frase_emotiva', 
    'year_graduado', 
    'estado_graduado', 
    'destacado_graduado', 
    //'foto_graduado',
    'qr_graduado', 
    'acciones'
  ];
  dataSource = new MatTableDataSource<IngresarGraduados>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _graduadoService: GraduadosService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.obtenerGraduados();
  }
  //*Mostrar los graduados en la tabla
  obtenerGraduados(): void {
    this._graduadoService.getGraduados().subscribe({
      next: (data) =>{
        console.log(data);
        this.listGraduados = data;
        this.dataSource.data = this.listGraduados;
        this.dataSource.paginator = this.paginator;
      }, error: (err: any)=>{
        console.log('Error al obtener los graduados'+err)
      }
    })
  }
  //*Elimar el graduado
  eliminarGraduado(id: any): void {
    this._graduadoService.eliminarGraduado(id).subscribe({
      next: (data) =>{
        this._snackBar.open('Graduado eliminado correctamente', 'Graduado Eliminado', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
      });
      // Actualizar la lista de graduados después de eliminar uno
      this.obtenerGraduados();
      }, error: (err: any)=>{
        this._snackBar.open("Error al eliminar el graduado", "Aceptar", { duration: 3000 });
      }
    })
  }
}
