import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';

import { InicioAdminRoutingModule } from './inicio-admin-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    InicioAdminRoutingModule,
    SharedModule
  ]
})
export class InicioAdminModule { }
