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
selector: 'location-view',
templateUrl: './location.component.html',
styles: [],
providers: [LocationService, DeliveryService]
})
export class LocationComponent implements  OnInit  {

private mode = new FormControl('side');
private markers = [];
private track_markers = [];
private lat : number = 10.71801472;
private long : number = 122.54078674;
private deliv_id = null;
private loc_id = null;
private detail = null
constructor(private _loc : LocationService,
	private active_route : ActivatedRoute,
	private _deliv : DeliveryService,
	private router: Router){

}
async ngOnInit(){
this.active_route.params.subscribe(params => {
this.deliv_id = params['id']
this.detail = this._deliv.getSingleDetail(this.deliv_id);
});
let res = await this._loc.get_location(this.deliv_id);
this.markers = res;
let track = await this._loc.get_tracked(this.deliv_id);
this.track_markers = track;
}

onmarkerClick(event){
	event.openInfoWindow = false
	console.log(event)
}

}