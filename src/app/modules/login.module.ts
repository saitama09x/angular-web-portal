import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, LogoutComponent, ConfigComponent } from './../login/login.component'
import { DashboardModule } from './dashboard.module'
import { ConfigModule } from './config.module'
import { SignUpComponent } from './../users/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path : 'logout',
    component : LogoutComponent
  },
  {
    path : 'config',
    component : ConfigComponent
  }
];

@NgModule({
  imports: [
  	ConfigModule,
    DashboardModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
  	LoginComponent,
    SignUpComponent,
    ConfigComponent,
    LogoutComponent
  ],
  entryComponents: [SignUpComponent],
  exports : [
  	LoginComponent,
    SignUpComponent,
    ConfigComponent,
    LogoutComponent
  ]
})
export class LoginModule{ }