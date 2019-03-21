import { Component, ViewChild, OnInit, AfterViewInit, 
	Input, Output, OnChanges, SimpleChanges, 
	SimpleChange, ViewContainerRef, 
	TemplateRef, ComponentFactoryResolver, 
	EventEmitter, Inject } from '@angular/core';

import {FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor, HttpClientXsrfModule  } from '@angular/common/http';
import { Location } from '@angular/common';
import { UserService } from './../service/UserService';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
	selector: 'users-view',
	templateUrl: './user.component.html',
	styles: [],
})
export class UserComponent implements  OnInit  {
	
	@ViewChild('container', {read: ViewContainerRef}) container : ViewContainerRef;
	
	private mode = new FormControl('side');

  	constructor(private resolver: ComponentFactoryResolver, 
  		private router: Router,
  		public dialog: MatDialog, 
  		private userservice : UserService){
  		
  	}

  	async ngAfterViewInit() {
		// let data = this.userservice.get_clients();
		// console.log(data);
	}

  	ngOnInit(){
  		
  		const factory = this.resolver.resolveComponentFactory(ListUserComponent);
     	this.container.createComponent(factory);
  	}

  	go_adduser(){
  		this.router.navigate(['/user/add']);
  	}

  	increment(){

  	}

}


@Component({
	selector: 'edit-users-view',
	templateUrl: './edit-user.component.html',
	styles: [],
})

export class EditUserComponent implements  OnInit, AfterViewInit{

	@ViewChild('container', {read: ViewContainerRef}) 
	container : ViewContainerRef;

	@ViewChild('editform')
    private editform : TemplateRef<any>

    @ViewChild('alertDelete')
    private alertdelete : TemplateRef<any>

	private res;
	private form : FormGroup
	private loading_bar = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public edit: any, 
		private userservice : UserService,
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<ListUserComponent>
	){
		
		this.loading_bar = true;

		this.form = fb.group({ 
		  	'FirstName' : [null, Validators.required],
			'LastName' : [null, Validators.required], 
	      	'UserName' : [null, Validators.required],
	      	'PassWord' : [null, Validators.required]
	  	});
	}

	ngOnInit(){
		
  	}


  	async ngAfterViewInit() {

  		let data = await this.userservice.get_single_user(this.edit.id
			);

  		if(data){
  			this.loading_bar = false;
  			this.res = data['data'];

  			this.form.controls.FirstName.setValue(this.res.firstname);
  			this.form.controls.LastName.setValue(this.res.lastname);

  			if(this.edit.type == "dialog"){
	  			this.container.createEmbeddedView(this.editform);
	  		}
	  		else if(this.edit.type == "alert")
	  		{
	  			this.container.createEmbeddedView(this.alertdelete);
	  		}
  		}
  	}

  	async EditSubmit(_form : NgForm){
  		
  		try{
  			
  			let _editData = {
  				user_id : this.edit.id,
  				fname : _form.controls.FirstName.value,
  				lname : _form.controls.LastName.value,
  				user : _form.controls.UserName.value,
  				pass : _form.controls.PassWord.value
  			}

  			let res = await this.userservice.updateUser(_editData);

  			if(res['data']){
  				this.dialogRef.close(res['data']);
  			}
  		}catch(error){
  			console.log(error);
  		}
  	}


  	async DeleteUser(id){
  		try{
  			let del = await this.userservice.deleteUser(id);
  			if(del){
  				console.log(del);
  				this.dialogRef.close(del['data']);
  			}
  		}catch(error){

  		}
  	}

}

@Component({
	selector: 'lists-users-view',
	templateUrl: './lists-user.component.html',
	styles: [],
})

export class ListUserComponent implements  OnInit{
	private userlist;
	private load_topbar;
	
	private mode = new FormControl('side');

	constructor(private userservice : UserService, 
		public dialog: MatDialog){

	}

	async ngOnInit(){
		this.userlist =  await this.userservice.getAllUser()
		console.log(this.userlist)
  	}

  	ngAfterViewInit() {
		
  	}

  	open_dialog(id){
		 
		 let dialogRef = this.dialog.open(EditUserComponent, {
		  width: '50%',
		  data: {id: id, type : "dialog"}
		});

		dialogRef.afterClosed().subscribe(result => {
			if(result){
				this.userlist =  this.userservice.getAllUser()
			}
   		});
  	}

  	open_dialog_alert(id){
  		let dialogRef = this.dialog.open(EditUserComponent, {
		  data: {id: id, type : 'alert'},
		  width : '30%',
		  role : 'alertdialog'
		});

		dialogRef.afterClosed().subscribe(result => {
			if(result){
				this.userlist =  this.userservice.getAllUser()
			}

		});
  	}
}

@Component({
	selector: 'add-users-view',
	templateUrl: './add-user.component.html',
	styles: [],
})

export class AddUserComponent implements  OnInit, AfterViewInit{

	AddForm : FormGroup
	private cs_token : string;

	constructor(private fb: FormBuilder, 
		private userservice : UserService, 
		private tokenExtractor: HttpXsrfTokenExtractor,
		private router: Router, private location: Location){

		this.AddForm = fb.group({ 
		  	'FirstName' : [null, Validators.required],
			'LastName' : [null, Validators.required], 
	      	'UserName' : [null, Validators.required],
	      	'PassWord' : [null, Validators.required]
	  	});
	}
	
	ngAfterViewInit(){
	}

	go_back(){

	}

	async ngOnInit(){

  	}
}