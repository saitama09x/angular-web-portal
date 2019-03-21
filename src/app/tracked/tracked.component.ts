import { Component, ViewChild, OnInit, AfterViewInit, 
Input, Output, OnChanges, SimpleChanges, 
SimpleChange, ViewContainerRef, 
TemplateRef, ComponentFactoryResolver, 
EventEmitter, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Location, DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";
import {UserService} from './../user.service';
import {LocationService} from './../service/LocationService';
import {DeliveryService} from './../service/DeliveryService';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
selector: 'tracked-view',
templateUrl: './tracked.component.html',
styles: [],
providers: [LocationService]
})
export class TrackedComponent implements  OnInit  {
private mode = new FormControl('side');
private lat : number = 10.71801472;
private long : number = 122.54078674;
private loc_id = null;
private markers = null;
constructor(private _loc : LocationService,
	private active_route : ActivatedRoute,
	private router: Router){

}
ngOnInit(){
this.active_route.params.subscribe(params => {
this.loc_id = params['id']
});

this.markers = this._loc.get_tracked(this.loc_id);
}



}