import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Rutas modulo vista publica
import { DashboardComponent } from './Componentes/dashboard/dashboard.component';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { ColeccionFotosComponent } from './Componentes/coleccion-fotos/coleccion-fotos.component';
import { LoginComponent } from './Admin/componentes-admin/login/login.component';
import { AnuariovistaComponent } from './Componentes/anuariovista/anuariovista.component';
import { EventosComponent } from './Componentes/eventos/eventos.component';
import { NavbarComponent } from './Componentes/navbar/navbar.component';
import { FiltroAnuarioComponent } from './Componentes/filtro-anuario/filtro-anuario.component';

//Rutas modulo vista admin

const routes: Routes = [
  //!Rutas para la vista Administrador
  {
    path:'', redirectTo: 'inicio', pathMatch: 'full'
  },
  {
    path:'login', component: LoginComponent,
    data:{
      title: 'Iniciar Sesión'
    }
  },
  {path:'inicio-admin', 
    loadChildren:()=> import('./Admin/componentes-admin/inicio-admin/inicio-admin.module')
    .then(x => x.InicioAdminModule)
  },
  //!Rutas para la vista publica
  {path:'inicio', component:InicioComponent},
  {path: 'coleccion-fotos', component: ColeccionFotosComponent},
  {path: 'anuarios', component: AnuariovistaComponent},
  {path:'eventos', component: EventosComponent},
  {path:'filtro-anuario', component: FiltroAnuarioComponent},
  // {path: '', component: DashboardComponent, children:[
  // ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
