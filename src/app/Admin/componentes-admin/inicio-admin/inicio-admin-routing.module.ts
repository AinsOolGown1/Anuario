import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioAdminComponent } from './inicio-admin.component';
import { IngresarGraduadosComponent } from '../ingresar-graduados/ingresar-graduados.component';
import { IngresarColecFotosComponent } from '../ingresar-colec-fotos/ingresar-colec-fotos.component';
import { VerListaGraduadosComponent } from '../ver-lista-graduados/ver-lista-graduados.component';
import { SubirExcelComponent } from '../subir-excel/subir-excel.component';

const routes: Routes = [
  {path:'', component:InicioAdminComponent, children:[
    {path:'',component: VerListaGraduadosComponent},
    {path:'ver-lista-graduados',component: VerListaGraduadosComponent},
    {path:'ingresar-graduados', component:IngresarGraduadosComponent},
    {path:'editar-graduado/:id', component:IngresarGraduadosComponent},
    {path:'ingresar-colec-fotos', component:IngresarColecFotosComponent},
    {path: 'subir-excel', component:SubirExcelComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioAdminRoutingModule { }
