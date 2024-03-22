import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

//Vista publica
import { ColeccionFotosComponent } from './Componentes/coleccion-fotos/coleccion-fotos.component';
import { DashboardComponent } from './Componentes/dashboard/dashboard.component';
import { NavbarComponent } from './Componentes/navbar/navbar.component';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { VistAnuarioComponent } from './Componentes/vist-anuario/vist-anuario.component';

//Vista Admin
import { LoginComponent } from './Admin/componentes-admin/login/login.component';
import { InicioAdminComponent } from './Admin/componentes-admin/inicio-admin/inicio-admin.component';
import { IngresarGraduadosComponent } from './Admin/componentes-admin/ingresar-graduados/ingresar-graduados.component';
import { IngresarColecFotosComponent } from './Admin/componentes-admin/ingresar-colec-fotos/ingresar-colec-fotos.component';
import { InicioAdminRoutingModule } from './Admin/componentes-admin/inicio-admin/inicio-admin-routing.module';
import { NavbarAdminComponent } from './Admin/componentes-admin/navbar-admin/navbar-admin.component';
import { VerListaGraduadosComponent } from './Admin/componentes-admin/ver-lista-graduados/ver-lista-graduados.component';



//Autentificacion google
import { OAuthModule } from 'angular-oauth2-oidc';
import { SharedModule } from './Shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    ColeccionFotosComponent,
    LoginComponent,
    VistAnuarioComponent,
    InicioAdminComponent,
    IngresarGraduadosComponent,
    IngresarColecFotosComponent,
    NavbarAdminComponent,
    VerListaGraduadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OAuthModule.forRoot(),
    HttpClientModule,
    InicioAdminRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
