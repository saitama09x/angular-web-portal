import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './../dashboard/dashboard.component'
import { ConfigModule } from './config.module'
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
  	DashboardComponent
  ],
  imports: [
    ConfigModule,
  ],
  exports : [
  	 DashboardComponent	
  ]
})
export class DashboardModule{ }