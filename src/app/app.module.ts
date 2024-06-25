import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DialogModule } from '@angular/cdk/dialog'

import { FlipBookModule } from '@labsforge/flipbook';

//Script JS
import { CargarScriptsService } from './Servicios/cargar-scripts.service';

//Vista publica
import { ColeccionFotosComponent } from './Componentes/coleccion-fotos/coleccion-fotos.component';
import { DashboardComponent } from './Componentes/dashboard/dashboard.component';
import { NavbarComponent } from './Componentes/navbar/navbar.component';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { FiltroAnuarioComponent } from './Componentes/filtro-anuario/filtro-anuario.component';
import { AnuariovistaComponent } from './Componentes/anuariovista/anuariovista.component';


//Vista Admin
import { LoginComponent } from './Admin/componentes-admin/login/login.component';
import { InicioAdminComponent } from './Admin/componentes-admin/inicio-admin/inicio-admin.component';
import { IngresarGraduadosComponent } from './Admin/componentes-admin/ingresar-graduados/ingresar-graduados.component';
import { IngresarColecFotosComponent } from './Admin/componentes-admin/ingresar-colec-fotos/ingresar-colec-fotos.component';
import { InicioAdminRoutingModule } from './Admin/componentes-admin/inicio-admin/inicio-admin-routing.module';
import { NavbarAdminComponent } from './Admin/componentes-admin/navbar-admin/navbar-admin.component';
import { VerListaGraduadosComponent } from './Admin/componentes-admin/ver-lista-graduados/ver-lista-graduados.component';

//Shared
import { SharedModule } from './Shared/shared.module';

//Autentificacion google
import { OAuthModule } from 'angular-oauth2-oidc';

//Formularios reactivos
import { ReactiveFormsModule } from '@angular/forms';
import { ModalanuarioComponent } from './Componentes/modalanuario/modalanuario.component';

//Angular Material
import { MatDialogModule } from '@angular/material/dialog';
import { EventosComponent } from './Componentes/eventos/eventos.component';
import { QRCodeModule } from 'angularx-qrcode';
import { SubirExcelComponent } from './Admin/componentes-admin/subir-excel/subir-excel.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    ColeccionFotosComponent,
    LoginComponent,
    InicioAdminComponent,
    IngresarGraduadosComponent,
    IngresarColecFotosComponent,
    NavbarAdminComponent,
    VerListaGraduadosComponent,
    FiltroAnuarioComponent,
    AnuariovistaComponent,
    ModalanuarioComponent,
    EventosComponent,
    SubirExcelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OAuthModule.forRoot(),
    HttpClientModule,
    InicioAdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FlipBookModule,
    DialogModule,
    MatDialogModule,
    QRCodeModule,
    LazyLoadImageModule,
    FormsModule
  ],
  providers: [
    CargarScriptsService,
    {
      provide:LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
