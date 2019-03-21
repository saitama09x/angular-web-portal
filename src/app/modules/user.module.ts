import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ConfigModule } from './config.module'
import { NavModule } from './nav.module'
import { UserComponent, AddUserComponent, 
	ListUserComponent, EditUserComponent } from './../users/user.component'
import { UserService } from './../service/UserService';

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  }
];

@NgModule({
  imports: [
  	ConfigModule,
    RouterModule.forChild(routes),
  ],
  providers: [UserService],
  declarations: [
  	UserComponent,
  	AddUserComponent,
  	EditUserComponent,
  	ListUserComponent
  ],
  entryComponents: [EditUserComponent],
  exports : [
  	UserComponent,
  	AddUserComponent,
  	EditUserComponent,
  	ListUserComponent
  ]
})
export class UserModule{ }