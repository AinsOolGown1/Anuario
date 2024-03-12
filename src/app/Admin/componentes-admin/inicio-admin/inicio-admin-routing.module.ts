import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioAdminComponent } from './inicio-admin.component';
import { IngresarGraduadosComponent } from '../ingresar-graduados/ingresar-graduados.component';
import { IngresarColecFotosComponent } from '../ingresar-colec-fotos/ingresar-colec-fotos.component';
import { VerListaGraduadosComponent } from '../ver-lista-graduados/ver-lista-graduados.component';

const routes: Routes = [
  {path:'', component:InicioAdminComponent, children:[
    {path:'',component: VerListaGraduadosComponent},
    {path:'ver-lista-graduados',component: VerListaGraduadosComponent},
    {path:'ingresar-graduados', component:IngresarGraduadosComponent},
    {path:'ingresar-colec-fotos', component:IngresarColecFotosComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioAdminRoutingModule { }
