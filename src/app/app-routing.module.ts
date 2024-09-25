import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Rutas modulo vista publica
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { ColeccionFotosComponent } from './Componentes/coleccion-fotos/coleccion-fotos.component';
import { LoginComponent } from './Admin/componentes-admin/login/login.component';
import { AnuariovistaComponent } from './Componentes/anuariovista/anuariovista.component';
import { authGuard } from './guards/auth.guard'; 

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
  {path:'admin', 
    loadChildren:()=> import('./Admin/componentes-admin/inicio-admin/inicio-admin.module')
    .then(x => x.InicioAdminModule),
    canActivate: [authGuard]
  },
  //!Rutas para la vista publica
  {path:'inicio', component:InicioComponent},
  {path:'coleccion-fotos', component: ColeccionFotosComponent},
  {path:'anuarios', component: AnuariovistaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
