import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {ItemsComponent} from './../items/items.component'
import { ConfigModule } from './config.module'

const routes: Routes = [
  {
    path: '',
    component: ItemsComponent,
  }
];

@NgModule({
  imports: [
    ConfigModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
  	ItemsComponent
  ],
  exports : [
  	ItemsComponent
  ]
})
export class ItemsModule{ }
