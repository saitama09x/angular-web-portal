import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { ConfigModule } from './modules/config.module'

import { LoginModule } from './modules/login.module'
import { UserModule } from './modules/user.module'
import { DeliveryModule } from './modules/delivery.module'
import { DashboardModule } from './modules/dashboard.module'
import { NavModule } from './modules/nav.module'
import { ItemsModule } from './modules/item.module'
import { LocationComponent } from './location/location.component'

import { ProgressbarService } from './service/Progressbar';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [

  {path : '', loadChildren : './modules/login.module#LoginModule'},
  {path : 'delivery', loadChildren : './modules/delivery.module#DeliveryModule'},
  {path : 'items', loadChildren : './modules/item.module#ItemsModule'  },
  {path : 'location/:id', component : LocationComponent},

];


@NgModule({
  declarations: [
    AppComponent,
    LocationComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    ConfigModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    NavModule,
  ],
  providers: [ProgressbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
