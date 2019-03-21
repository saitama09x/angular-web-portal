import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ConfigModule } from './config.module'
import { DeliveryComponent, AddDeliveryComponent, DeliveryDetailComponent, 
  ItemDialogComponent, ItemAddDialogComponent } from './../delivery/delivery.component';
import { NavModule } from './nav.module'
import { AgmCoreModule } from '@agm/core';
import {DeliveryService} from './../service/DeliveryService';

const routes: Routes = [
  {
    path: '',
    component: DeliveryComponent,
  },
  {
    path : ':id',
    component : DeliveryDetailComponent
  }
];

@NgModule({
  imports: [
    ConfigModule,
    RouterModule.forChild(routes),
  ],
  entryComponents: [AddDeliveryComponent, ItemDialogComponent, ItemAddDialogComponent],
  providers: [DeliveryService],
  declarations: [
  	DeliveryComponent,
    AddDeliveryComponent, 
    DeliveryDetailComponent, 
    ItemDialogComponent, 
    ItemAddDialogComponent
  ],
  exports : [
  	DeliveryComponent,
    AddDeliveryComponent, 
    DeliveryDetailComponent, 
    ItemDialogComponent, 
    ItemAddDialogComponent
  ]
})
export class DeliveryModule{ }