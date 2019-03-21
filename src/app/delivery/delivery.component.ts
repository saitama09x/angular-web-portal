import { Component, ViewChild, OnInit, OnDestroy, DoCheck, AfterViewInit, 
Input, Output, OnChanges, SimpleChanges, AfterViewChecked,
SimpleChange, ViewContainerRef, 
TemplateRef, ComponentFactoryResolver, 
EventEmitter, Inject, Renderer2 } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Location, DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from "@angular/router";
import {UserService} from './../user.service';
import {LocationService} from './../service/LocationService';
import {DeliveryService} from './../service/DeliveryService';
import {ItemsService} from './../service/ItemsService';
import {ProgressbarService} from './../service/Progressbar';
import {AppComponent} from './../app.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
selector: 'delivery-view',
templateUrl: './delivery.component.html',
styles: [],
providers: [LocationService]
})
export class DeliveryComponent implements  OnInit, AfterViewInit, AfterViewChecked  {

private mode = new FormControl('side');
private deliveries = null;
private is_loading = true;
constructor(private userservice : UserService,
private location : LocationService,
private _deliv : DeliveryService,
private dialog: MatDialog,
private progressbar : ProgressbarService){
}

async ngOnInit(){
	this.deliveries = await this._deliv.get_delivery();	
}

async ngAfterViewInit(){
	
}

async ngAfterViewChecked() {
	
}

addDelivery(){
let dialogRef = this.dialog.open(AddDeliveryComponent, {
width : '30%',
role : 'alertdialog'
});
dialogRef.afterClosed().subscribe(result => {
this.deliveries = this._deliv.get_delivery();
})
}
}


@Component({
selector: 'add-delivery',
templateUrl: './forms/add-delivery.html',
styles: [],
providers: []
})
export class AddDeliveryComponent implements  OnInit  {

private form : FormGroup


constructor(private fb: FormBuilder, 
	private _deliv : DeliveryService, 
	private dialogRef: MatDialogRef<DeliveryComponent>){
this.form = fb.group({ 
'delivery_no' : [null, Validators.required],
'unit_no' : [null, Validators.required], 
'routes_details' : [null, Validators.required],
'source_control' : [null, Validators.required],
'destination' : [null, Validators.required],
});
}

ngOnInit(){
	
}

AddDelivery(form : NgForm){
let controls = form.controls;
let data = {
delivery_no : controls.delivery_no.value,
unit_no : controls.unit_no.value,
routes_details : controls.routes_details.value,
source : controls.source_control.value,
destination : controls.destination.value
}
let deliv = this._deliv.saveDelivery(data);
if(deliv){
this.dialogRef.close();
}
}

}

@Component({
selector: 'delivery-detail-view',
templateUrl: './delivery-detail.component.html',
styles: [],
providers: [LocationService]
})
export class DeliveryDetailComponent implements  OnInit  {
private lat : number = 10.71801472;
private long : number = 122.54078674;
private deliv_id = null;
private loc_id = null;
private detail = null
private markers = [];
private mode = new FormControl('side');
constructor(private _deliv : DeliveryService, 
	private router: Router,
	private active_route : ActivatedRoute,
	private _loc : LocationService,
	private dialog: MatDialog){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			this.showPosition(position)
		});
	}
}

showPosition(position){
	/*this.lat = position.coords.latitude
	this.long = position.coords.longitude*/	
}

async ngOnInit(){
this.active_route.params.subscribe(params => {
this.deliv_id = params['id']
this.detail = this._deliv.getSingleDetail(this.deliv_id);

});
let res = await this._loc.get_location(this.deliv_id);
this.markers = res;
}

onMapClick($event){
let loc = $event['coords'];
let lat = loc['lat'];
let long = loc['lng'];
this.markers.push({
	latitude : lat,
	longitude : long,
	label : {
		color : "black",
	  	fontWeight : "bold",
	  	text : lat + " - " + long
	}
})
}

async onSubmitTrack(){

let marks_arr = [];
for(let i in this.markers){
marks_arr.push({
latitude : this.markers[i].latitude,
longitude : this.markers[i].longitude,
})
}

let location = {
deliv_id : this.deliv_id,
marks : JSON.stringify(marks_arr)
}
this.loc_id = await this._loc.set_location(location)
if(this.loc_id){
let res = await this._loc.get_location(this.deliv_id);
this.markers = res;
}
}

onViewMap(){
	this.router.navigate(['/tracked', this.loc_id]);
}

onItemsDialog(){

let dialogRef = this.dialog.open(ItemDialogComponent, {
width : '50%',
role : 'alertdialog'
});

}

}

@Component({
selector: 'item-dialog-view',
templateUrl: './forms/item-dialog.component.html',
styles: [],
providers: [LocationService, ItemsService]
})

export class ItemDialogComponent implements  OnInit  {

private items = null;
private deliv_items = null;
constructor(private dialogRef: MatDialogRef<DeliveryDetailComponent>,
	private _deliv : DeliveryService,
	private _items : ItemsService,
	private dialog: MatDialog,
	private renderer: Renderer2){

}

ngOnInit(){
	this.deliv_items = this._deliv.getDeliveryItems();
}

onItemsDialog(){

let dialogRef = this.dialog.open(ItemAddDialogComponent, {
width : '70%',
role : 'alertdialog'
});
dialogRef.afterClosed().subscribe(result => {
this.deliv_items = this._deliv.getDeliveryItems();
})
}

async onRemoveItem(id, e : any){
	let res = await this._deliv.removeDeliveryItems(id)
	console.log(res)
	if(res['data']){
		this.renderer.addClass(e.target.parentNode.parentNode, 'item-added-remove');
	}
}

}

@Component({
selector: 'item-add-dialog-view',
templateUrl: './forms/item-add-dialog.component.html',
styles: [],
providers: [LocationService, ItemsService]
})

export class ItemAddDialogComponent implements  OnInit  {

private items = null;

constructor(private dialogRef: MatDialogRef<ItemDialogComponent>,
	private _deliv : DeliveryService,
	private _items : ItemsService,
	private renderer: Renderer2,
	){

}

ngOnInit(){
	this.items = this._items.get_item_not_delivery();
}

async onAddItems(id, e : any){
let data = {
	item_id : id
}
let res = await this._deliv.setDeliveryItems(data)
if(res['data']){
	this.renderer.addClass(e.target.parentNode.parentNode, 'item-added-remove');
}
}


}





