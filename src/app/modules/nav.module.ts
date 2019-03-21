import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ConfigModule } from './config.module'
import { NavComponent } from './../nav/nav.component'

@NgModule({
  imports: [
    CommonModule,
  	ConfigModule,
    RouterModule
  ],
  declarations: [
  	NavComponent
  ],
  entryComponents: [NavComponent],
  exports : [
  	NavComponent
  ]
})
export class NavModule{ }