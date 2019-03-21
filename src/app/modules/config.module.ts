import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialComponent } from './../material.component';
import { CdkTableModule} from '@angular/cdk/table';
import { MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
		AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDKYdUK09PawybwDzJCetDvpXlQMhN6ny4'
    })
  ],
  exports : [
  	CommonModule,
    AgmCoreModule,
  	HttpClientModule,
  	FormsModule,
  	ReactiveFormsModule,
  	MaterialComponent,
  ]
})
export class ConfigModule{ }