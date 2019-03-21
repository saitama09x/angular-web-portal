import { Component, ViewChild, OnInit, AfterViewInit, 
	Input, Output, OnChanges, SimpleChanges, 
	SimpleChange, ViewContainerRef, 
	TemplateRef, ComponentFactoryResolver, 
	EventEmitter, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Location, DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import {UserService} from './../user.service';
import {LocationService} from './../service/LocationService';
import {DeliveryService} from './../service/DeliveryService';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AgmCoreModule,  PolylineManager } from '@agm/core';

@Component({
	selector: 'dashboard-view',
	templateUrl: './dashboard.component.html',
	styles: [],
  providers: [LocationService, DeliveryService]
})
export class DashboardComponent implements  OnInit  {

	  lat: number = 10.71801452;
  	lng: number = 122.54079024;

  	private mode = new FormControl('side');
  	
  	private labelOptions = null;
	  private polyline = [];
    private delivery_label = null;
    private location = null;
    
    @ViewChild('navigation', {read: ViewContainerRef}) 
    navigation : ViewContainerRef;

  	constructor(private userservice : UserService, 
      @Inject(DOCUMENT) private document: Document,
      private _loc : LocationService,
      private _deliv : DeliveryService
      ){
  		this.document.body.classList.add('main-body');
  	}

	ngOnInit(){
    this.delivery_label = this._deliv.get_delivery();
	}

  async changeDeliv(e){
    this.polyline = await this._loc.get_location(e);
  }

  changeTracked(e){
    
  }

}