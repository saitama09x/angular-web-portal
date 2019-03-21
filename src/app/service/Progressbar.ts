import { Component, ViewChild, OnInit, OnDestroy, DoCheck, AfterViewInit, 
Input, Output, OnChanges, SimpleChanges, AfterViewChecked,
SimpleChange, ViewContainerRef, 
TemplateRef, ComponentFactoryResolver, 
EventEmitter, Inject, Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProgressbarService {

	is_loading : boolean = false;

	ip_address : string = "";

}