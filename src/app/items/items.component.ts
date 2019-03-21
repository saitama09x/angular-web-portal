import { Component, ViewChild, OnInit, OnDestroy, DoCheck, AfterViewInit, 
Input, Output, OnChanges, SimpleChanges, AfterViewChecked,
SimpleChange, ViewContainerRef, 
TemplateRef, ComponentFactoryResolver, 
EventEmitter, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Location, DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from "@angular/router";
import {UserService} from './../user.service';
import {LocationService} from './../service/LocationService';
import {DeliveryService} from './../service/DeliveryService';
import {ProgressbarService} from './../service/Progressbar';
import {AppComponent} from './../app.component';
import {ItemsService} from './../service/ItemsService'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
selector: 'item-view',
templateUrl: './item.component.html',
styles: [],
providers: [LocationService, DeliveryService, ItemsService]
})
export class ItemsComponent implements  OnInit  {

private itemlist = [];

constructor(private items : ItemsService){

}

async ngOnInit(){
this.itemlist = await this.items.get_all_items()
}


}