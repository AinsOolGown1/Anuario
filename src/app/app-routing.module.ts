import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Rutas modulo vista publica
import { DashboardComponent } from './Componentes/dashboard/dashboard.component';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { ColeccionFotosComponent } from './Componentes/coleccion-fotos/coleccion-fotos.component';
import { LoginComponent } from './Admin/componentes-admin/login/login.component';
import { AnuariovistaComponent } from './Componentes/anuariovista/anuariovista.component';

//Rutas modulo vista admin

const routes: Routes = [

  //Rutas para la vista Administrador
  {path:'login', component: LoginComponent},
  {path:'inicio-admin', loadChildren:()=> import('./Admin/componentes-admin/inicio-admin/inicio-admin.module')
  .then(x => x.InicioAdminModule)},



  //Rutas para la vista publica
  {path: '', component: DashboardComponent, children:[
    {path: '', component: InicioComponent},
    {path:'inicio', component:InicioComponent},
    {path: 'coleccion-fotos', component: ColeccionFotosComponent},
    {path: 'inicio/anuariovista', component: AnuariovistaComponent}

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
